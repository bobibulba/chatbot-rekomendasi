import React from 'react';
import { Message } from '../types';
import { Bot, User, MapPin, Star, DollarSign, Clock, ExternalLink } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onOptionClick?: (option: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onOptionClick }) => {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex gap-3 mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6F61] to-[#6B5B95] flex items-center justify-center shadow-lg transform rotate-3">
          <Bot className="w-6 h-6 text-white" />
        </div>
      )}
      
      <div className={`flex-1 max-w-[80%] ${!isBot && 'flex justify-end'}`}>
        <div
          className={`relative p-4 rounded-2xl shadow-lg ${
            isBot
              ? 'bg-white border-4 border-black'
              : 'bg-gradient-to-br from-[#88B04B] to-[#6B5B95] text-white border-4 border-black'
          }`}
          style={{
            transform: isBot ? 'rotate(-0.5deg)' : 'rotate(0.5deg)',
          }}
        >
          {/* Memphis decorative elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF6F61] rounded-full border-2 border-black" />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#F7CAC9] rotate-45 border-2 border-black" />
          
          <p className="text-base leading-relaxed font-medium">{message.content}</p>

          {message.options && message.options.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {message.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onOptionClick?.(option)}
                  className="px-4 py-2 bg-gradient-to-r from-[#FF6F61] to-[#F7CAC9] text-black font-semibold rounded-full border-3 border-black shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:-rotate-2"
                  style={{
                    transform: `rotate(${(index % 3 - 1) * 2}deg)`,
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {message.venue && (
            <div className="mt-4 p-4 bg-gradient-to-br from-[#F7CAC9] to-white rounded-xl border-3 border-black">
              <img
                src={message.venue.image}
                alt={message.venue.name}
                className="w-full h-48 object-cover rounded-lg border-3 border-black mb-3"
              />
              
              <h3 className="text-xl font-bold text-black mb-2">{message.venue.name}</h3>
              
              <div className="space-y-2 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF6F61]" />
                  <span>{message.venue.address}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#88B04B]" />
                  <span className="font-semibold">{message.venue.rating}/5.0</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#6B5B95]" />
                  <span>{message.venue.priceRange}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF6F61]" />
                  <span>{message.venue.openingHours}</span>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-700">{message.venue.description}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {message.venue.cuisine.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#88B04B] text-white text-xs font-semibold rounded-full border-2 border-black"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <a
                href={message.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6B5B95] to-[#88B04B] text-white font-semibold rounded-full border-3 border-black shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Lihat di Google Maps
              </a>
            </div>
          )}
        </div>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#88B04B] to-[#F7CAC9] flex items-center justify-center shadow-lg transform -rotate-3">
          <User className="w-6 h-6 text-black" />
        </div>
      )}
    </div>
  );
};
