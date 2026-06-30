import React from 'react';

export default function Card({ children, className = '', hoverable = false, ...props }) {
  return (
    <div 
      className={`${hoverable ? 'glass-card' : 'glass-card-static'} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}
