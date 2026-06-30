import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { DEFAULT_HABITS } from '../../utils/constants';
import Card from '../common/Card';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';

export default function StepHabits({ onNext, onBack, updateData, initialData }) {
  const { t } = useTranslation();
  const [selectedHabits, setSelectedHabits] = useState(initialData || []);

  const toggleHabit = (habitName) => {
    setSelectedHabits(prev => 
      prev.includes(habitName) 
        ? prev.filter(h => h !== habitName)
        : [...prev, habitName]
    );
  };

  const handleNext = () => {
    updateData(selectedHabits);
    onNext();
  };

  return (
    <div className="onboarding-step animate-fade-in-up">
      <h2 className="step-title">{t('onboarding.createHabits')}</h2>
      <p className="step-subtitle">{t('onboarding.habitExamples')}</p>
      
      <div className="habits-selection-list">
        {DEFAULT_HABITS.map((habit) => (
          <Card 
            key={habit.name}
            className={`habit-select-card ${selectedHabits.includes(habit.name) ? 'selected' : ''}`}
            hoverable
            onClick={() => toggleHabit(habit.name)}
          >
            <Checkbox 
              checked={selectedHabits.includes(habit.name)} 
              onChange={() => {}} // handled by card click
            />
            <span className="habit-name">{habit.name}</span>
          </Card>
        ))}
      </div>

      <div className="step-actions">
        <Button variant="ghost" onClick={onBack}>← {t('common.back')}</Button>
        <Button onClick={handleNext} disabled={selectedHabits.length === 0}>
          {t('common.next')} →
        </Button>
      </div>
    </div>
  );
}
