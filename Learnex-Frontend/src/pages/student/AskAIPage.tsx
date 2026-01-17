import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Copy, ThumbsUp, ThumbsDown, Bot, User, Sparkles, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/Button';
import Toast, { ToastType } from '../../components/Toast';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  rating?: 'helpful' | 'not-helpful';
}

const smartSuggestions = [
  "Explain this concept",
  "Give me an example", 
  "Quick revision tips",
  "Solve this step by step",
  "What's the formula?",
  "Practice questions"
];

const AskAIPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi there! 👋 I'm Learnex AI, your personal study companion. Ask me anything about your subjects - from complex concepts to quick doubts. I'm here to help you learn smarter!",
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (question: string): string => {
    // Mock AI responses based on keywords
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('physics') || lowerQuestion.includes('force') || lowerQuestion.includes('motion')) {
      return "Great physics question! 🔬 Let me break this down for you:\n\n**Key Concept**: Newton's laws govern motion and forces.\n\n**Formula**: F = ma (Force = mass × acceleration)\n\n**Example**: When you push a book across a table, the force you apply accelerates the book. The heavier the book (more mass), the more force needed for the same acceleration.\n\n**Quick Tip**: Remember that forces always come in pairs (Newton's 3rd law) - when you push the book, it pushes back on you with equal force!\n\nNeed me to explain any specific part in more detail? 🚀";
    }
    
    if (lowerQuestion.includes('chemistry') || lowerQuestion.includes('organic') || lowerQuestion.includes('reaction')) {
      return "Excellent chemistry question! 🧪 Here's your answer:\n\n**Organic Chemistry Basics**:\n- Carbon forms 4 bonds (tetrahedral structure)\n- Functional groups determine properties\n- Reactions follow electron movement patterns\n\n**Memory Trick**: Think of carbon as the 'social butterfly' of elements - it loves making friends (bonds) with other atoms!\n\n**Practice Tip**: Draw out the structures - visual learning works wonders in organic chemistry.\n\nWant me to explain a specific reaction mechanism? ⚗️";
    }
    
    if (lowerQuestion.includes('math') || lowerQuestion.includes('calculus') || lowerQuestion.includes('derivative')) {
      return "Perfect math question! 📐 Let me solve this step by step:\n\n**Calculus Concept**: Derivatives measure rate of change\n\n**Basic Rules**:\n- d/dx(x^n) = nx^(n-1)\n- d/dx(sin x) = cos x\n- Chain rule: d/dx[f(g(x))] = f'(g(x)) × g'(x)\n\n**Real-world Application**: Derivatives help us find maximum/minimum values, like optimizing profit or minimizing cost.\n\n**Study Hack**: Practice one rule at a time, then combine them. Math is like building blocks! 🧮\n\nNeed help with a specific problem?";
    }
    
    return "That's a thoughtful question! 🤔 Let me help you understand this better:\n\n**Here's what I think you're asking about**:\nThis concept involves understanding the fundamental principles and applying them systematically.\n\n**Step-by-step approach**:\n1. Identify the key components\n2. Understand the relationships\n3. Apply the relevant formulas or methods\n4. Verify your solution\n\n**Pro Tip**: Break complex problems into smaller, manageable parts. Every expert was once a beginner! 💡\n\nCould you provide more specific details so I can give you a more targeted explanation?";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    setShowToast(true);
    setToastMessage('Answer copied to clipboard!');
    setToastType('success');
  };

  const handleRateMessage = (messageId: string, rating: 'helpful' | 'not-helpful') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ));
    setShowToast(true);
    setToastMessage(rating === 'helpful' ? 'Thanks for your feedback!' : 'We\'ll improve our responses!');
    setToastType('success');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mr-4"
            >
              <Brain className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">
                Ask Learnex AI
              </h1>
              <p className="text-gray-600 mt-1">Your genius study companion is ready to help! 🚀</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-4xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 ${message.type === 'user' ? 'ml-3' : 'mr-3'}`}>
                  {message.type === 'user' ? (
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-indigo-600" />
                    </div>
                  ) : (
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          '0 0 0 0 rgba(99, 102, 241, 0.4)',
                          '0 0 0 10px rgba(99, 102, 241, 0)',
                          '0 0 0 0 rgba(99, 102, 241, 0)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center"
                    >
                      <Bot className="h-6 w-6 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-2xl px-6 py-4 max-w-2xl ${
                      message.type === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-gray-200 shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>

                  {/* Message Actions */}
                  {message.type === 'ai' && (
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => handleCopyMessage(message.content)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Copy answer"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleRateMessage(message.id, 'helpful')}
                        className={`p-2 rounded-lg transition-colors ${
                          message.rating === 'helpful'
                            ? 'text-green-600 bg-green-100'
                            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                        }`}
                        title="Helpful"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleRateMessage(message.id, 'not-helpful')}
                        className={`p-2 rounded-lg transition-colors ${
                          message.rating === 'not-helpful'
                            ? 'text-red-600 bg-red-100'
                            : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                        }`}
                        title="Not helpful"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <span className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-start"
            >
              <div className="flex items-center">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0 rgba(99, 102, 241, 0.4)',
                      '0 0 0 10px rgba(99, 102, 241, 0)',
                      '0 0 0 0 rgba(99, 102, 241, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mr-3"
                >
                  <Bot className="h-6 w-6 text-white" />
                </motion.div>
                <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-indigo-600 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-indigo-600 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-indigo-600 rounded-full"
                      />
                    </div>
                    <span className="text-sm text-gray-600 ml-2">Learnex AI is generating your answer...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Smart Suggestions */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 justify-center">
          {smartSuggestions.map((suggestion, index) => (
            <motion.button
              key={suggestion}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all duration-200 shadow-sm"
            >
              <Sparkles className="h-4 w-4 inline mr-2" />
              {suggestion}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className={`relative rounded-2xl border-2 transition-all duration-300 ${
              isTyping 
                ? 'border-indigo-400 shadow-lg shadow-indigo-100' 
                : 'border-gray-200 hover:border-indigo-300'
            }`}>
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your doubt like you're chatting with a genius... 🤔💭"
                className="w-full px-6 py-4 pr-24 rounded-2xl resize-none focus:outline-none text-gray-900 placeholder-gray-500 bg-transparent"
                rows={3}
                disabled={isTyping}
              />
              
              {/* Input Actions */}
              <div className="absolute right-4 bottom-4 flex items-center space-x-2">
                <button
                  className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                  title="Voice input (coming soon)"
                >
                  <Mic className="h-5 w-5" />
                </button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 rounded-lg transition-colors"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default AskAIPage;
