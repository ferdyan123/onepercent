import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import GoalCard from '../components/goals/GoalCard';
import GoalFormModal from '../components/goals/GoalFormModal';
import Button from '../components/common/Button';
import { Plus, Target } from 'lucide-react';

import './GoalsPage.css';

export default function GoalsPage() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const goals = state.goals;

  const openAddModal = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  const openEditModal = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleSave = (goalData) => {
    if (editingGoal) {
      dispatch({ type: 'UPDATE_GOAL', payload: goalData });
    } else {
      dispatch({ type: 'ADD_GOAL', payload: goalData });
    }
  };

  const handleDelete = (goalId) => {
    dispatch({ type: 'DELETE_GOAL', payload: goalId });
  };

  return (
    <div className="goals-page-container animate-fade-in">
      <div className="page-header goals-header">
        <div>
          <h1>{t('dashboard.goals') || 'Goals'}</h1>
          <p className="text-secondary">Your big picture targets</p>
        </div>
        <Button icon={Plus} onClick={openAddModal}>Add Goal</Button>
      </div>

      {goals.length === 0 ? (
        <div className="empty-state animate-fade-in" style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)' }}>
          <Target size={40} className="text-secondary" style={{ marginBottom: 'var(--space-3)' }} />
          <h3>No goals yet</h3>
          <p className="text-secondary" style={{ marginBottom: 'var(--space-4)' }}>
            Set your first big-picture target to guide your weekly planning.
          </p>
          <Button icon={Plus} onClick={openAddModal}>Add Your First Goal</Button>
        </div>
      ) : (
        <div className="goals-grid">
          {goals.map((goal, i) => (
            <div key={goal.id} style={{ animationDelay: `${i * 100}ms` }}>
              <GoalCard goal={goal} onEdit={openEditModal} />
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <GoalFormModal
          key={editingGoal?.id || 'new'}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDelete}
          initialGoal={editingGoal}
        />
      )}
    </div>
  );
}