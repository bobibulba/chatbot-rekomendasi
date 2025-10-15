
import React, { useState, useEffect, useRef } from 'react';
import { Message, UserPreferences } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { MemphisBackground } from './components/MemphisBackground';
import { questions, getRecommendations } from './utils/chatbot';
import { Coffee, Sparkles, RotateCcw } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [isComplete, setIsComplete] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: '0',
      type: 'bot',
      content: 'Halo! 👋 Aku NongkiBot, asisten kamu untuk cari tempat nongkrong terbaik di Jakarta Kemanggisan! Yuk, jawab beberapa pertanyaan biar aku bisa kasih rekomendasi yang pas buat kamu!',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);

    // First question
    setTimeout(() => {
      askQuestion(0);
    }, 1000);
  }, []);

  const askQuestion = (index: number) => {
    if (index >= questions.length) {
      showRecommendations();
      return;
    }

    const question = questions[index];
    const questionMessage: Message = {
      id: `q-${index}`,
      type: 'bot',
      content: question.question,
      timestamp: new Date(),
      options: question.options,
    };

    setMessages((prev) => [...prev, questionMessage]);
  };

  const handleOptionClick = (option: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Handle facilities (multiple selection)
    if (currentQuestion.id === 'facilities') {
      const newFacilities = selectedFacilities.includes(option)
        ? selectedFacilities.filter(f => f !== option)
        : [...selectedFacilities, option];
      
      setSelectedFacilities(newFacilities);
      
      // Add "Lanjut" button after selecting at least one facility
      if (newFacilities.length > 0) {
        const userMessage: Message = {
          id: `a-${currentQuestionIndex}-temp`,
          type: 'user',
          content: `Dipilih: ${newFacilities.join(', ')}`,
          timestamp: new Date(),
        };
        
        setMessages((prev) => {
          const filtered = prev.filter(m => m.id !== `a-${currentQuestionIndex}-temp`);
          return [...filtered, userMessage];
        });
      }
      return;
    }

    // Regular single selection
    const userMessage: Message = {
      id: `a-${currentQuestionIndex}`,
      type: 'user',
      content: option,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Update preferences
    const newPreferences = { ...preferences, [currentQuestion.id]: option };
    setPreferences(newPreferences);

    // Move to next question
    setTimeout(() => {
      setCurrentQuestionIndex((prev) => prev + 1);
      askQuestion(currentQuestionIndex + 