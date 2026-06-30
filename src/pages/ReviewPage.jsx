import React from 'react';
import ReviewStats from '../components/review/ReviewStats';
import ReflectionForm from '../components/review/ReflectionForm';
import { useTranslation } from '../hooks/useTranslation';

import './ReviewPage.css';

export default function ReviewPage() {
  const { t } = useTranslation();

  return (
    <div className="review-page-container animate-fade-in">
      <div className="page-header center">
        <h1>{t('dashboard.weeklyReview') || 'Weekly Review'}</h1>
        <p className="text-secondary">Take a moment to reflect on your progress</p>
      </div>

      <div className="review-grid">
        <ReviewStats />
        <ReflectionForm />
      </div>
    </div>
  );
}
