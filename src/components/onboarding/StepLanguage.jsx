import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../common/Card';
import Button from '../common/Button';

export default function StepLanguage({ onNext }) {
  const { t, language, setLanguage } = useTranslation();

  const handleSelect = (lang) => {
    setLanguage(lang);
    // Add small delay to let translation update before moving
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="onboarding-step animate-fade-in-up">
      <h2 className="step-title">{t('onboarding.chooseLanguage')}</h2>
      
      <div className="language-options">
        <Card 
          className={`lang-card ${language === 'en' ? 'selected' : ''}`}
          hoverable
          onClick={() => handleSelect('en')}
        >
          <div className="lang-icon">🇺🇸</div>
          <h3>English</h3>
        </Card>
        
        <Card 
          className={`lang-card ${language === 'id' ? 'selected' : ''}`}
          hoverable
          onClick={() => handleSelect('id')}
        >
          <div className="lang-icon">🇮🇩</div>
          <h3>Bahasa Indonesia</h3>
        </Card>
      </div>

      <div className="step-actions">
        <Button onClick={onNext} className="next-btn">{t('common.next')} →</Button>
      </div>
    </div>
  );
}
