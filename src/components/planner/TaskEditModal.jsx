import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { CATEGORIES } from '../../utils/constants';

// Rendered with a `key={task.id}` at the call site so it remounts cleanly
// per task, avoiding a setState-in-effect sync bug.
export default function TaskEditModal({ isOpen, onClose, task, onSave, onDelete }) {
  const { t } = useTranslation();
  const [editedTask, setEditedTask] = useState(task || { title: '', notes: '', category: '' });

  if (!task) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('planner.editTask')}>
      <form onSubmit={handleSubmit} className="task-edit-form">
        <div className="form-group">
          <label>{t('planner.taskTitle')}</label>
          <input 
            type="text" 
            className="input" 
            value={editedTask.title}
            onChange={e => setEditedTask({...editedTask, title: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select 
            className="input"
            value={editedTask.category || ''}
            onChange={e => {
              const cat = CATEGORIES.find(c => c.name === e.target.value);
              setEditedTask({
                ...editedTask, 
                category: e.target.value,
                categoryColor: cat ? cat.color : null
              });
            }}
          >
            <option value="">None</option>
            {CATEGORIES.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>{t('planner.taskNotes')}</label>
          <textarea 
            className="textarea" 
            value={editedTask.notes || ''}
            onChange={e => setEditedTask({...editedTask, notes: e.target.value})}
            placeholder="Add notes..."
          />
        </div>

        <div className="modal-actions" style={{ marginTop: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
          <Button variant="ghost" type="button" className="text-danger" onClick={() => onDelete(task.id)}>
            Delete
          </Button>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Button variant="ghost" type="button" onClick={onClose}>{t('common.cancel')}</Button>
            <Button type="submit">{t('common.save')}</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}