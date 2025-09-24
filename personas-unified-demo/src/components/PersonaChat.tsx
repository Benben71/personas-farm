'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface PersonaChatProps {
  persona: {
    id: string;
    identite_profil: {
      age: number;
      statut: string;
      situation: string;
    };
    systeme_croyances?: {
      rapport_information: string;
      perception_medias: string;
      liberte_expression_désinfo: string;
    };
    rapport_science?: {
      litteratie_scientifique: string;
      perception_evolution: string;
      confiance_institutions: string;
    };
    valeurs: string[];
    besoins_freins_jtbd: {
      jobs: string[];
      freins: string[];
    };
    motivations: string[];
    enjeux_communication: {
      sujets: string[];
      leviers: string[];
    };
    tonalite_et_eviter: {
      ton: string;
      a_eviter: string[];
    };
    accessibilite_inclusion: {
      langage: string;
      formats: string[];
    };
    conclusion: string;
  };
  isOpen: boolean;
  onClose: () => void;
  site?: string;
}

export default function PersonaChat({ persona, isOpen, onClose, site }: PersonaChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Generate dynamic welcome message using the LLM
      generateWelcomeMessage();
    }
  }, [isOpen, persona.id]);

  const generateWelcomeMessage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/persona-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personaId: persona.id,
          message: "Peux-tu te présenter brièvement ?",
          site: site || 'info'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Error generating welcome message:', error);
      // Fallback to simple greeting
      const fallbackMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: `Salut ! Je suis ${persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}. Comment puis-je t'aider ?`,
        timestamp: new Date()
      };
      setMessages([fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/persona-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personaId: persona.id,
          message: inputMessage.trim(),
          site: site || 'info'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Show a subtle indicator if using fallback responses
      if (data.fallback) {
        console.log('Using fallback responses - OpenAI API not configured');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Désolé, j'ai un petit problème technique. Peux-tu réessayer ? Si le problème persiste, essaie de recharger la page.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">
                Conversation avec {persona.id.charAt(0).toUpperCase() + persona.id.slice(1)}
              </h3>
              <p className="text-sm text-neutral-500">
                {persona.identite_profil.age} ans • {persona.identite_profil.statut}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-neutral-100 text-neutral-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-neutral-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-neutral-100 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-neutral-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
