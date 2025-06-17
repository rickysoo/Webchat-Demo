import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';

// Simple markdown renderer
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background: #f3f4f6; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>')
    .replace(/\n/g, '<br>');
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Hi! I\'m your AI assistant. How can I help you today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => 'session_' + Math.random().toString(36).substr(2, 9));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const message = inputValue.trim();
    if (!message) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          sessionId
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: Date.now().toString() + '_bot',
        role: 'assistant',
        content: data.message
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '_error',
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-start space-x-3 mb-4">
      <div className="bg-white text-gray-600 rounded-2xl rounded-bl-md px-4 py-3 text-sm border border-gray-200 flex items-center space-x-1 animate-pulse">
        <span className="text-xs">AI is typing</span>
        <div className="flex space-x-1 ml-2">
          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Toggle Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-15 h-15 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transform animate-in slide-in-from-bottom-2 fade-in duration-300 sm:w-[calc(100vw-2rem)] sm:h-[calc(100vh-8rem)] sm:bottom-20 sm:right-0 sm:left-4">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-base">AI Assistant</div>
              <div className="text-xs opacity-80 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Online
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full p-0 hover:bg-white hover:bg-opacity-20 text-white hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {/* Messages Area */}
          <div className="flex-1 p-5 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] ${message.role === 'user' ? 'self-end' : 'self-start'} animate-in slide-in-from-bottom-1 fade-in duration-300`}
              >
                <div
                  className={`${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-md'
                      : 'bg-white text-gray-800 rounded-2xl rounded-bl-md border border-gray-200'
                  } px-4 py-3 text-sm leading-relaxed`}
                  dangerouslySetInnerHTML={{
                    __html: message.role === 'assistant' 
                      ? renderMarkdown(message.content)
                      : message.content.replace(/\n/g, '<br>')
                  }}
                />
              </div>
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="bg-white border-t border-gray-200">
            <div className="p-5 flex items-end space-x-3">
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  maxLength={500}
                  className="w-full rounded-full border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="w-11 h-11 rounded-full p-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="px-5 pb-4 text-xs text-gray-500 flex items-center justify-between">
              <span>Powered by AI</span>
              <span>{inputValue.length}/500</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
