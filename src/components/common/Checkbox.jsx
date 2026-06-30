import React from 'react';
import { Check } from 'lucide-react';

export default function Checkbox({ checked, onChange, label, className = '' }) {
  return (
    <label className={`checkbox-wrapper ${className}`}>
      <div className={`checkbox ${checked ? 'checked' : ''}`}>
        <input 
          type="checkbox" 
          checked={checked} 
          onChange={onChange}
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
        />
        <Check className="checkmark" size={14} strokeWidth={3} />
      </div>
      {label && (
        <span className={`checkbox-label ${checked ? 'completed' : ''}`}>
          {label}
        </span>
      )}
    </label>
  );
}
