import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { GOAL_SUGGESTIONS } from '../../utils/constants';
import Card from '../common/Card';
import Button from '../common/Button';

export default function StepGoals({ onNext, onBack, updateData, initialData }) {
  const { t } = useTranslation();
  const [goal, setGoal] = useState(initialData || '');

  const handleNext = () => {
    if (goal.trim()) {
      updateData(goal);
      onNext();
    }
  };

  return (
    <div className="onboarding-step animate-fade-in-up">
      <h2 className="step-title">{t('onboarding.setGoal')}</h2>
      <p className="step-subtitle">{t('onboarding.goalExamples')}</p>
      
      <div className="goal-input-container">
        <input 
          type="text" 
          className="input goal-input"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder={t('goals.goalTitle')}
          autoFocus
        />
      </div>

      <div className="suggestions">
        {GOAL_SUGGESTIONS.slice(0, 4).map((s) => (
          <button 
            key={s} 
            className="suggestion-chip"
            onClick={() => setGoal(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="step-actions">
        <Button variant="ghost" onClick={onBack}>← {t('common.back')}</Button>
        <Button onClick={handleNext} disabled={!goal.trim()}>{t('common.next')} →</Button>
      </div>
    </div>
  );
}
