// src/components/layout/BottomNav.jsx
// Mobile-only bottom navigation (hidden on md+)
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Plus, Bell, User } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'templates', label: 'Templates', icon: LayoutGrid, path: '/templates' },
  { id: 'create', label: 'Create', icon: Plus, path: '/create', isCenter: true },
  { id: 'reminders', label: 'Reminders', icon: Bell, path: '/reminders' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="md:hidden bottom-nav">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => navigate(item.path)}
                className="relative -mt-8 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl btn-shimmer flex items-center justify-center shadow-lg glow-orange">
                  <Plus size={26} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="block text-center text-[10px] mt-1.5 font-medium text-orange-400">Create</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => navigate(item.path)}
              className={`nav-item flex-1 ${isActive ? 'active' : ''}`}
            >
              <Icon
                size={22}
                className={`transition-colors duration-200 ${isActive ? 'text-orange-400' : 'text-gray-500'}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium transition-colors duration-200 ${isActive ? 'text-orange-400' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
