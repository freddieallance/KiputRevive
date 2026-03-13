import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import { allKiputWords } from '../data/kiputData';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export const TranslationBot = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: t("Hello! I am your KiputRevive AI guide. Ask me to translate a basic word!", "Helo! Saya adalah panduan AI KiputRevive anda. Minta saya terjemahkan perkataan asas!"), sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const handleVisibility = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setIsVisible(customEvent.detail);
      if (!customEvent.detail) {
        setIsOpen(false);
      }
    };
    window.addEventListener('setChatbotVisibility', handleVisibility);
    return () => window.removeEventListener('setChatbotVisibility', handleVisibility);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulated AI Processing
    setTimeout(() => {
      const responseText = processQuery(userMsg.text);
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const processQuery = (query: string): string => {
    const cleanQuery = query.toLowerCase().trim();
    const words = allKiputWords();

    // Try to find exact or partial match in English
    const englishMatch = words.find(w => cleanQuery.includes(w.english.toLowerCase()));
    if (englishMatch) {
      if (language === 'bm') {
        return `"${englishMatch.english}" dalam bahasa Kiput ialah "${englishMatch.kiput}". (Sebutan: ${englishMatch.pronunciation})`;
      }
      return `"${englishMatch.english}" in Kiput is "${englishMatch.kiput}". (Pronounced: ${englishMatch.pronunciation})`;
    }

    // Try to find exact or partial match in BM
    const bmMatch = words.find(w => w.bm && cleanQuery.includes(w.bm.toLowerCase()));
    if (bmMatch) {
      if (language === 'bm') {
        return `"${bmMatch.bm}" dalam bahasa Kiput ialah "${bmMatch.kiput}". (Sebutan: ${bmMatch.pronunciation})`;
      }
      return `"${bmMatch.bm}" in Kiput is "${bmMatch.kiput}". (Pronounced: ${bmMatch.pronunciation})`;
    }

    // Try to find exact or partial match in Kiput
    const kiputMatch = words.find(w => cleanQuery.includes(w.kiput.toLowerCase()));
    if (kiputMatch) {
      if (language === 'bm') {
        return `"${kiputMatch.kiput}" bermaksud "${kiputMatch.bm || kiputMatch.english}" dalam Bahasa Malaysia.`;
      }
      return `"${kiputMatch.kiput}" means "${kiputMatch.english}" in English.`;
    }

    // Fallback response
    if (language === 'bm') {
      return "Saya masih belajar! Saya hanya tahu perkataan asas dari senarai kosa kata anda buat masa ini. Cuba tanya untuk 'Anjing', 'Ibu', atau 'Sungai'.";
    }
    return "I'm still learning! I only know basic words from your vocabulary list right now. Try asking for 'Dog', 'Mother', or 'River'.";
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 p-4 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 transition-colors ${isOpen ? 'hidden' : 'block'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: 'calc(100vh - 6rem)' }}
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Bot size={24} />
                <h3 className="font-bold text-lg flex items-center gap-2">{t("KiputRevive AI Translator", "Penterjemah AI KiputRevive")} <Sparkles size={16} className="text-emerald-300"/></h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-700 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-100 text-emerald-900 rounded-tr-none' 
                      : 'bg-white border border-stone-200 text-stone-700 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-stone-200">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("Ask for a translation...", "Minta terjemahan...")}
                  className="flex-1 p-3 bg-stone-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-700"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="p-3 bg-emerald-600 text-white rounded-xl disabled:opacity-50 hover:bg-emerald-700 transition-colors"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
