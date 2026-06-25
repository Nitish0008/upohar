// src/components/home/CategoryGrid.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { ChevronRight } from 'lucide-react';

function CategoryCard({ category }) {
  const navigate = useNavigate();
  return (
    <button
      id={`category-${category.id}`}
      onClick={() => navigate(`/templates?category=${category.id}`)}
      className="relative group w-full text-left rounded-2xl p-5 glass-card glass-card-hover border border-white/5 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(ellipse at bottom left, ${category.color}20 0%, transparent 70%)` }}
      />
      <div className="relative flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: `${category.color}20`, border: `1px solid ${category.color}30` }}
        >
          {category.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{category.label}</p>
          <p className="text-xs text-gray-500 mt-0.5">{category.description}</p>
          {category.count > 0 && (
            <p className="text-[11px] mt-1 font-medium" style={{ color: category.color }}>
              {category.count}+ templates
            </p>
          )}
        </div>
        <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400 flex-shrink-0 transition-colors group-hover:translate-x-1 duration-200" />
      </div>
    </button>
  );
}

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">What to Celebrate?</h2>
          <p className="text-sm text-gray-500 mt-1">Pick a moment to make special</p>
        </div>
      </div>
      {/* Responsive grid: 1col mobile → 2col tablet → 3col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
