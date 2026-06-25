// src/components/templates/CategoryFilter.jsx
import React from 'react';
import { CATEGORIES } from '../../data/categories';

export default function CategoryFilter({ active, onChange }) {
  const all = { id: 'all', label: 'All', emoji: '✨', color: '#F97316' };
  const items = [all, ...CATEGORIES];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 custom-scroll px-4 snap-x">
      {items.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            id={`filter-${cat.id}`}
            onClick={() => onChange(cat.id)}
            className={`flex-shrink-0 snap-start flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
              isActive
                ? 'text-white shadow-lg'
                : 'glass-card text-gray-400 hover:text-white border border-white/5'
            }`}
            style={
              isActive
                ? {
                    background: `linear-gradient(135deg, ${cat.color}CC, ${cat.color}88)`,
                    boxShadow: `0 4px 15px ${cat.color}40`,
                  }
                : {}
            }
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
