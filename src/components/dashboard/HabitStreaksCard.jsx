import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../common/Card';
import { Flame } from 'lucide-react';
import { calculateStreak } from '../../utils/habitUtils';

export default function HabitStreaksCard({ habits }) {
  const { t } = useTranslation();

  return (
    <Card className="dashboard-card streaks-card animate-scale-in" style={{ animationDelay: '200ms' }}>
      <div className="card-header">
        <h3>{t('dashboard.habitStreaks')}</h3>
      </div>

      {habits.length === 0 ? (
        <p className="text-secondary" style={{ fontSize: 'var(--fs-sm)' }}>
          No habits yet — add one to see your streaks here.
        </p>
      ) : (
        <div className="streaks-grid">
          {habits.slice(0, 4).map(habit => {
            const streak = calculateStreak(habit.completions);
            return (
              <div key={habit.id} className="streak-item">
                <span className="streak-habit-name">{habit.name}</span>
                <div className="streak-count">
                  <Flame className="streak-icon" size={16} />
                  <span>{streak} days</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}