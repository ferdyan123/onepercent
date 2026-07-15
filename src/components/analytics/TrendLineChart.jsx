import React from 'react';
import Card from '../common/Card';
import { toDateKey } from '../../utils/dateUtils';
import { getDayCompletionRate } from '../../utils/habitUtils';

const W = 500;
const H = 120;
const PAD_X = 8;
const PAD_Y = 12;
const DAYS = 14;

function toXY(index, value, total) {
  const x = PAD_X + (index / (total - 1)) * (W - PAD_X * 2);
  const y = PAD_Y + (1 - value / 100) * (H - PAD_Y * 2);
  return [x, y];
}

function smoothPath(points) {
  if (points.length < 2) return '';
  const tension = 0.3;
  let d = `M ${points[0][0]},${points[0][1]}`;

  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = i === 0 ? points[0] : points[i - 1];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const [x3, y3] = i + 2 < points.length ? points[i + 2] : points[i + 1];

    const cp1x = x1 + (x2 - x0) * tension;
    const cp1y = y1 + (y2 - y0) * tension;
    const cp2x = x2 - (x3 - x1) * tension;
    const cp2y = y2 - (y3 - y1) * tension;

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
  }
  return d;
}

function areaPath(points, linePath) {
  const last = points[points.length - 1];
  const first = points[0];
  return `${linePath} L ${last[0]},${H} L ${first[0]},${H} Z`;
}

export default function TrendLineChart({ habits }) {
  // Build the last 14 days' overall completion % from real habit data
  const dataPoints = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() - (DAYS - 1));

  for (let i = 0; i < DAYS; i++) {
    const dateKey = toDateKey(cursor);
    dataPoints.push(Math.round(getDayCompletionRate(habits, dateKey) * 100));
    cursor.setDate(cursor.getDate() + 1);
  }

  const hasAnyData = habits.length > 0;
  const coords = dataPoints.map((v, i) => toXY(i, v, DAYS));
  const line = smoothPath(coords);
  const area = areaPath(coords, line);
  const lastIdx = DAYS - 1;
  const labelIndices = [0, 6, 13];

  return (
    <Card className="analytics-card">
      <div className="card-header">
        <h3>Consistency Trend</h3>
        <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--accent-primary)', fontWeight: 'var(--fw-semibold)' }}>
          {hasAnyData ? `${dataPoints[lastIdx]}%` : '—'}
        </span>
      </div>

      {!hasAnyData ? (
        <p className="text-secondary" style={{ fontSize: 'var(--fs-sm)' }}>
          Add a habit and start checking it off to see your trend here.
        </p>
      ) : (
        <div style={{ position: 'relative', width: '100%', marginTop: 'var(--space-2)' }}>
          <svg viewBox={`0 0 ${W} ${H + 24}`} preserveAspectRatio="none" style={{ width: '100%', display: 'block', overflow: 'visible' }}>
            <defs>
              <linearGradient id="trendLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--accent-primary)" />
              </linearGradient>
              <linearGradient id="trendAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[25, 50, 75].map(pct => {
              const [, gy] = toXY(0, pct, DAYS);
              return (
                <line key={pct} x1={PAD_X} y1={gy} x2={W - PAD_X} y2={gy} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="4 6" />
              );
            })}

            <path d={area} fill="url(#trendAreaGrad)" />
            <path d={line} fill="none" stroke="url(#trendLineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {coords.map(([x, y], i) => {
              if (!labelIndices.includes(i) && i !== lastIdx) return null;
              const isLast = i === lastIdx;
              return (
                <circle key={i} cx={x} cy={y} r={isLast ? 5 : 3.5}
                  fill={isLast ? 'var(--accent-primary)' : 'var(--bg-secondary)'}
                  stroke="var(--accent-primary)" strokeWidth={isLast ? 0 : 2} />
              );
            })}

            {labelIndices.map(i => {
              const [x] = coords[i];
              const d = new Date();
              d.setDate(d.getDate() - (DAYS - 1) + i);
              return (
                <text key={i} x={x} y={H + 18} textAnchor="middle" fontSize="10" fill="var(--text-muted)">
                  {i === lastIdx ? 'Today' : d.toLocaleString('en-US', { month: 'short', day: 'numeric' })}
                </text>
              );
            })}
          </svg>
        </div>
      )}
    </Card>
  );
}