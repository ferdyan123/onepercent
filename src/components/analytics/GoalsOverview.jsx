import React from 'react';
import Card from '../common/Card';

const STATUS_COLOR = {
  onTrack: 'var(--success)',
  atRisk: 'var(--accent-warm)',
  behind: 'var(--danger, #EF4444)'
};

const STATUS_LABEL = {
  onTrack: 'On Track',
  atRisk: 'At Risk',
  behind: 'Behind'
};

export default function GoalsOverview({ goals }) {
  if (goals.length === 0) {
    return (
      <Card className="analytics-card">
        <div className="card-header">
          <h3>Goals Overview</h3>
        </div>
        <p className="text-secondary" style={{ fontSize: 'var(--fs-sm)' }}>
          No goals yet — add one on the Goals page to track progress here.
        </p>
      </Card>
    );
  }

  return (
    <Card className="analytics-card">
      <div className="card-header">
        <h3>Goals Overview</h3>
      </div>

      <div className="habit-bar-list">
        {goals.map(g => {
          const color = STATUS_COLOR[g.status] || 'var(--accent-primary)';
          return (
            <div key={g.id} className="habit-bar-row">
              <div className="habit-bar-label">
                <span>{g.title}</span>
                <span style={{ color }}>{g.progress}% · {STATUS_LABEL[g.status] || g.status}</span>
              </div>
              <div className="habit-bar-track">
                <div className="habit-bar-fill" style={{ width: `${g.progress}%`, backgroundColor: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}