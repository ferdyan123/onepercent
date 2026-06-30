import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Target, Edit2 } from 'lucide-react';
import Card from '../common/Card';

export default function FocusAreaBanner({ focusArea, onSave }) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(focusArea || '');

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <Card className="focus-area-banner animate-scale-in">
      <div className="focus-header">
        <Target size={20} className="focus-icon" />
        <h3>{t('today.focusArea')}</h3>
        {!isEditing && (
          <button className="icon-btn edit-btn" onClick={() => setIsEditing(true)}>
            <Edit2 size={16} />
          </button>
        )}
      </div>
      
      <div className="focus-content">
        {isEditing ? (
          <div className="focus-edit-mode">
            <input 
              type="text" 
              className="input focus-input" 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('today.setFocus')}
              autoFocus
            />
            <button className="btn btn-sm btn-primary" onClick={handleSave}>
              {t('common.save')}
            </button>
          </div>
        ) : (
          <p className="focus-text">
            {focusArea || <span className="text-muted">{t('today.setFocus')}</span>}
          </p>
        )}
      </div>
    </Card>
  );
}
