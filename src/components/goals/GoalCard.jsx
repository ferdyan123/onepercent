import React from 'react';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { Target, Flag, Edit3 } from 'lucide-react';

export default function GoalCard({ goal, onEdit }) {
  // Determine color based on progress
  let progressColor = 'var(--accent-primary)';
  if (goal.progress >= 75) progressColor = 'var(--success)';
  else if (goal.progress < 25) progressColor = 'var(--accent-warm)';

  return (
    <Card className="goal-detail-card animate-scale-in">
      <div className="goal-card-header">
        <div className="goal-title-group">
          <Target className="goal-icon" size={24} style={{ color: progressColor }} />
          <h3>{goal.title}</h3>
        </div>
        <button className="icon-btn" onClick={() => onEdit(goal)}>
          <Edit3 size={18} />
        </button>
      </div>

      <p className="goal-description text-secondary">
        {goal.description || "No description provided. Define why this goal is important to you."}
      </p>

      <div className="goal-progress-section">
        <div className="goal-progress-labels">
          <span className="font-medium">Progress</span>
          <span className="font-bold" style={{ color: progressColor }}>{goal.progress}%</span>
        </div>
        <ProgressBar progress={goal.progress} color={progressColor} height={12} />
      </div>

      <div className="goal-footer">
        <div className="goal-meta">
          <Flag size={14} />
          <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
        </div>
        <div className="goal-status-badge" style={{ backgroundColor: `${progressColor}20`, color: progressColor }}>
          {goal.status === 'onTrack' ? 'On Track' : goal.status === 'atRisk' ? 'At Risk' : 'Behind'}
        </div>
      </div>
    </Card>
  );
}
