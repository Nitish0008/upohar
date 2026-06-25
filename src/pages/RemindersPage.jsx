// src/pages/RemindersPage.jsx
import React, { useState } from 'react';
import { Bell, Plus, Trash2, Calendar } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import { useReminders } from '../hooks/useReminders';
import { useToast } from '../components/ui/Toast';

const REMINDER_TYPES = [
  { id: 'birthday', label: 'Birthday', emoji: '🎂', color: '#F97316' },
  { id: 'anniversary', label: 'Anniversary', emoji: '❤️', color: '#FB7185' },
  { id: 'custom', label: 'Custom', emoji: '📅', color: '#A78BFA' },
];

function AddReminderModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', type: 'birthday', date: '', isYearly: true });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handleSubmit = () => {
    if (!form.name.trim() || !form.date) return;
    onAdd(form);
    setForm({ name: '', type: 'birthday', date: '', isYearly: true });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Reminder">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Person's Name *</label>
          <input type="text" placeholder="e.g. Priya Sharma" value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Occasion Type</label>
          <div className="flex gap-2 flex-wrap">
            {REMINDER_TYPES.map((t) => (
              <button key={t.id} onClick={() => update('type', t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${form.type === t.id ? 'text-white' : 'glass-card text-gray-400 border border-white/5'}`}
                style={form.type === t.id ? { background: `${t.color}30`, border: `1px solid ${t.color}50` } : {}}>
                <span>{t.emoji}</span>{t.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Date *</label>
          <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500/50 [color-scheme:dark]" />
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl glass-card border border-white/5">
          <div>
            <p className="text-sm font-medium text-white">Repeat Yearly</p>
            <p className="text-xs text-gray-500">Remind every year automatically</p>
          </div>
          <button onClick={() => update('isYearly', !form.isYearly)}
            className={`relative w-12 h-6 rounded-full transition-all duration-200 ${form.isYearly ? 'bg-orange-500' : 'bg-white/10'}`}>
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${form.isYearly ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
        <Button fullWidth size="lg" onClick={handleSubmit} disabled={!form.name.trim() || !form.date} id="add-reminder-btn">
          Add Reminder
        </Button>
      </div>
    </Modal>
  );
}

function ReminderCard({ reminder, onDelete }) {
  const typeInfo = REMINDER_TYPES.find((t) => t.id === reminder.type) || REMINDER_TYPES[0];
  const isToday = reminder.daysUntil === 0;
  const isSoon = reminder.daysUntil <= 7 && reminder.daysUntil > 0;
  return (
    <div className={`relative p-4 lg:p-5 rounded-2xl glass-card border transition-all ${isToday ? 'border-orange-500/50 animate-pulse-glow' : 'border-white/5 hover:border-white/10'}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${typeInfo.color}20`, border: `1px solid ${typeInfo.color}30` }}>
          {typeInfo.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-white">{reminder.name}</p>
            {isToday && <Badge color="orange">Today! 🎉</Badge>}
            {isSoon && !isToday && <Badge color="gold">In {reminder.daysUntil} days</Badge>}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{typeInfo.label}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <Calendar size={12} className="text-gray-600" />
            <span className="text-xs text-gray-500">
              {reminder.isYearly ? 'Yearly' : 'One-time'} • {isToday ? 'Today!' : `${reminder.daysUntil} days away`}
            </span>
          </div>
        </div>
        <button onClick={() => onDelete(reminder.id)}
          className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

export default function RemindersPage() {
  const [showAdd, setShowAdd] = useState(false);
  const { addReminder, removeReminder, getUpcoming } = useReminders();
  const toast = useToast();
  const upcoming = getUpcoming();

  return (
    <main className="flex-1 flex flex-col min-h-0">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0F0A1E]/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Birthday Reminders</h1>
            <p className="text-xs text-gray-500 mt-0.5">Never miss a special day</p>
          </div>
          <Button size="sm" onClick={() => setShowAdd(true)} icon={<Plus size={14} />} id="open-add-reminder">
            Add Reminder
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 md:pb-6 custom-scroll">
        <div className="max-w-3xl mx-auto px-6 py-6 space-y-3">
          {upcoming.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
              <div className="text-6xl">📅</div>
              <div className="text-center">
                <p className="text-xl font-bold text-white">No reminders yet</p>
                <p className="text-sm text-gray-500 mt-2">Add birthdays & anniversaries to never miss them again</p>
              </div>
              <Button onClick={() => setShowAdd(true)} icon={<Plus size={16} />} size="lg" id="empty-add-reminder">
                Add Your First Reminder
              </Button>
            </div>
          ) : (
            <>
              {upcoming.some((r) => r.daysUntil === 0) && (
                <>
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-wider">🎉 Today</p>
                  {upcoming.filter((r) => r.daysUntil === 0).map((r) => (
                    <ReminderCard key={r.id} reminder={r} onDelete={(id) => { removeReminder(id); toast.show({ message: 'Reminder removed', type: 'info' }); }} />
                  ))}
                </>
              )}
              {upcoming.filter((r) => r.daysUntil > 0).length > 0 && (
                <>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-4">Upcoming</p>
                  {upcoming.filter((r) => r.daysUntil > 0).map((r) => (
                    <ReminderCard key={r.id} reminder={r} onDelete={(id) => { removeReminder(id); toast.show({ message: 'Reminder removed', type: 'info' }); }} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <AddReminderModal isOpen={showAdd} onClose={() => setShowAdd(false)}
        onAdd={(r) => { addReminder(r); toast.show({ message: `Reminder added for ${r.name}!`, type: 'success' }); }} />
    </main>
  );
}
