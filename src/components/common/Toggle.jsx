import React from 'react';

export default function Toggle({ checked, onChange }) {
  return (
    <label 
      style={{
        display: 'inline-block',
        width: 44,
        height: 24,
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        style={{ opacity: 0, width: 0, height: 0 }}
      />
      <span 
        style={{
          position: 'absolute',
          cursor: 'pointer',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: checked ? 'var(--accent-primary)' : 'var(--bg-hover)',
          transition: 'var(--transition-base)',
          borderRadius: 34
        }}
      >
        <span 
          style={{
            position: 'absolute',
            height: 18,
            width: 18,
            left: 3,
            bottom: 3,
            backgroundColor: 'white',
            transition: 'var(--transition-base)',
            borderRadius: '50%',
            transform: checked ? 'translateX(20px)' : 'translateX(0)'
          }}
        />
      </span>
    </label>
  );
}
