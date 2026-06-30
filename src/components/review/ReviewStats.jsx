import React from 'react';
import Card from '../common/Card';
import ProgressRing from '../common/ProgressRing';
import { Target, TrendingUp, Flame } from 'lucide-react';

export default function ReviewStats() {
  const weeklyScore = 82; // Dummy data

  return (
    <Card className="review-stats-card animate-scale-in">
      <div className="review-stats-header">
        <h3>Weekly Consistency Score</h3>
      </div>
      
      <div className="review-score-main">
        <ProgressRing progress={weeklyScore} size={160} strokeWidth={16} color="var(--success)" />
        <p className="score-feedback text-success">Excellent week! You're making solid progress.</p>
      </div>

      <div className="review-stats-grid">
        <div className="r-stat-box">
          <Target className="r-stat-icon text-accent" />
          <div className="r-stat-content">
            <span className="r-stat-val">24/30</span>
            <span className="r-stat-label">Tasks Done</span>
          </div>
        </div>
        
        <div className="r-stat-box">
          <Flame className="r-stat-icon text-warm" />
          <div className="r-stat-content">
            <span className="r-stat-val">3</span>
            <span className="r-stat-label">Streaks Kept</span>
          </div>
        </div>

        <div className="r-stat-box">
          <TrendingUp className="r-stat-icon text-success" />
          <div className="r-stat-content">
            <span className="r-stat-val">+5%</span>
            <span className="r-stat-label">vs Last Week</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
