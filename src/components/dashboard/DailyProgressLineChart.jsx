import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../common/Card';

export default function DailyProgressLineChart() {
  const { t } = useTranslation();

  // Dummy data points for a line chart (representing 7 days of the week)
  const dataPoints = [20, 45, 30, 70, 60, 85, 90];
  const maxVal = 100;
  
  // Generate SVG path for the line
  const width = 300;
  const height = 100;
  
  const getCoordinatesForPoint = (value, index, totalPoints) => {
    const x = (index / (totalPoints - 1)) * width;
    const y = height - (value / maxVal) * height;
    return `${x},${y}`;
  };

  const polylinePoints = dataPoints.map((val, idx) => getCoordinatesForPoint(val, idx, dataPoints.length)).join(' ');

  return (
    <Card className="dashboard-card line-chart-card animate-scale-in" style={{ animationDelay: '600ms' }}>
      <div className="card-header">
        <h3>{t('dashboard.completionRate')} (Trend)</h3>
      </div>
      <div className="line-chart-container" style={{ position: 'relative', height: '120px', width: '100%', marginTop: 'var(--space-4)' }}>
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {/* Grid lines */}
          <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="var(--border-subtle)" strokeDasharray="4 4" />
          
          {/* Gradient for area under the line */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Area under line */}
          <polygon 
            points={`0,${height} ${polylinePoints} ${width},${height}`} 
            fill="url(#areaGradient)" 
          />
          
          {/* The line itself */}
          <polyline 
            points={polylinePoints} 
            fill="none" 
            stroke="var(--accent-primary)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          
          {/* Data points (circles) */}
          {dataPoints.map((val, idx) => {
            const [x, y] = getCoordinatesForPoint(val, idx, dataPoints.length).split(',');
            return (
              <circle 
                key={idx} 
                cx={x} 
                cy={y} 
                r="4" 
                fill="var(--bg-secondary)" 
                stroke="var(--accent-primary)" 
                strokeWidth="2" 
              />
            );
          })}
        </svg>
      </div>
    </Card>
  );
}
