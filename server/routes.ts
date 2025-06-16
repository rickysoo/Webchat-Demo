import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatSessionSchema, insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";
import { serveEmbedScript } from "./static";

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function rateLimit(req: any, res: any, next: any) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 20; // Max 20 requests per minute

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  const userLimit = rateLimitStore.get(ip)!;
  
  if (now > userLimit.resetTime) {
    userLimit.count = 1;
    userLimit.resetTime = now + windowMs;
    return next();
  }

  if (userLimit.count >= maxRequests) {
    return res.status(429).json({ 
      error: 'Too many requests. Please wait a moment.' 
    });
  }

  userLimit.count++;
  next();
}

const chatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })),
  sessionId: z.string()
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve embed script for easy integration
  serveEmbedScript(app);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Chat endpoint with OpenAI integration
  app.post('/api/chat', rateLimit, async (req, res) => {
    try {
      const { messages, sessionId } = chatRequestSchema.parse(req.body);

      // Get or create chat session
      let session = await storage.getChatSession(sessionId);
      if (!session) {
        session = await storage.createChatSession({ sessionId });
      }

      // Validate and sanitize messages
      const sanitizedMessages = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: String(msg.content).slice(0, 1000) // Limit message length
      }));

      // Get OpenAI API key from environment
      const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
      
      if (!OPENAI_API_KEY) {
        return res.status(500).json({ 
          error: 'OpenAI API key not configured. Please contact support.' 
        });
      }

      // Save user message to storage
      if (sanitizedMessages.length > 0) {
        const lastMessage = sanitizedMessages[sanitizedMessages.length - 1];
        if (lastMessage.role === 'user') {
          await storage.createChatMessage({
            sessionId,
            role: 'user',
            content: lastMessage.content
          });
        }
      }

      // Call OpenAI API
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `You are a helpful customer service assistant for this website. 
              Be concise, friendly, and professional. 
              If asked about sensitive information, politely redirect to human support.
              Keep responses under 200 words.`
            },
            ...sanitizedMessages
          ],
          max_tokens: 200,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      });

      if (!response.ok) {
        console.error('OpenAI API Error:', response.status, response.statusText);
        return res.status(500).json({ 
          error: 'AI service temporarily unavailable. Please try again.' 
        });
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      // Save assistant response to storage
      await storage.createChatMessage({
        sessionId,
        role: 'assistant',
        content: assistantMessage
      });
      
      // Return response
      res.json({
        message: assistantMessage,
        sessionId: sessionId
      });

    } catch (error) {
      console.error('Chat endpoint error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          error: 'Invalid request format',
          details: error.errors
        });
      }
      res.status(500).json({ 
        error: 'Service temporarily unavailable. Please try again later.' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
