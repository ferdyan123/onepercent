import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarRange, Sun, Repeat, BarChart3 } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import './BottomNav.css';

export default function BottomNav() {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', icon: <LayoutDashboard size={24} />, label: t('nav.dashboard') },
    { to: '/weekly-planner', icon: <CalendarRange size={24} />, label: t('nav.weeklyPlanner') },
    { to: '/today', icon: <Sun size={24} />, label: t('nav.today') },
    { to: '/habits', icon: <Repeat size={24} />, label: t('nav.habits') },
    { to: '/analytics', icon: <BarChart3 size={24} />, label: t('nav.analytics') },
  ];

  return (
    <nav className="bottom-nav glass-card-static">
      <ul className="bottom-nav-list">
        {navItems.map((item) => (
          <li key={item.to} className="bottom-nav-item">
            <NavLink 
              to={item.to} 
              className={({ isActive }) => `bottom-nav-link ${isActive ? 'active' : ''}`}
            >
              <div className="bottom-nav-icon">{item.icon}</div>
              <span className="bottom-nav-label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
