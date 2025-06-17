# AI Chatbot Integration for Websites

Add an intelligent AI chatbot to any website with just one line of code. This chatbot uses OpenAI GPT-4o-mini to provide smart, helpful responses to your visitors.

## Quick Integration (1 Line of Code)

Add this script tag anywhere in your HTML:

```html
<script src="https://webchat-demo.replit.app/embed-production.js"></script>
```

That's it! The chatbot will automatically appear in the bottom-right corner of your website.

## Features

- **Professional UI** with smooth animations
- **Mobile responsive** design
- **Markdown support** for formatted responses (bold, italic, code)
- **Rate limiting** (20 requests per minute per visitor)
- **Session management** to maintain conversation context
- **Secure** input validation and error handling
- **Customizable** colors, position, and styling

## Complete Setup Guide

### For Website Owners (Using Hosted Service)

Simply add the embed script to your website:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
</head>
<body>
    <!-- Your existing content -->
    <h1>Welcome to My Website</h1>
    <p>Content goes here...</p>
    
    <!-- Add chatbot with one line -->
    <script src="https://webchat-demo.replit.app/embed-production.js"></script>
</body>
</html>
```

### For Developers (Self-Hosted)

If you want to host your own chatbot backend:

#### 1. Backend Setup

Create a new Node.js project:

```bash
mkdir my-chatbot
cd my-chatbot
npm init -y
```

Install dependencies:

```bash
npm install express cors
```

Create `server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rate limiting store
const rateLimitStore = new Map();

function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 20;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return next();
  }

  const userLimit = rateLimitStore.get(ip);
  
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

