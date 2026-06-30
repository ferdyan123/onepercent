import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import GoalCard from '../components/goals/GoalCard';
import Button from '../components/common/Button';
import { Plus } from 'lucide-react';

import './GoalsPage.css';

export default function GoalsPage() {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);

  // Use state goals, or mock data if empty
  const goals = state.goals.length > 0 ? state.goals : [
    {
      id: '1',
      title: 'Build a profitable business',
      description: 'Reach $10k MRR by the end of the year through consistent product building and marketing.',
      progress: 65,
      targetDate: new Date('2026-12-31').toISOString(),
      status: 'onTrack'
    },
    {
      id: '2',
      title: 'Read 24 Books',
      description: 'Read 2 books per month to expand knowledge on psychology and business.',
      progress: 30,
      targetDate: new Date('2026-12-31').toISOString(),
      status: 'behind'
    }
  ];

  return (
    <div className="goals-page-container animate-fade-in">
      <div className="page-header goals-header">
        <div>
          <h1>{t('dashboard.goals') || 'Goals'}</h1>
          <p className="text-secondary">Your big picture targets</p>
        </div>
        <Button icon={Plus}>Add Goal</Button>
      </div>

      <div className="goals-grid">
        {goals.map((goal, i) => (
          <div key={goal.id} style={{ animationDelay: `${i * 100}ms` }}>
            <GoalCard goal={goal} onEdit={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}
