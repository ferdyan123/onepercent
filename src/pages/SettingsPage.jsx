import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import Card from '../components/common/Card';
import Toggle from '../components/common/Toggle';
import { Bell, BellOff } from 'lucide-react';

import './SettingsPage.css';

const REMINDER_ROWS = [
  { key: 'morning', label: 'Morning Reminder', time: '08:00 AM' },
  { key: 'afternoon', label: 'Afternoon Reminder', time: '02:00 PM' },
  { key: 'night', label: 'Night Reminder', time: '08:00 PM' }
];

export default function SettingsPage() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const { settings } = state;
  const [permissionDenied, setPermissionDenied] = useState(
    typeof Notification !== 'undefined' && Notification.permission === 'denied'
  );

  const handleToggleNotifications = async () => {
    if (!settings.notificationsEnabled) {
      if (typeof Notification === 'undefined') return;

      if (Notification.permission === 'granted') {
        dispatch({ type: 'UPDATE_SETTINGS', payload: { notificationsEnabled: true } });
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        dispatch({ type: 'UPDATE_SETTINGS', payload: { notificationsEnabled: true } });
      } else {
        setPermissionDenied(true);
      }
    } else {
      dispatch({ type: 'UPDATE_SETTINGS', payload: { notificationsEnabled: false } });
    }
  };

  const handleToggleReminder = (key) => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: { reminders: { ...settings.reminders, [key]: !settings.reminders[key] } }
    });
  };

  return (
    <div className="settings-page-container animate-fade-in">
      <div className="page-header">
        <h1>{t('nav.settings') || 'Settings'}</h1>
        <p className="text-secondary">Manage how OnePercent keeps you on track</p>
      </div>

      <Card className="settings-card">
        <div className="settings-row settings-row-main">
          <div className="settings-row-info">
            {settings.notificationsEnabled ? <Bell size={20} className="text-accent" /> : <BellOff size={20} className="text-secondary" />}
            <div>
              <h4>Enable Notifications</h4>
              <p className="text-secondary">Get reminded to check your habits and tasks</p>
            </div>
          </div>
          <Toggle checked={settings.notificationsEnabled} onChange={handleToggleNotifications} />
        </div>

        {permissionDenied && !settings.notificationsEnabled && (
          <p className="settings-warning">
            Notifications are blocked in your browser. Enable them from your browser's site settings to use this feature.
          </p>
        )}
      </Card>

      <Card className="settings-card">
        <div className="card-header">
          <h3>Reminder Schedule</h3>
        </div>
        <div className="reminders-list">
          {REMINDER_ROWS.map(({ key, label, time }) => (
            <div className="settings-row" key={key}>
              <div className="settings-row-info">
                <div>
                  <h4>{label}</h4>
                  <p className="text-secondary">{time}</p>
                </div>
              </div>
              <Toggle
                checked={settings.reminders[key]}
                onChange={() => handleToggleReminder(key)}
              />
            </div>
          ))}
        </div>
        {!settings.notificationsEnabled && (
          <p className="text-secondary settings-hint">
            Turn on notifications above for these reminders to actually fire.
          </p>
        )}
      </Card>
    </div>
  );
}