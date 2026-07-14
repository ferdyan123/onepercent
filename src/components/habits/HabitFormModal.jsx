import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

const COLOR_OPTIONS = [
  '#3B82F6', '#10B981', '#EF4444', '#F59E0B',
  '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
];

export default function HabitFormModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLOR_OPTIONS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: `habit_${Date.now()}`,
      name: name.trim(),
      color,
      completions: {}
    });

    setName('');
    setColor(COLOR_OPTIONS[0]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Habit">
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
          <label className="text-secondary font-medium" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Habit Name
          </label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Morning Workout"
            autoFocus
          />
        </div>

        <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
          <label className="text-secondary font-medium" style={{ display: 'block', marginBottom: 'var(--space-2)' }}>
            Color
          </label>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {COLOR_OPTIONS.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: c,
                  border: color === c ? '3px solid var(--text-primary)' : '3px solid transparent',
                  cursor: 'pointer'
                }}
                aria-label={`Choose color ${c}`}
              />
            ))}
          </div>
        </div>

        <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!name.trim()}>Create Habit</Button>
        </div>
      </form>
    </Modal>
  );
}