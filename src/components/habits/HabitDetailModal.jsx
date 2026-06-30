import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import ProgressRing from '../common/ProgressRing';
import { Flame, Calendar, Award } from 'lucide-react';

export default function HabitDetailModal({ isOpen, onClose, habit }) {
  if (!habit) return null;

  // Dummy stats
  const mockProgress = 78;
  const mockStreak = 12;
  const mockTotal = 150;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Habit Details">
      <div className="habit-detail-content">
        <div className="habit-detail-header">
          <div className="habit-icon-large" style={{ backgroundColor: habit.color || 'var(--accent-primary)' }}></div>
          <h2>{habit.name}</h2>
          <p className="text-secondary">Created recently</p>
        </div>

        <div className="habit-stats-grid">
          <div className="stat-box">
            <Flame className="stat-icon" size={24} color="var(--accent-warm)" />
            <span className="stat-number">{mockStreak}</span>
            <span className="stat-label">Current Streak</span>
          </div>
          
          <div className="stat-box">
            <Calendar className="stat-icon" size={24} color="var(--accent-primary)" />
            <span className="stat-number">24</span>
            <span className="stat-label">This Month</span>
          </div>
          
          <div className="stat-box">
            <Award className="stat-icon" size={24} color="var(--success)" />
            <span className="stat-number">{mockTotal}</span>
            <span className="stat-label">Total Completions</span>
          </div>
        </div>

        <div className="habit-progress-section">
          <h3>Consistency</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginTop: 'var(--space-4)' }}>
            <ProgressRing progress={mockProgress} size={80} strokeWidth={8} />
            <p className="text-secondary">You've been highly consistent with this habit. Keep up the great work to maintain your streak!</p>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
          <Button variant="ghost" className="text-danger">Delete Habit</Button>
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </Modal>
  );
}
