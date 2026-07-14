import { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

// Rendered with a `key` (see GoalsPage) so it fully remounts whenever the
// user switches between "add" and "edit" or between different goals —
// that's what lets initial state below be derived safely without an effect.
export default function GoalFormModal({ isOpen, onClose, onSave, onDelete, initialGoal }) {
  const isEditing = !!initialGoal;

  const [title, setTitle] = useState(initialGoal?.title || '');
  const [description, setDescription] = useState(initialGoal?.description || '');
  const [targetDate, setTargetDate] = useState(initialGoal?.targetDate ? initialGoal.targetDate.slice(0, 10) : '');
  const [progress, setProgress] = useState(initialGoal?.progress ?? 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: initialGoal?.id || `goal_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      targetDate: targetDate || new Date().toISOString().slice(0, 10),
      progress: Number(progress)
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Goal' : 'New Goal'}>
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
          <label className="text-secondary font-medium" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Goal Title
          </label>
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Become a profitable trader"
            autoFocus
          />
        </div>

        <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
          <label className="text-secondary font-medium" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Description
          </label>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Why does this goal matter to you?"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
          <label className="text-secondary font-medium" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Target Date
          </label>
          <input
            type="date"
            className="input"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
          <label className="text-secondary font-medium" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Progress: {progress}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <div className="modal-actions" style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
          {isEditing ? (
            <Button
              type="button"
              variant="ghost"
              className="text-danger"
              onClick={() => { onDelete(initialGoal.id); onClose(); }}
            >
              Delete
            </Button>
          ) : <span />}
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!title.trim()}>{isEditing ? 'Save Changes' : 'Create Goal'}</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}