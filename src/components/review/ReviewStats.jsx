import React from 'react';
import Card from '../common/Card';
import ProgressRing from '../common/ProgressRing';
import { Target, TrendingUp, Flame } from 'lucide-react';
import { calculateStreak, getConsistencyForDates } from '../../utils/habitUtils';

function scoreFeedback(score) {
  if (score >= 80) return { text: "Excellent week! You're making solid progress.", className: 'text-success' };
  if (score >= 50) return { text: "Good week — keep pushing for more consistency.", className: 'text-accent' };
  if (score > 0) return { text: "A tough week. Small steps still count — restart tomorrow.", className: 'text-warm' };
  return { text: "No activity logged this week yet.", className: 'text-secondary' };
}

export default function ReviewStats({ habits, tasksThisWeek, weekDateKeys, lastWeekDateKeys }) {
  const { percent: weeklyScore } = getConsistencyForDates(habits, weekDateKeys);
  const { percent: lastWeekScore } = getConsistencyForDates(habits, lastWeekDateKeys);
  const diff = weeklyScore - lastWeekScore;

  const streaksKept = habits.filter(h => calculateStreak(h.completions) > 0).length;
  const tasksDone = tasksThisWeek.filter(t => t.completed).length;

  const feedback = scoreFeedback(weeklyScore);

  return (
    <Card className="review-stats-card animate-scale-in">
      <div className="review-stats-header">
        <h3>Weekly Consistency Score</h3>
      </div>
      
      <div className="review-score-main">
        <ProgressRing progress={weeklyScore} size={160} strokeWidth={16} color="var(--success)" />
        <p className={`score-feedback ${feedback.className}`}>{feedback.text}</p>
      </div>

      <div className="review-stats-grid">
        <div className="r-stat-box">
          <Target className="r-stat-icon text-accent" />
          <div className="r-stat-content">
            <span className="r-stat-val">{tasksDone}/{tasksThisWeek.length}</span>
            <span className="r-stat-label">Tasks Done</span>
          </div>
        </div>
        
        <div className="r-stat-box">
          <Flame className="r-stat-icon text-warm" />
          <div className="r-stat-content">
            <span className="r-stat-val">{streaksKept}</span>
            <span className="r-stat-label">Streaks Kept</span>
          </div>
        </div>

        <div className="r-stat-box">
          <TrendingUp className="r-stat-icon text-success" />
          <div className="r-stat-content">
            <span className="r-stat-val">{diff >= 0 ? '+' : ''}{diff}%</span>
            <span className="r-stat-label">vs Last Week</span>
          </div>
        </div>
      </div>
    </Card>
  );
}