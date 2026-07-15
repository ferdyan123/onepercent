import { useEffect } from 'react';

// Fixed local reminder times, matching what StepReminders / Settings show.
const REMINDER_TIMES = {
  morning:   { hour: 8,  minute: 0,  title: "Good morning! ☀️",  body: "Check your habits and plan today's tasks." },
  afternoon: { hour: 14, minute: 0,  title: "Afternoon check-in", body: "How's today going? Keep the momentum up." },
  night:     { hour: 20, minute: 0,  title: "Evening review 🌙",  body: "Wrap up today's habits before you rest." }
};

// Milliseconds until the next occurrence of hour:minute (today if it hasn't
// passed yet, otherwise tomorrow).
function msUntilNext(hour, minute) {
  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  return target.getTime() - now.getTime();
}

// Schedules browser Notifications for each enabled reminder, as long as
// notifications are turned on in Settings and permission was granted.
// Reschedules itself daily via a chain of setTimeout calls.
export function useNotificationScheduler(settings) {
  useEffect(() => {
    if (!settings?.notificationsEnabled) return;
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;

    const timeoutIds = [];

    Object.entries(REMINDER_TIMES).forEach(([key, { hour, minute, title, body }]) => {
      if (!settings.reminders?.[key]) return;

      const scheduleNext = () => {
        const delay = msUntilNext(hour, minute);
        const id = setTimeout(() => {
          try {
            new Notification(title, { body, icon: '/favicon.svg' });
          } catch {
            // Notifications can fail silently (e.g. tab backgrounded on some
            // browsers) — not critical enough to interrupt the app.
          }
          scheduleNext(); // chain to the same time tomorrow
        }, delay);
        timeoutIds.push(id);
      };

      scheduleNext();
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, [settings?.notificationsEnabled, settings?.reminders]);
}