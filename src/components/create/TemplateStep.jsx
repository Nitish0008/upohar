// src/components/create/TemplateStep.jsx
import React, { useState } from 'react';
import { TEMPLATES } from '../../data/templates';
import { CATEGORIES } from '../../data/categories';
import CategoryFilter from '../templates/CategoryFilter';
import TemplateCard from '../templates/TemplateCard';

export default function TemplateStep({ value, onChange }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const allTemplates = Object.values(TEMPLATES).flat();
  const filtered = allTemplates.filter((t) => {
    const catMatch = activeCategory === 'all' || t.category === activeCategory;
    const searchMatch =
      !search || t.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="px-4 mb-3">
        <input
          type="text"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-colors"
        />
      </div>

      {/* Category pills */}
      <div className="mb-4">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Count */}
      <p className="px-4 text-xs text-gray-500 mb-3">
        {filtered.length} templates
      </p>

      {/* Template grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scroll">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isSelected={value?.id === template.id}
              onSelect={onChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
