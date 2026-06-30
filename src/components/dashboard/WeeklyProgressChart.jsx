import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../common/Card';

export default function WeeklyProgressChart({ data }) {
  const { t } = useTranslation();
  
  // Dummy data if none provided
  const chartData = data || [
    { day: 'M', value: 60 },
    { day: 'T', value: 80 },
    { day: 'W', value: 40 },
    { day: 'T', value: 90 },
    { day: 'F', value: 50 },
    { day: 'S', value: 70 },
    { day: 'S', value: 30 }
  ];

  return (
    <Card className="dashboard-card weekly-chart-card animate-scale-in" style={{ animationDelay: '400ms' }}>
      <div className="card-header">
        <h3>{t('dashboard.weeklyProgress')}</h3>
        <span className="weekly-avg">68%</span>
      </div>
      
      <div className="bar-chart-container">
        {chartData.map((item, index) => (
          <div key={index} className="bar-wrapper">
            <div className="bar-bg">
              <div 
                className="bar-fill" 
                style={{ 
                  height: `${item.value}%`,
                  background: 'var(--accent-gradient)'
                }} 
              />
            </div>
            <span className="bar-label">{item.day}</span>
          </div>
        ))}
        {/* Goal line */}
        <div className="goal-line" style={{ bottom: '80%' }}>
          <span className="goal-text">80%</span>
        </div>
      </div>
    </Card>
  );
}
