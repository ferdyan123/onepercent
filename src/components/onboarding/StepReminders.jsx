import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../common/Card';
import Button from '../common/Button';
import Toggle from '../common/Toggle';

export default function StepReminders({ onNext, onBack, updateData, initialData }) {
  const { t } = useTranslation();
  const [reminders, setReminders] = useState(initialData || {
    morning: true,
    afternoon: true,
    night: true
  });

  const toggleReminder = (key) => {
    setReminders(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNext = () => {
    updateData(reminders);
    onNext();
  };

  return (
    <div className="onboarding-step animate-fade-in-up">
      <h2 className="step-title">{t('onboarding.setReminders')}</h2>
      
      <div className="reminders-list">
        <Card className="reminder-card">
          <div className="reminder-info">
            <h4>{t('settings.morningReminder')}</h4>
            <p>08:00 AM</p>
          </div>
          <Toggle 
            checked={reminders.morning} 
            onChange={() => toggleReminder('morning')} 
          />
        </Card>

        <Card className="reminder-card">
          <div className="reminder-info">
            <h4>{t('settings.afternoonReminder')}</h4>
            <p>02:00 PM</p>
          </div>
          <Toggle 
            checked={reminders.afternoon} 
            onChange={() => toggleReminder('afternoon')} 
          />
        </Card>

        <Card className="reminder-card">
          <div className="reminder-info">
            <h4>{t('settings.nightReminder')}</h4>
            <p>08:00 PM</p>
          </div>
          <Toggle 
            checked={reminders.night} 
            onChange={() => toggleReminder('night')} 
          />
        </Card>
      </div>

      <div className="step-actions">
        <Button variant="ghost" onClick={onBack}>← {t('common.back')}</Button>
        <Button onClick={handleNext}>{t('common.next')} →</Button>
      </div>
    </div>
  );
}
