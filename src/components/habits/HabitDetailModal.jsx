import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import ProgressRing from '../common/ProgressRing';
import { Flame, Calendar, Award, Check } from 'lucide-react';
import { getHabitStats } from '../../utils/habitUtils';
import { getToday, formatDate } from '../../utils/dateUtils';

export default function HabitDetailModal({ isOpen, onClose, habit, onDelete, onToggleToday }) {
  if (!habit) return null;

  const { streak, total, thisMonth, progress, doneToday } = getHabitStats(habit);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Habit Details">
      <div className="habit-detail-content">
        <div className="habit-detail-header">
          <div className="habit-icon-large" style={{ backgroundColor: habit.color || 'var(--accent-primary)' }}></div>
          <h2>{habit.name}</h2>
          <p className="text-secondary">
            {habit.createdAt ? `Started ${formatDate(habit.createdAt.slice(0, 10), 'short')}` : 'Created recently'}
          </p>
        </div>

        <div className="habit-stats-grid">
          <div className="stat-box">
            <Flame className="stat-icon" size={24} color="var(--accent-warm)" />
            <span className="stat-number">{streak}</span>
            <span className="stat-label">Current Streak</span>
          </div>

          <div className="stat-box">
            <Calendar className="stat-icon" size={24} color="var(--accent-primary)" />
            <span className="stat-number">{thisMonth}</span>
            <span className="stat-label">This Month</span>
          </div>

          <div className="stat-box">
            <Award className="stat-icon" size={24} color="var(--success)" />
            <span className="stat-number">{total}</span>
            <span className="stat-label">Total Completions</span>
          </div>
        </div>

        <div className="habit-progress-section">
          <h3>Consistency (last 30 days)</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
            <ProgressRing progress={progress} size={80} strokeWidth={8} />
            <p className="text-secondary">
              {progress >= 70
                ? "You've been highly consistent with this habit. Keep up the great work!"
                : progress >= 30
                ? "You're making progress. Stay consistent to build a stronger streak."
                : "It's been a rough stretch. Try marking today done to restart your streak."}
            </p>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
          <Button variant="ghost" className="text-danger" onClick={() => onDelete(habit.id)}>
            Delete Habit
          </Button>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button
              variant={doneToday ? 'secondary' : 'primary'}
              icon={Check}
              onClick={() => onToggleToday(habit.id, getToday())}
            >
              {doneToday ? "Marked Done Today" : "Mark Today Done"}
            </Button>
            <Button onClick={onClose}>Done</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}