import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../common/Card';
import Button from '../common/Button';
import { BookOpen } from 'lucide-react';

export default function JournalEntry({ journalText, onSave }) {
  const { t } = useTranslation();
  const [text, setText] = useState(journalText || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(text);
    setIsEditing(false);
  };

  return (
    <Card className="journal-card animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <BookOpen size={20} className="journal-icon" style={{ color: 'var(--accent-primary)' }} />
          <h3>{t('today.journal')}</h3>
        </div>
      </div>
      
      <div className="journal-content">
        <p className="journal-prompt">{t('today.journalPrompt')}</p>
        
        {isEditing || !text ? (
          <div className="journal-edit-mode">
            <textarea 
              className="textarea journal-textarea" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('today.writeJournal')}
              rows={4}
            />
            <div className="journal-actions">
              {text && <Button variant="ghost" onClick={() => setIsEditing(false)}>{t('common.cancel')}</Button>}
              <Button onClick={handleSave} disabled={!text.trim()}>{t('common.save')}</Button>
            </div>
          </div>
        ) : (
          <div className="journal-view-mode" onClick={() => setIsEditing(true)}>
            <div className="journal-text-display">
              {text.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
