import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../common/Card';
import ProgressRing from '../common/ProgressRing';

export default function DailyProgressCard({ completedHabits, totalHabits }) {
  const { t } = useTranslation();
  
  const progress = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  return (
    <Card className="dashboard-card daily-progress-card animate-scale-in" style={{ animationDelay: '100ms' }}>
      <div className="progress-ring-wrapper">
        <ProgressRing 
          progress={progress} 
          size={140} 
          strokeWidth={14}
          color="url(#gradient-accent)"
        />
        {/* SVG Def for gradient used by ProgressRing */}
        <svg style={{ width: 0, height: 0, position: 'absolute' }}>
          <defs>
            <linearGradient id="gradient-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-primary)" />
              <stop offset="100%" stopColor="var(--accent-warm)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="daily-progress-info">
        <h3>{t('dashboard.dailyProgress')}</h3>
        <p>{completedHabits}/{totalHabits} Habits Completed</p>
      </div>
    </Card>
  );
}
