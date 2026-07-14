import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import ReviewStats from '../components/review/ReviewStats';
import ReflectionForm from '../components/review/ReflectionForm';
import { useTranslation } from '../hooks/useTranslation';
import { getWeekDates, getWeekStart, toDateKey } from '../utils/dateUtils';

import './ReviewPage.css';

export default function ReviewPage() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);

  // This week and last week, as real calendar date keys.
  const weekDateKeys = useMemo(() => getWeekDates(0).map(d => d.dateKey), []);
  const lastWeekDateKeys = useMemo(() => getWeekDates(-1).map(d => d.dateKey), []);
  const weekStart = useMemo(() => toDateKey(getWeekStart(0)), []);

  const tasksThisWeek = state.tasks.filter(t => weekDateKeys.includes(t.date));
  const existingReview = state.reviews.find(r => r.weekStart === weekStart);

  const handleSaveReview = (reviewData) => {
    dispatch({ type: 'UPSERT_REVIEW', payload: reviewData });
  };

  return (
    <div className="review-page-container animate-fade-in">
      <div className="page-header center">
        <h1>{t('dashboard.weeklyReview') || 'Weekly Review'}</h1>
        <p className="text-secondary">Take a moment to reflect on your progress</p>
      </div>

      <div className="review-grid">
        <ReviewStats
          habits={state.habits}
          tasksThisWeek={tasksThisWeek}
          weekDateKeys={weekDateKeys}
          lastWeekDateKeys={lastWeekDateKeys}
        />
        <ReflectionForm
          key={weekStart}
          weekStart={weekStart}
          existingReview={existingReview}
          onSave={handleSaveReview}
        />
      </div>
    </div>
  );
}