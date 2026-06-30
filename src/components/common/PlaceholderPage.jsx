import React from 'react';

export default function PlaceholderPage({ title }) {
  return (
    <div className="empty-state">
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-text">This page is currently under construction. Please check back later.</p>
    </div>
  );
}
