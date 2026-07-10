import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('languagePreference') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('languagePreference', language);
  }, [language]);

  const t = (key, ...args) => {
    let text = key;
    if (translations[language] && translations[language][key]) {
      text = translations[language][key];
    } else if (translations['en'][key]) {
      text = translations['en'][key];
    }

    if (args.length > 0) {
      args.forEach(arg => {
        text = text.replace('%s', arg);
      });
    }
    return text;
  };

  const toggleLanguage = () => {
    const langs = ['en', 'hi', 'te', 'ta', 'fr', 'ur'];
    setLanguage((prev) => langs[(langs.indexOf(prev) + 1) % langs.length]);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
