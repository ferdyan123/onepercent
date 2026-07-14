import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { AppContext } from '../context/AppContext';
import { Sparkles } from 'lucide-react';

import StepLanguage from '../components/onboarding/StepLanguage';
import StepGoals from '../components/onboarding/StepGoals';
import StepHabits from '../components/onboarding/StepHabits';
import StepReminders from '../components/onboarding/StepReminders';
import StepComplete from '../components/onboarding/StepComplete';

import './OnboardingPage.css';

export default function OnboardingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [onboardingData, setOnboardingData] = useState({
    goal: '',
    habits: [],
    reminders: { morning: true, afternoon: true, night: true }
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateData = (key, data) => {
    setOnboardingData(prev => ({ ...prev, [key]: data }));
  };

  const handleComplete = () => {
    // Save the goal
    const newGoal = {
      id: crypto.randomUUID(),
      title: onboardingData.goal,
      description: '',
      targetDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(), // 1 year from now
      progress: 0,
      status: 'onTrack'
    };
    dispatch({ type: 'ADD_GOAL', payload: newGoal });

    // Save the habits
    const habitColors = ['#3B82F6', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899'];
    onboardingData.habits.forEach((habitName, index) => {
      dispatch({ 
        type: 'ADD_HABIT', 
        payload: {
          id: crypto.randomUUID(),
          name: habitName,
          color: habitColors[index % habitColors.length],
          icon: 'circle', // simplified for now
          completions: {},
          createdAt: new Date().toISOString()
        }
      });
    });

    // Complete onboarding
    dispatch({ 
      type: 'COMPLETE_ONBOARDING', 
      payload: { name: 'User' } // we could ask for name, but keep it simple for now
    });
    
    navigate('/');
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <Sparkles className="logo-icon" size={24} />
        <span className="logo-text">OnePercent</span>
      </div>

      <div className="onboarding-content">
        <div className="stepper">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`step-dot ${i + 1 === currentStep ? 'active' : i + 1 < currentStep ? 'completed' : ''}`} 
            />
          ))}
        </div>
        <p className="step-indicator">Step {currentStep} of {totalSteps}</p>

        <div className="step-container">
          {currentStep === 1 && (
            <StepLanguage onNext={handleNext} />
          )}
          {currentStep === 2 && (
            <StepGoals 
              onNext={handleNext} 
              onBack={handleBack} 
              updateData={(data) => updateData('goal', data)} 
              initialData={onboardingData.goal} 
            />
          )}
          {currentStep === 3 && (
            <StepHabits 
              onNext={handleNext} 
              onBack={handleBack} 
              updateData={(data) => updateData('habits', data)} 
              initialData={onboardingData.habits} 
            />
          )}
          {currentStep === 4 && (
            <StepReminders 
              onNext={handleNext} 
              onBack={handleBack} 
              updateData={(data) => updateData('reminders', data)} 
              initialData={onboardingData.reminders} 
            />
          )}
          {currentStep === 5 && (
            <StepComplete onComplete={handleComplete} />
          )}
        </div>
      </div>
    </div>
  );
}