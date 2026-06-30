import React, { useContext } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { getGreetingKey, formatDate } from '../../utils/dateUtils';
import { AppContext } from '../../context/AppContext';

export default function WelcomeHeader() {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  
  const greetingKey = getGreetingKey();
  const name = state.user.name || 'User';

  return (
    <div className="welcome-header animate-fade-in-up">
      <h1 className="welcome-title">
        {t(`greeting.${greetingKey}`)}, {name}!
      </h1>
      <p className="welcome-date">{formatDate(new Date(), 'long')}</p>
    </div>
  );
}
