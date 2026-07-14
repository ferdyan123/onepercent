import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../common/Card';

// Dummy data — 14 hari terakhir, lebih panjang biar kurva kelihatan smooth
const DATA_POINTS = [25, 40, 35, 60, 55, 75, 65, 80, 70, 85, 78, 90, 82, 95];
const DAY_LABELS  = ['30', '29', '28', '27', '26', '25', '24', '23', '22', '21', '20', '19', '18', 'Today'];

const W = 500;
const H = 120;
const PAD_X = 8;
const PAD_Y = 12;

function toXY(index, value, total) {
  const x = PAD_X + (index / (total - 1)) * (W - PAD_X * 2);
  const y = PAD_Y + (1 - value / 100) * (H - PAD_Y * 2);
  return [x, y];
}

// Hitung smooth bezier path dari array titik
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

// Area path: tutup ke bawah supaya bisa diisi gradient
function areaPath(points, linePath) {
  const last  = points[points.length - 1];
  const first = points[0];
  return `${linePath} L ${last[0]},${H} L ${first[0]},${H} Z`;
}

export default function DailyProgressLineChart() {
  const { t } = useTranslation();

  const coords  = DATA_POINTS.map((v, i) => toXY(i, v, DATA_POINTS.length));
  const line    = smoothPath(coords);
  const area    = areaPath(coords, line);

  // Cuma tampilkan label di posisi tertentu biar tidak penuh
  const labelIndices = [0, 3, 6, 9, 13];
  const lastIdx = DATA_POINTS.length - 1;
  const [lastX, lastY] = coords[lastIdx];

  return (
    <Card className="dashboard-card line-chart-card animate-scale-in" style={{ animationDelay: '200ms' }}>
      <div className="card-header">
        <h3>{t('dashboard.completionRate') || 'Completion Rate'} (14 Days)</h3>
        <span style={{
          fontSize: 'var(--fs-sm)',
          color: 'var(--accent-primary)',
          fontWeight: 'var(--fw-semibold)'
        }}>
          {DATA_POINTS[lastIdx]}%
        </span>
      </div>

      <div style={{ position: 'relative', width: '100%', marginTop: 'var(--space-2)' }}>
        <svg
          viewBox={`0 0 ${W} ${H + 24}`}
          preserveAspectRatio="none"
          style={{ width: '100%', display: 'block', overflow: 'visible' }}
        >
          <defs>
            {/* Gradient garis */}
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="var(--accent-primary)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--accent-primary)" />
            </linearGradient>
            {/* Gradient area bawah garis */}
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="var(--accent-primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
            </linearGradient>
            {/* Glow filter buat line */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines horizontal — subtle */}
          {[25, 50, 75].map(pct => {
            const [, gy] = toXY(0, pct, DATA_POINTS.length);
            return (
              <line
                key={pct}
                x1={PAD_X} y1={gy}
                x2={W - PAD_X} y2={gy}
                stroke="var(--border-subtle)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            );
          })}

          {/* Area fill di bawah garis */}
          <path d={area} fill="url(#areaGrad)" />

          {/* Garis utama smooth */}
          <path
            d={line}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Dot hanya di titik-titik tertentu */}
          {coords.map(([x, y], i) => {
            if (!labelIndices.includes(i)) return null;
            const isLast = i === lastIdx;
            return (
              <g key={i}>
                {isLast && (
                  <circle cx={x} cy={y} r="8" fill="var(--accent-primary)" opacity="0.15" />
                )}
                <circle
                  cx={x} cy={y} r={isLast ? 5 : 3.5}
                  fill={isLast ? 'var(--accent-primary)' : 'var(--bg-secondary)'}
                  stroke="var(--accent-primary)"
                  strokeWidth={isLast ? 0 : 2}
                />
              </g>
            );
          })}

          {/* Tooltip value di titik today */}
          <g>
            <rect
              x={lastX - 22} y={lastY - 28}
              width="44" height="22"
              rx="6"
              fill="var(--accent-primary)"
            />
            <text
              x={lastX} y={lastY - 13}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="white"
            >
              {DATA_POINTS[lastIdx]}%
            </text>
            {/* Panah kecil ke bawah */}
            <polygon
              points={`${lastX - 5},${lastY - 7} ${lastX + 5},${lastY - 7} ${lastX},${lastY - 2}`}
              fill="var(--accent-primary)"
            />
          </g>

          {/* Label hari di bawah */}
          {labelIndices.map(i => {
            const [x] = coords[i];
            return (
              <text
                key={i}
                x={x} y={H + 18}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-muted)"
              >
                {i === lastIdx ? 'Today' : `Jun ${DAY_LABELS[i]}`}
              </text>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}