import React from 'react';
import Card from '../common/Card';
import { Target, Repeat, TrendingUp, Flame } from 'lucide-react';

export default function OverviewStats({ totalHabits, totalGoals, avgConsistency, bestStreak }) {
  const stats = [
    { icon: Repeat, label: 'Active Habits', value: totalHabits, color: 'var(--accent-primary)' },
    { icon: Target, label: 'Active Goals', value: totalGoals, color: 'var(--success)' },
    { icon: TrendingUp, label: 'Avg Consistency', value: `${avgConsistency}%`, color: 'var(--accent-warm)' },
    { icon: Flame, label: 'Best Streak', value: `${bestStreak}d`, color: 'var(--accent-warm)' },
  ];

  return (
    <div className="analytics-overview-row">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <Card key={label} className="analytics-stat-card">
          <div className="analytics-stat-icon" style={{ backgroundColor: `${color}22`, color }}>
            <Icon size={20} />
          </div>
          <div>
            <span className="analytics-stat-value">{value}</span>
            <span className="analytics-stat-label">{label}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}