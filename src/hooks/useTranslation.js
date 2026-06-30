import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import en from '../locales/en.json';
import id from '../locales/id.json';

const locales = { en, id };

export function useTranslation() {
  const { language, setLanguage } = useContext(LanguageContext);
  
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = locales[language];
    for (const k of keys) {
      value = value?.[k];
    }
    if (typeof value !== 'string') return key;
    return value.replace(/\{\{(\w+)\}\}/g, (_, p) => params[p] ?? '');
  };
  
  return { t, language, setLanguage };
}
