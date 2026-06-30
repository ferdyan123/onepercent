import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';

export default function GoalProgressCard({ goals }) {
  const { t } = useTranslation();
  
  // Just show the first active goal on the dashboard
  const activeGoal = goals && goals.length > 0 ? goals[0] : null;

  if (!activeGoal) return null;

  return (
    <Card className="dashboard-card goal-summary-card animate-scale-in" style={{ animationDelay: '500ms' }}>
      <div className="card-header">
        <h3>{t('dashboard.goalProgress')}</h3>
        <span className="goal-percentage">{activeGoal.progress}%</span>
      </div>
      
      <div className="goal-summary-content">
        <h4 className="goal-title-small">{activeGoal.title}</h4>
        <ProgressBar progress={activeGoal.progress} color="var(--success)" />
        <p className="goal-status-text">
          {activeGoal.progress >= 50 ? t('goals.onTrack') : t('goals.behind')}
        </p>
      </div>
    </Card>
  );
}