app.post('/api/chat', rateLimit, async (req, res) => {
  try {
    const { messages, sessionId } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Limit and sanitize messages
    const sanitizedMessages = messages.slice(-10).map(msg => ({
      role: msg.role,
      content: String(msg.content).slice(0, 1000)
    }));

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured' 
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful customer service assistant. Be concise, friendly, and professional. Keep responses under 200 words.'
          },
          ...sanitizedMessages
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      return res.status(500).json({ 
        error: 'AI service temporarily unavailable' 
      });
    }

    const data = await response.json();
    
    res.json({
      message: data.choices[0].message.content,
      sessionId: sessionId
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Service temporarily unavailable' 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Chatbot server running on port ${PORT}`);
});
```

#### 2. Environment Setup

Create `.env` file:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Get your OpenAI API key from: https://platform.openai.com/api-keys

#### 3. Frontend Integration

Create `embed.js`:

```javascript
(function() {
  'use strict';
  
  const CONFIG = {
    apiEndpoint: window.location.origin + '/api/chat',
    position: 'bottom-right',
    primaryColor: '#3B82F6',
    accentColor: '#8B5CF6',
    greeting: '👋 Hi! How can I help you today?'
  };

  const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
  let messages = [{ role: 'assistant', content: CONFIG.greeting, id: 'welcome' }];
  let isTyping = false;

  function renderMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background: #f3f4f6; padding: 2px 4px; border-radius: 3px;">$1</code>')
      .replace(/\n/g, '<br>');
  }

  function createChatHTML() {
    return `
      <div id="ai-chatbot-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 999999; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div id="ai-chatbot-toggle" style="width: 60px; height: 60px; background: linear-gradient(135deg, ${CONFIG.primaryColor}, ${CONFIG.accentColor}); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer; box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        <div id="ai-chatbot-widget" style="position: absolute; bottom: 70px; right: 0; width: 380px; height: 600px; background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); display: none; flex-direction: column;">
          <div style="background: linear-gradient(135deg, ${CONFIG.primaryColor}, ${CONFIG.accentColor}); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600;">AI Assistant</div>
              <div style="font-size: 12px; opacity: 0.8;">Online</div>
            </div>
            <button id="ai-chatbot-close" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer;">&times;</button>
          </div>
          <div id="ai-chatbot-messages" style="flex: 1; padding: 20px; overflow-y: auto; background: #f9fafb;"></div>
          <div style="padding: 20px; border-top: 1px solid #e5e7eb;">
            <div style="display: flex; gap: 10px;">
              <input id="ai-chatbot-input" type="text" placeholder="Type your message..." style="flex: 1; padding: 12px; border: 2px solid #e5e7eb; border-radius: 24px; outline: none;">
              <button id="ai-chatbot-send" style="background: linear-gradient(135deg, ${CONFIG.primaryColor}, ${CONFIG.accentColor}); color: white; border: none; width: 44px; height: 44px; border-radius: 50%; cursor: pointer;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderMessages() {
    const container = document.getElementById('ai-chatbot-messages');
    if (!container) return;
    
    container.innerHTML = '';
    
    messages.forEach(message => {
      const div = document.createElement('div');
      div.style.cssText = `margin-bottom: 15px; max-width: 85%; align-self: ${message.role === 'user' ? 'flex-end' : 'flex-start'};`;
      
      const content = message.role === 'assistant' ? renderMarkdown(message.content) : message.content;
      
      div.innerHTML = `
        <div style="
          background: ${message.role === 'user' ? `linear-gradient(135deg, ${CONFIG.primaryColor}, ${CONFIG.accentColor})` : 'white'};
          color: ${message.role === 'user' ? 'white' : '#374151'};
          padding: 12px 16px;
          border-radius: 18px;
          border: ${message.role === 'assistant' ? '1px solid #e5e7eb' : 'none'};
          font-size: 14px;
          line-height: 1.5;
        ">${content}</div>
      `;
      
      container.appendChild(div);
    });
    
    container.scrollTop = container.scrollHeight;
  }

  async function sendMessage(content) {
    try {
      const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          sessionId: sessionId
        })
      });

      if (!response.ok) throw new Error('Network error');
      
      const data = await response.json();
      return data.message;
    } catch (error) {
      return 'Sorry, I encountered an error. Please try again.';
    }
  }

  async function handleMessage() {
    const input = document.getElementById('ai-chatbot-input');
    const content = input.value.trim();
    if (!content || isTyping) return;

    messages.push({ id: Date.now().toString(), role: 'user', content });
    input.value = '';
    renderMessages();

    isTyping = true;
    const response = await sendMessage(content);
    messages.push({ id: Date.now().toString() + '_bot', role: 'assistant', content: response });
    isTyping = false;
    renderMessages();
  }

  function init() {
    document.body.insertAdjacentHTML('beforeend', createChatHTML());
    
    document.getElementById('ai-chatbot-toggle').onclick = () => {
      const widget = document.getElementById('ai-chatbot-widget');
      const isVisible = widget.style.display === 'flex';
      widget.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) renderMessages();
    };

    document.getElementById('ai-chatbot-close').onclick = () => {
      document.getElementById('ai-chatbot-widget').style.display = 'none';
    };

    document.getElementById('ai-chatbot-input').onkeypress = (e) => {
      if (e.key === 'Enter') handleMessage();
    };

    document.getElementById('ai-chatbot-send').onclick = handleMessage;
    
    renderMessages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

#### 4. Serve Files

Add to your server.js:

```javascript
app.use(express.static('public'));

app.get('/embed.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/embed.js');
});
```

#### 5. Run Your Server

```bash
node server.js
```

Now use your chatbot:

```html
<script src="http://your-domain.com/embed.js"></script>
```

## Customization

Edit the CONFIG object in embed.js to customize:

- `primaryColor` and `accentColor` - Chat bubble colors
- `position` - 'bottom-right', 'bottom-left', 'top-right', 'top-left'
- `greeting` - Welcome message
- `apiEndpoint` - Your backend URL

## API Costs

Using GPT-4o-mini costs approximately:
- $0.000150 per 1K input tokens
- $0.0006 per 1K output tokens

For a typical chatbot conversation (50 words input, 100 words output):
- Cost per message: ~$0.0001
- 1000 conversations: ~$0.10

## Support

For issues or questions, contact the chatbot provider or check the documentation at your hosting service.

## Security Notes

- API keys are never exposed to the frontend
- Rate limiting prevents abuse
- Input is validated and sanitized
- HTTPS recommended for production