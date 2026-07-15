import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import OverviewStats from '../components/analytics/OverviewStats';
import HabitPerformanceChart from '../components/analytics/HabitPerformanceChart';
import TrendLineChart from '../components/analytics/TrendLineChart';
import GoalsOverview from '../components/analytics/GoalsOverview';
import { calculateProgress, calculateStreak } from '../utils/habitUtils';

import './AnalyticsPage.css';

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const { habits, goals } = state;

  const { avgConsistency, bestStreak } = useMemo(() => {
    if (habits.length === 0) return { avgConsistency: 0, bestStreak: 0 };
    const avg = Math.round(habits.reduce((sum, h) => sum + calculateProgress(h.completions), 0) / habits.length);
    const best = Math.max(...habits.map(h => calculateStreak(h.completions)));
    return { avgConsistency: avg, bestStreak: best };
  }, [habits]);

  return (
    <div className="analytics-page-container animate-fade-in">
      <div className="page-header">
        <h1>{t('dashboard.analytics') || 'Analytics'}</h1>
        <p className="text-secondary">See how your consistency is trending over time</p>
      </div>

      <OverviewStats
        totalHabits={habits.length}
        totalGoals={goals.length}
        avgConsistency={avgConsistency}
        bestStreak={bestStreak}
      />

      <TrendLineChart habits={habits} />

      <div className="analytics-two-col">
        <HabitPerformanceChart habits={habits} />
        <GoalsOverview goals={goals} />
      </div>
    </div>
  );
}