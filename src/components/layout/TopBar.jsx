import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Menu, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';
import './TopBar.css';

export default function TopBar() {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return t('nav.dashboard');
    if (path.startsWith('/goals')) return t('nav.goals');
    if (path.startsWith('/weekly-planner')) return t('nav.weeklyPlanner');
    if (path.startsWith('/calendar')) return t('nav.calendar');
    if (path.startsWith('/today')) return t('nav.today');
    if (path.startsWith('/habits')) return t('nav.habits');
    if (path.startsWith('/analytics')) return t('nav.analytics');
    if (path.startsWith('/review')) return t('nav.review');
    if (path.startsWith('/settings')) return t('nav.settings');
    return 'OnePercent';
  };

  return (
    <header className="topbar glass-card-static">
      <div className="topbar-left">
        <button className="mobile-menu-btn" aria-label="Menu">
          <Menu size={24} />
        </button>
        <h1 className="page-title">{getPageTitle()}</h1>
      </div>

      <div className="topbar-right">
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="icon-btn notification-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
      </div>
    </header>
  );
}
