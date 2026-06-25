// src/hooks/useReminders.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'celebrate-assam-reminders';

export function useReminders() {
  const [reminders, setReminders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (reminder) => {
    setReminders((prev) => [
      ...prev,
      { ...reminder, id: Date.now().toString(), createdAt: new Date().toISOString() },
    ]);
  };

  const removeReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const getUpcoming = () => {
    const today = new Date();
    return reminders
      .map((r) => {
        const next = getNextOccurrence(r.date, r.isYearly);
        const daysUntil = Math.ceil((next - today) / (1000 * 60 * 60 * 24));
        return { ...r, daysUntil, nextDate: next };
      })
      .sort((a, b) => a.daysUntil - b.daysUntil);
  };

  return { reminders, addReminder, removeReminder, getUpcoming };
}

function getNextOccurrence(dateString, isYearly) {
  const today = new Date();
  const date = new Date(dateString);
  if (!isYearly) return date;
  const thisYear = new Date(today.getFullYear(), date.getMonth(), date.getDate());
  if (thisYear >= today) return thisYear;
  return new Date(today.getFullYear() + 1, date.getMonth(), date.getDate());
}
