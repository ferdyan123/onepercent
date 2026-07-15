import React, { useContext, useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Bell, Menu, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';
import { AppContext } from '../../context/AppContext';
import { useTranslation } from '../../hooks/useTranslation';
import { getToday } from '../../utils/dateUtils';
import { isDoneToday } from '../../utils/habitUtils';
import './TopBar.css';

export default function TopBar() {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { state } = useContext(AppContext);
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const today = getToday();
  const pendingTasks = state.tasks.filter(t => t.date === today && !t.completed);
  const pendingHabits = state.habits.filter(h => !isDoneToday(h.completions));
  const pendingCount = pendingTasks.length + pendingHabits.length;

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

        <div className="notification-wrapper" ref={panelRef}>
          <button
            className="icon-btn notification-btn"
            aria-label="Notifications"
            onClick={() => setIsOpen(prev => !prev)}
          >
            <Bell size={20} />
            {pendingCount > 0 && <span className="notification-badge"></span>}
          </button>

          {isOpen && (
            <div className="notification-panel glass-card-static animate-fade-in">
              <h4 className="notification-panel-title">Today</h4>

              {pendingCount === 0 ? (
                <p className="text-secondary notification-empty">
                  You're all caught up for today. 🎉
                </p>
              ) : (
                <ul className="notification-list">
                  {pendingTasks.slice(0, 4).map(t => (
                    <li key={t.id}>{t.title}</li>
                  ))}
                  {pendingHabits.slice(0, 4).map(h => (
                    <li key={h.id}>Check off: {h.name}</li>
                  ))}
                </ul>
              )}

              {!state.settings.notificationsEnabled && (
                <Link to="/settings" className="notification-cta" onClick={() => setIsOpen(false)}>
                  Turn on reminders →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}