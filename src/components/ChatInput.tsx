import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        {/* Decorative elements */}
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#FF6F61] rounded-full border-3 border-black animate-bounce" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#88B04B] rotate-45 border-3 border-black" />
        
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Ketik pesan di sini..."
          className="w-full px-6 py-4 pr-14 rounded-full border-4 border-black bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#FF6F61] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-base shadow-lg"
          style={{ transform: 'rotate(-0.5deg)' }}
        />
        
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-[#FF6F61] to-[#6B5B95] rounded-full flex items-center justify-center border-3 border-black shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110 hover:rotate-12 transition-all duration-200"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
};
