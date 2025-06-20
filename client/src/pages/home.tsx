import ChatbotWidget from '@/components/ChatbotWidget';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">AI Chatbot Integration</h1>
              </div>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#demo" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Demo</a>
                <a href="#integration" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Integration</a>
                <a href="#features" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Features</a>
                <a href="#documentation" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Docs</a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div id="demo" className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Add AI Chat to Any Website</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Professional AI chatbot powered by OpenAI GPT-4o-mini. One line of code integration with markdown support, rate limiting, and mobile responsiveness.
          </p>
          
          {/* Live Demo Box */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Live Demo Running</span>
            </div>
            <p className="text-gray-700 mb-4">Click the blue chat button in the bottom-right corner to test the AI chatbot.</p>
            <div className="text-sm text-gray-600">
              Try asking: "What are your business hours?" or "Write me a poem about weather"
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div id="integration" className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Super Simple Integration</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Add to Any Website (1 line of code)</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`<script src="https://webchat-demo.replit.app/embed.js"></script>`}</code>
                </pre>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                That's it! The chatbot will automatically appear on your website.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Quick Setup</h4>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-blue-400 text-sm">
                    <code>{`npm install express cors
# Set OPENAI_API_KEY
# Deploy server
# Add script tag`}</code>
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Customization</h4>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-purple-400 text-sm">
                    <code>{`// Configurable options:
position: 'bottom-right'
primaryColor: '#3B82F6'
greeting: 'Custom message'`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div>
                  <h5 className="font-semibold text-blue-900 mb-1">Production Ready</h5>
                  <p className="text-blue-800 text-sm">
                    This demo is running with a complete backend. Copy the script above and test it on any website immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Key Features</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Instant Setup</h4>
              <p className="text-gray-600 text-sm">One script tag integration. No configuration required.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure</h4>
              <p className="text-gray-600 text-sm">Rate limiting, input validation, error handling.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart AI</h4>
              <p className="text-gray-600 text-sm">GPT-4o-mini with markdown formatting support.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Mobile Ready</h4>
              <p className="text-gray-600 text-sm">Responsive design adapts to all screen sizes.</p>
            </div>
          </div>
        </div>

        {/* Sample Conversation */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Sample Conversation</h3>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">You</span>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg rounded-bl-sm px-4 py-2 max-w-xs">
                What are your business hours?
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-sm px-4 py-2 max-w-md">
                We're open Monday through Friday from 9 AM to 6 PM EST, and Saturday from 10 AM to 4 PM EST. We're closed on Sundays. Is there anything specific you'd like to know about our services?
              </div>
            </div>
          </div>
        </div>

        {/* Complete Documentation */}
        <div id="documentation" className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Setup Documentation</h3>
          
          <div className="space-y-8">
            {/* Backend Setup */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Backend Server Setup</h4>
              <p className="text-gray-600 mb-4">Create a Node.js server with OpenAI integration:</p>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                <pre className="text-green-400 text-sm">
                  <code>{`npm init -y
npm install express cors

# Create server.js`}</code>
                </pre>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-blue-400 text-sm">
                  <code>{`const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rate limiting (20 requests per minute per IP)
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
    
    // Limit and sanitize messages (last 10, max 1000 chars each)
    const sanitizedMessages = messages.slice(-10).map(msg => ({
      role: msg.role,
      content: String(msg.content).slice(0, 1000)
    }));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cost-efficient model
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
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`}</code>
                </pre>
              </div>
            </div>

            {/* Environment Setup */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Environment Setup</h4>
              <p className="text-gray-600 mb-4">Create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file:</p>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                <pre className="text-yellow-400 text-sm">
                  <code>{`OPENAI_API_KEY=your_openai_api_key_here`}</code>
                </pre>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Get your OpenAI API key:</strong> Visit <a href="https://platform.openai.com/api-keys" className="underline" target="_blank">platform.openai.com/api-keys</a> to create a new API key.
                </p>
              </div>
            </div>

            {/* Embed Script */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Frontend Integration</h4>
              <p className="text-gray-600 mb-4">For custom deployments, create your own embed script:</p>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-purple-400 text-sm">
                  <code>{`// embed.js - Minimal version
(function() {
  const CONFIG = {
    apiEndpoint: window.location.origin + '/api/chat',
    position: 'bottom-right',
    primaryColor: '#3B82F6'
  };

  // Create chatbot HTML and functionality
  // (Full code available in repository)
  
  function init() {
    document.body.insertAdjacentHTML('beforeend', createChatHTML());
    // Add event listeners
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();`}</code>
                </pre>
              </div>
            </div>

            {/* Customization */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Customization Options</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Colors & Position</h5>
                  <div className="bg-gray-50 p-3 rounded">
                    <code className="text-sm">
                      position: 'bottom-right'<br/>
                      primaryColor: '#3B82F6'<br/>
                      accentColor: '#8B5CF6'
                    </code>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-700 mb-2">Behavior</h5>
                  <div className="bg-gray-50 p-3 rounded">
                    <code className="text-sm">
                      greeting: 'Custom message'<br/>
                      maxTokens: 200<br/>
                      rateLimit: 20/minute
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Information */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">API Costs & Usage</h4>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-2">GPT-4o-mini Pricing</h5>
                <div className="text-green-700 text-sm space-y-1">
                  <p>• Input: $0.000150 per 1K tokens</p>
                  <p>• Output: $0.0006 per 1K tokens</p>
                  <p>• Average conversation cost: ~$0.0001</p>
                  <p>• 1000 conversations: ~$0.10</p>
                </div>
              </div>
            </div>

            {/* Security Notes */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Security Best Practices</h4>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">API keys never exposed to frontend</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Rate limiting prevents abuse (20 requests/minute per IP)</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">Input validation and sanitization (1000 char limit)</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">HTTPS recommended for production deployment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
