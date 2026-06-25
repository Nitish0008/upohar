// src/pages/ProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star, Share2, Bell, Palette, Info, ChevronRight,
  Heart, Gift, Sparkles
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Badge from '../components/ui/Badge';

const MENU_ITEMS = [
  {
    group: 'My Activity',
    items: [
      { id: 'saved', icon: Heart, label: 'Saved Templates', badge: null, color: '#FB7185' },
      { id: 'created', icon: Gift, label: 'Cards Created', badge: '3', color: '#F97316' },
      { id: 'shared', icon: Share2, label: 'Shares', badge: null, color: '#A78BFA' },
    ],
  },
  {
    group: 'Preferences',
    items: [
      { id: 'notifications', icon: Bell, label: 'Notifications', badge: null, color: '#FBBF24' },
      { id: 'theme', icon: Palette, label: 'Appearance', badge: 'Dark', color: '#2DD4BF' },
    ],
  },
  {
    group: 'About',
    items: [
      { id: 'rate', icon: Star, label: 'Rate This App', badge: null, color: '#FBBF24' },
      { id: 'about', icon: Info, label: 'About Celebrate Assam', badge: null, color: '#60A5FA' },
    ],
  },
];

const STATS = [
  { label: 'Cards Made', value: '3', emoji: '🎴' },
  { label: 'Wishes Sent', value: '12', emoji: '💌' },
  { label: 'Days Streak', value: '5', emoji: '🔥' },
];

export default function ProfilePage() {
  return (
    <main className="flex-1 flex flex-col min-h-0">
      <PageHeader title="Profile" />

      <div className="flex-1 overflow-y-auto pb-safe custom-scroll">
        {/* Profile Hero */}
        <div className="px-4 pt-4 pb-6 text-center relative">
          {/* Avatar */}
          <div className="relative inline-block mb-4">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl mx-auto"
              style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)' }}
            >
              🌾
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-green-500 border-2 border-[#0F0A1E] flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-white">Celebration Creator</h2>
          <p className="text-sm text-gray-500 mt-1">Spreading joy since 2024</p>

          <div className="flex items-center justify-center gap-1 mt-2">
            <Badge color="orange">🌾 Assam Local</Badge>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-4 mt-5">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* App Promo Card */}
        <div
          className="mx-4 mb-5 p-4 rounded-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(251,191,36,0.1))',
            border: '1px solid rgba(249,115,22,0.3)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">⭐</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Enjoying Celebrate Assam?</p>
              <p className="text-xs text-gray-400 mt-0.5">Share with friends & spread the joy!</p>
            </div>
            <button
              className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)' }}
            >
              Share
            </button>
          </div>
        </div>

        {/* Menu Groups */}
        <div className="px-4 space-y-5 pb-4">
          {MENU_ITEMS.map((group) => (
            <div key={group.group}>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                {group.group}
              </p>
              <div className="rounded-2xl overflow-hidden border border-white/5 divide-y divide-white/5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      id={`profile-${item.id}`}
                      className="w-full flex items-center gap-3 px-4 py-3.5 glass-card hover:bg-white/5 transition-all text-left"
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}20` }}
                      >
                        <Icon size={16} style={{ color: item.color }} />
                      </div>
                      <span className="flex-1 text-sm font-medium text-gray-300">{item.label}</span>
                      {item.badge && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${item.color}20`, color: item.color }}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight size={15} className="text-gray-600 flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Brand footer */}
        <div className="text-center px-4 py-6">
          <p className="text-2xl mb-1">🌾</p>
          <p className="text-xs font-semibold text-gradient-warm">Celebrate Assam</p>
          <p className="text-[10px] text-gray-700 mt-1">Version 1.0 • Made with ❤️ in Assam</p>
        </div>
      </div>
    </main>
  );
}
