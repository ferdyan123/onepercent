import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { 
  Sparkles, 
  LayoutDashboard, 
  Target, 
  CalendarRange, 
  Calendar, 
  Sun, 
  Repeat, 
  BarChart3, 
  BookOpen, 
  Settings
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const { t } = useTranslation();

  const navItems = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: t('nav.dashboard') },
    { to: '/goals', icon: <Target size={20} />, label: t('nav.goals') },
    { to: '/weekly-planner', icon: <CalendarRange size={20} />, label: t('nav.weeklyPlanner') },
    { to: '/calendar', icon: <Calendar size={20} />, label: t('nav.calendar') },
    { to: '/today', icon: <Sun size={20} />, label: t('nav.today') },
    { to: '/habits', icon: <Repeat size={20} />, label: t('nav.habits') },
    { to: '/analytics', icon: <BarChart3 size={20} />, label: t('nav.analytics') },
    { to: '/review', icon: <BookOpen size={20} />, label: t('nav.review') },
  ];

  return (
    <aside className="sidebar glass-card-static">
      <div className="sidebar-header">
        <Sparkles className="logo-icon" size={24} />
        <span className="logo-text">OnePercent</span>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.to} className="nav-item">
              <NavLink 
                to={item.to} 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                title={item.label}
              >
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span className="nav-label">{t('nav.settings')}</span>
        </NavLink>
        <div className="user-profile">
          <div className="avatar">U</div>
          <span className="user-name">User</span>
        </div>
      </div>
    </aside>
  );
}
