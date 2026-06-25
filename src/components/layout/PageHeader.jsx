// src/components/layout/PageHeader.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

export default function PageHeader({
  title,
  subtitle,
  showBack = false,
  showSearch = false,
  onSearch,
  rightSlot,
  transparent = false,
}) {
  const navigate = useNavigate();

  return (
    <header
      className={`sticky top-0 z-50 px-4 pt-4 pb-3 ${
        transparent
          ? 'bg-transparent'
          : 'bg-[#0F0A1E]/80 backdrop-blur-lg border-b border-white/5'
      }`}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl glass-card hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={20} className="text-gray-300" />
          </button>
        )}

        <div className="flex-1 min-w-0">
          {title && (
            <h1 className="text-lg font-bold text-white leading-tight truncate">{title}</h1>
          )}
          {subtitle && (
            <p className="text-xs text-gray-400 mt-0.5 truncate">{subtitle}</p>
          )}
        </div>

        {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}

        {showSearch && (
          <button
            onClick={onSearch}
            className="w-9 h-9 flex items-center justify-center rounded-xl glass-card hover:bg-white/10 transition-all"
          >
            <Search size={18} className="text-gray-300" />
          </button>
        )}
      </div>
    </header>
  );
}
