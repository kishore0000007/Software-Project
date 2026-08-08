import { createContext, useContext, useMemo, useState } from "react";
import translations from "../i18n/translations";

const LanguageContext = createContext(null);

const getInitialLanguage = () => {
  const saved = localStorage.getItem("language");
  return saved === "bn" || saved === "en" ? saved : "en";
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage);

  const setAndPersistLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const toggleLanguage = () => {
    setAndPersistLanguage(language === "en" ? "bn" : "en");
  };

  const t = useMemo(() => {
    const dict = translations[language] || translations.en;
    return (key) => dict[key] ?? translations.en[key] ?? key;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: setAndPersistLanguage, toggleLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};

export default LanguageContext;
