import ReactMarkdown from 'react-markdown';
import './FloatingChatbot.css';

function ChatMessage({ message }) {
  return (
    <div
      className={`chat-message ${
        message.role === 'user' ? 'user-message' : 'bot-message'
      }`}
    >
      <ReactMarkdown>
        {message.content}
      </ReactMarkdown>
    </div>
  );
}

export default ChatMessage;