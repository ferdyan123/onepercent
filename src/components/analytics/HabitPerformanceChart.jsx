import React from 'react';
import Card from '../common/Card';
import { calculateProgress, calculateStreak } from '../../utils/habitUtils';

export default function HabitPerformanceChart({ habits }) {
  if (habits.length === 0) {
    return (
      <Card className="analytics-card">
        <div className="card-header">
          <h3>Habit Performance</h3>
        </div>
        <p className="text-secondary" style={{ fontSize: 'var(--fs-sm)' }}>
          No habits yet — add some on the Habits page to see performance here.
        </p>
      </Card>
    );
  }

  // Sort best-to-worst by 30-day consistency
  const ranked = habits
    .map(h => ({
      id: h.id,
      name: h.name,
      color: h.color || 'var(--accent-primary)',
      progress: calculateProgress(h.completions),
      streak: calculateStreak(h.completions)
    }))
    .sort((a, b) => b.progress - a.progress);

  return (
    <Card className="analytics-card">
      <div className="card-header">
        <h3>Habit Performance</h3>
        <span className="text-secondary" style={{ fontSize: 'var(--fs-xs)' }}>Last 30 days</span>
      </div>

      <div className="habit-bar-list">
        {ranked.map(h => (
          <div key={h.id} className="habit-bar-row">
            <div className="habit-bar-label">
              <span>{h.name}</span>
              <span className="text-secondary">{h.progress}% · {h.streak}d streak</span>
            </div>
            <div className="habit-bar-track">
              <div
                className="habit-bar-fill"
                style={{ width: `${h.progress}%`, backgroundColor: h.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}