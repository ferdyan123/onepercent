import React from 'react';

export default function ProgressBar({ progress, color = 'var(--accent-primary)', height = 8 }) {
  return (
    <div 
      style={{
        width: '100%',
        height: height,
        background: 'var(--bg-elevated)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          width: `${progress}%`,
          height: '100%',
          background: color,
          borderRadius: 'var(--radius-full)',
          transition: 'width 1s ease-in-out'
        }}
      />
    </div>
  );
}
