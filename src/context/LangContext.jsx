import React, { createContext, useContext, useState, useEffect } from 'react';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState('hi'); // Default to Hindi like the original site

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    document.title = lang === 'hi' 
      ? 'हर्ष & कशिश · विवाह निमंत्रण' 
      : 'Harsh & Kashish · Wedding Invitation';
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'hi' ? 'en' : 'hi'));
  };

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within LangProvider');
  }
  return context;
}
