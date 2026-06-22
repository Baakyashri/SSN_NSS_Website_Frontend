import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, MessageCircle } from 'lucide-react';
import ChatMessage from './ChatMessage';
import './FloatingChatbot.css';
import { API_BASE } from '../../utils/api';

function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am your NSS Assistant. How can I help you today?',
      time: new Date()
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, loading]);

  const formatTime = date =>
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: input,
      time: new Date()
    };

    const updatedMessages = [
      ...messages,
      userMessage
    ];

    setMessages(updatedMessages);

    setInput('');
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            messages: updatedMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          })
        }
      );

      const data = await response.json();

      console.log('Backend Response:', data);

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            data.response ||
            'Sorry, I could not process that.',
          time: new Date()
        }
      ]);
    } catch (error) {
      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry, an error occurred while contacting the assistant.',
          time: new Date()
        }
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-fab"
          onClick={() => setIsOpen(true)}
          aria-label="Open NSS Assistant"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div
          className="chatbot-window"
          role="dialog"
          aria-label="NSS Assistant"
        >
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">
              <Bot size={18} />
            </div>

            <div className="chatbot-header-info">
              <span className="chatbot-header-name">
                NSS Assistant
              </span>

              <span className="chatbot-header-status">
                <span className="chatbot-status-dot" />
                Online · Ready to help
              </span>
            </div>

            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-msg-row ${
                  message.role === 'user'
                    ? 'user'
                    : 'bot'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="chatbot-bot-avatar">
                    <Bot size={13} />
                  </div>
                )}

                <div>
                  <ChatMessage message={message} />

                  <div className="chatbot-msg-time">
                    {formatTime(message.time)}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chatbot-msg-row bot">
                <div className="chatbot-bot-avatar">
                  <Bot size={13} />
                </div>

                <div
                  className="chatbot-typing"
                  aria-label="Assistant is typing"
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              placeholder="Ask NSS Assistant..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Message input"
            />

            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingChatbot;