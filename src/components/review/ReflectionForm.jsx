import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';

// Rendered with key={weekStart} at the call site so it remounts cleanly
// whenever the reviewed week changes, instead of syncing via effect.
export default function ReflectionForm({ weekStart, existingReview, onSave }) {
  const [wentWell, setWentWell] = useState(existingReview?.wentWell || '');
  const [improve, setImprove] = useState(existingReview?.improve || '');
  const [isEditing, setIsEditing] = useState(!existingReview);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ weekStart, wentWell, improve, savedAt: new Date().toISOString() });
    setIsEditing(false);
  };

  if (!isEditing && existingReview) {
    return (
      <Card className="reflection-card success animate-fade-in">
        <div className="reflection-success-content">
          <h3>Reflection Saved!</h3>
          <p className="text-secondary">Great job taking the time to review your week. You are 1% better.</p>
          <div style={{ textAlign: 'left', marginTop: 'var(--space-4)', width: '100%' }}>
            <p className="text-secondary" style={{ marginBottom: 'var(--space-2)' }}><strong>What went well:</strong> {existingReview.wentWell}</p>
            <p className="text-secondary"><strong>What to improve:</strong> {existingReview.improve}</p>
          </div>
          <Button onClick={() => setIsEditing(true)} variant="ghost" style={{ marginTop: 'var(--space-4)' }}>
            Edit Reflection
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="reflection-card animate-fade-in-up" style={{ animationDelay: '100ms' }}>
      <div className="card-header">
        <h3>Weekly Reflection</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="reflection-form">
        <div className="form-group">
          <label>What went well this week?</label>
          <textarea 
            className="textarea" 
            rows="3" 
            placeholder="I managed to workout 4 times..."
            value={wentWell}
            onChange={e => setWentWell(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>What could be improved?</label>
          <textarea 
            className="textarea" 
            rows="3" 
            placeholder="I need to sleep earlier..."
            value={improve}
            onChange={e => setImprove(e.target.value)}
            required
          />
        </div>

        <Button type="submit" size="lg" className="w-full mt-4">
          Save Reflection
        </Button>
      </form>
    </Card>
  );
}