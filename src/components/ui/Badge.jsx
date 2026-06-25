// src/components/ui/Badge.jsx
import React from 'react';

export default function Badge({ children, color = 'orange', className = '' }) {
  const colors = {
    orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    gold: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    violet: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
    teal: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    gray: 'bg-white/10 text-gray-400 border-white/10',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border
        ${colors[color] || colors.orange} ${className}
      `}
    >
      {children}
    </span>
  );
}
