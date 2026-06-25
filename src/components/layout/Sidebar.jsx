// src/components/layout/Sidebar.jsx
// Desktop-only left sidebar navigation
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Plus, Bell, User, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'templates', label: 'Templates', icon: LayoutGrid, path: '/templates' },
  { id: 'reminders', label: 'Reminders', icon: Bell, path: '/reminders' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-white/5 bg-[#0d0920] px-4 py-6 z-50">
      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-3 px-3 py-2 mb-8 group"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform"
          style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)' }}
        >
          🌾
        </div>
        <div className="text-left">
          <p className="text-sm font-bold text-white leading-tight">Celebrate</p>
          <p className="text-xs font-bold text-gradient-warm leading-tight">Assam</p>
        </div>
      </button>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              id={`sidebar-${item.id}`}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left w-full ${
                isActive
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              style={isActive ? {
                background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(251,191,36,0.1))',
                border: '1px solid rgba(249,115,22,0.25)',
              } : {}}
            >
              <Icon
                size={19}
                className={isActive ? 'text-orange-400' : ''}
                strokeWidth={isActive ? 2.5 : 2}
              />
              {item.label}
              {isActive && (
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: '#F97316' }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Create CTA */}
      <button
        id="sidebar-create"
        onClick={() => navigate('/create')}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold text-white btn-shimmer mt-4"
      >
        <Plus size={17} strokeWidth={2.5} />
        Create Wish
      </button>

      {/* Brand footer */}
      <div className="mt-6 px-3">
        <p className="text-[10px] text-gray-700">© 2024 Celebrate Assam</p>
        <p className="text-[10px] text-gray-700">Made with ❤️ in Assam</p>
      </div>
    </aside>
  );
}
