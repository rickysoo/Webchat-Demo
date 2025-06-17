/**
 * Production Embeddable Chatbot Widget for webchat-demo.replit.app
 * Drop this script into any website to add AI chat functionality
 * 
 * Usage: <script src="https://webchat-demo.replit.app/embed-production.js"></script>
 */

(function() {
  'use strict';
  
  // Configuration - customize these values
  const CONFIG = {
    apiEndpoint: 'https://webchat-demo.replit.app/api/chat',
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    primaryColor: '#3B82F6',
    accentColor: '#8B5CF6',
    buttonSize: '64px',
    widgetWidth: '380px',
    widgetHeight: '600px',
    greeting: '👋 Hi! I\'m your AI assistant. How can I help you today?'
  };

  // Create unique session ID
  const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
  let messages = [{ role: 'assistant', content: CONFIG.greeting, id: 'welcome' }];
  let isTyping = false;

  // Create chatbot HTML structure
  function createChatbotHTML() {
    const position = CONFIG.position.split('-');
    const vertical = position[0];
    const horizontal = position[1];
    
    return `
      <div id="ai-chatbot-container" style="
        position: fixed;
        ${vertical}: 20px;
        ${horizontal}: 64px;
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        max-width: calc(100vw - 5rem);
      ">
        <!-- Toggle Button -->
        <div id="ai-chatbot-toggle" style="
          width: ${CONFIG.buttonSize};
          height: ${CONFIG.buttonSize};
          background: linear-gradient(135deg, ${CONFIG.primaryColor} 0%, ${CONFIG.accentColor} 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
          transition: all 0.3s ease;
          border: none;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        
        <!-- Chat Widget -->
        <div id="ai-chatbot-widget" style="
          position: absolute;
          ${vertical === 'bottom' ? 'bottom' : 'top'}: 70px;
          ${horizontal}: -48px;
          width: ${CONFIG.widgetWidth};
          height: ${CONFIG.widgetHeight};
          max-width: calc(100vw - 5rem);
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          display: none;
          flex-direction: column;
          overflow: hidden;
        ">
          <!-- Header -->
          <div id="ai-chatbot-header" style="
            background: linear-gradient(135deg, ${CONFIG.primaryColor} 0%, ${CONFIG.accentColor} 100%);
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          ">
            <div>
              <div style="font-weight: 600; font-size: 16px;">AI Assistant</div>
              <div style="font-size: 12px; opacity: 0.8; display: flex; align-items: center;">
                <div style="width: 8px; height: 8px; background: #10B981; border-radius: 50%; margin-right: 6px;"></div>
                Online
              </div>
            </div>
            <button id="ai-chatbot-close" style="
              background: none;
              border: none;
              color: white;
              font-size: 24px;
              cursor: pointer;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: background 0.2s;
            ">&times;</button>
          </div>
          
          <!-- Messages -->
          <div id="ai-chatbot-messages" style="
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #F9FAFB;
            display: flex;
            flex-direction: column;
            gap: 15px;
          "></div>
          
          <!-- Input Area -->
          <div style="background: white; border-top: 1px solid #E5E7EB;">
            <div style="padding: 20px; display: flex; gap: 10px; align-items: flex-end;">
              <input 
                type="text" 
                id="ai-chatbot-input" 
                placeholder="Type your message..."
                maxlength="500"
                style="
                  flex: 1;
                  padding: 12px 16px;
                  border: 2px solid #E5E7EB;
                  border-radius: 24px;
                  outline: none;
                  font-size: 14px;
                  transition: border-color 0.2s;
                "
              >
              <button id="ai-chatbot-send" style="
                background: linear-gradient(135deg, ${CONFIG.primaryColor} 0%, ${CONFIG.accentColor} 100%);
                color: white;
                border: none;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
              ">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </div>
            <div style="padding: 0 20px 15px; font-size: 12px; color: #6B7280; display: flex; justify-content: space-between;">
              <span>Powered by AI</span>
              <span id="message-counter">0/500</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Simple markdown renderer
  function renderMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background: #f3f4f6; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>')
      .replace(/\n/g, '<br>');
  }

  // Render messages
  function renderMessages() {
    const container = document.getElementById('ai-chatbot-messages');
    if (!container) return;
    
    container.innerHTML = '';
    
    messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.style.cssText = `
        max-width: 85%;
        align-self: ${message.role === 'user' ? 'flex-end' : 'flex-start'};
      `;
      
      const renderedContent = message.role === 'assistant' 
        ? renderMarkdown(message.content)
        : message.content.replace(/\n/g, '<br>');
      
      messageDiv.innerHTML = `
        <div style="
          background: ${message.role === 'user' 
            ? `linear-gradient(135deg, ${CONFIG.primaryColor} 0%, ${CONFIG.accentColor} 100%)` 
            : 'white'};
          color: ${message.role === 'user' ? 'white' : '#374151'};
          padding: 12px 16px;
          border-radius: 18px;
          border-bottom-${message.role === 'user' ? 'right' : 'left'}-radius: 6px;
          font-size: 14px;
          line-height: 1.5;
          word-wrap: break-word;
          ${message.role === 'assistant' ? 'border: 1px solid #E5E7EB;' : 'white-space: pre-wrap;'}
        ">
          ${renderedContent}
        </div>
      `;
      
      container.appendChild(messageDiv);
    });
    
    // Add typing indicator if needed
    if (isTyping) {
      const typingDiv = document.createElement('div');
      typingDiv.style.cssText = 'max-width: 85%; align-self: flex-start;';
      typingDiv.innerHTML = `
        <div style="
          background: white;
          color: #6B7280;
          padding: 12px 16px;
          border-radius: 18px;
          border-bottom-left-radius: 6px;
          border: 1px solid #E5E7EB;
          display: flex;
          align-items: center;
          gap: 8px;
        ">
          <span style="font-size: 12px;">AI is typing</span>
          <div style="display: flex; gap: 3px;">
            <div style="width: 6px; height: 6px; background: ${CONFIG.primaryColor}; border-radius: 50%; animation: pulse 1.4s infinite;"></div>
            <div style="width: 6px; height: 6px; background: ${CONFIG.primaryColor}; border-radius: 50%; animation: pulse 1.4s infinite 0.2s;"></div>
            <div style="width: 6px; height: 6px; background: ${CONFIG.primaryColor}; border-radius: 50%; animation: pulse 1.4s infinite 0.4s;"></div>
          </div>
        </div>
      `;
      container.appendChild(typingDiv);
    }
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
  }

  // Send message to API
  async function sendMessage(content) {
    try {
      const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Chatbot API error:', error);
      return 'Sorry, I encountered an error. Please try again later.';
    }
  }

  // Handle user input
  async function handleUserMessage() {
    const input = document.getElementById('ai-chatbot-input');
    const sendButton = document.getElementById('ai-chatbot-send');
    
    const content = input.value.trim();
    if (!content || isTyping) return;

    // Add user message
    messages.push({
      id: Date.now().toString(),
      role: 'user',
      content: content
    });

    input.value = '';
    updateCounter();
    renderMessages();

    // Show typing indicator
    isTyping = true;
    sendButton.disabled = true;
    renderMessages();

    // Get AI response
    const response = await sendMessage(content);
    
    // Add AI response
    messages.push({
      id: Date.now().toString() + '_bot',
      role: 'assistant',
      content: response
    });

    // Hide typing indicator
    isTyping = false;
    sendButton.disabled = false;
    renderMessages();
  }

  // Update character counter
  function updateCounter() {
    const input = document.getElementById('ai-chatbot-input');
    const counter = document.getElementById('message-counter');
    if (input && counter) {
      counter.textContent = `${input.value.length}/500`;
    }
  }

  // Initialize chatbot
  function initChatbot() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
      }
      #ai-chatbot-toggle:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 25px rgba(59, 130, 246, 0.6);
      }
      #ai-chatbot-close:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      #ai-chatbot-input:focus {
        border-color: ${CONFIG.primaryColor};
      }
      #ai-chatbot-send:disabled {
        background: #D1D5DB !important;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(style);

    // Add HTML to page
    document.body.insertAdjacentHTML('beforeend', createChatbotHTML());

    // Add event listeners
    const toggle = document.getElementById('ai-chatbot-toggle');
    const widget = document.getElementById('ai-chatbot-widget');
    const closeBtn = document.getElementById('ai-chatbot-close');
    const input = document.getElementById('ai-chatbot-input');
    const sendBtn = document.getElementById('ai-chatbot-send');

    toggle.addEventListener('click', () => {
      const isVisible = widget.style.display === 'flex';
      widget.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        renderMessages();
        input.focus();
      }
    });

    closeBtn.addEventListener('click', () => {
      widget.style.display = 'none';
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserMessage();
      }
    });

    input.addEventListener('input', updateCounter);

    sendBtn.addEventListener('click', handleUserMessage);

    // Initial render
    renderMessages();
    updateCounter();
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();