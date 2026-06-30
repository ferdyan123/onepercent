import React, { useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Button from '../common/Button';
import { CheckCircle } from 'lucide-react';

export default function StepComplete({ onComplete }) {
  const { t } = useTranslation();

  return (
    <div className="onboarding-step animate-scale-in step-complete">
      <div className="complete-icon-wrapper">
        <CheckCircle size={64} className="complete-icon" />
      </div>
      <h2 className="step-title">{t('common.done')}!</h2>
      <p className="step-subtitle">You're all set to become 1% better every day.</p>
      
      <div className="step-actions center">
        <Button onClick={onComplete} size="lg" className="lets-go-btn">
          {t('onboarding.letsGo')}
        </Button>
      </div>
    </div>
  );
}
