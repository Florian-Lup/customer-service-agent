import { useState } from 'react';

interface UseAIChatProps {
  onMessageSubmit?: (message: string) => void;
}

export function useAIChat({ onMessageSubmit }: UseAIChatProps = {}) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageChange = (newMessage: string) => {
    setMessage(newMessage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      await onMessageSubmit?.(message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    message,
    isLoading,
    handleMessageChange,
    handleSubmit
  };
}

interface MessageInputProps {
  message: string;
  onMessageChange: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function MessageInput({
  message,
  onMessageChange,
  onSubmit,
  isLoading
}: MessageInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onMessageChange(''); // Clear input immediately
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t">
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Type your question..."
          className="w-full pr-12 pl-4 py-2 sm:py-2.5 rounded-xl border border-gray-200
                   focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none
                   text-sm text-gray-900 placeholder:text-gray-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2
                   p-1.5 rounded-lg
                   text-white bg-green-500
                   disabled:bg-gray-300 disabled:cursor-not-allowed
                   transition-colors duration-200"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
} 