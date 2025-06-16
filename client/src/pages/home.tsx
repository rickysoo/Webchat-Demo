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
                <h1 className="text-xl font-bold text-gray-900">YourWebsite.com</h1>
              </div>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Home</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">About</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Services</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Contact</a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Embeddable AI Chatbot Demo</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This demonstrates how the AI chatbot widget integrates seamlessly into any website. 
            Click the chat button in the bottom-right corner to start a conversation.
          </p>
        </div>

        {/* Integration Code Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Integration Instructions</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">1. Backend Setup</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/chat', async (req, res) => {
    // Rate limiting and validation
    // OpenAI API integration
    // Response handling
});

app.listen(5000);`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">2. Environment Variables</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-blue-400 text-sm">
                  <code>{`# Add to your .env file
OPENAI_API_KEY=your_openai_api_key_here`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Setup</h3>
            <p className="text-gray-600">React component integration. No complex configuration required.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">Built-in rate limiting, input validation, and error handling.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Responses</h3>
            <p className="text-gray-600">Powered by OpenAI GPT-4o with customizable system prompts.</p>
          </div>
        </div>

        {/* Demo Conversation */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Sample Conversation</h3>
          <div className="space-y-4 max-w-2xl">
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
      </main>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
