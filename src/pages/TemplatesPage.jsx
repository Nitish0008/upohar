// src/pages/TemplatesPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import CategoryFilter from '../components/templates/CategoryFilter';
import TemplateCard from '../components/templates/TemplateCard';
import { TEMPLATES } from '../data/templates';
import { CATEGORIES } from '../data/categories';

export default function TemplatesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (activeCategory !== 'all') setSearchParams({ category: activeCategory });
    else setSearchParams({});
  }, [activeCategory]);

  const allTemplates = Object.values(TEMPLATES).flat();
  const filtered = allTemplates.filter((t) => {
    const catMatch = activeCategory === 'all' || t.category === activeCategory;
    const searchMatch = !search || t.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <main className="flex-1 flex flex-col min-h-0">
      {/* Page header */}
      <div className="sticky top-0 z-50 bg-[#0F0A1E]/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">Templates</h1>
              <p className="text-xs text-gray-500">{filtered.length} designs available</p>
            </div>
            {/* Desktop search bar */}
            <div className="hidden md:flex relative w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Search templates..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden mb-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Search templates..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          {/* Category filters */}
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>
      </div>

      {/* Desktop: sidebar + grid layout */}
      <div className="flex-1 flex min-h-0">
        {/* Desktop category sidebar */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-white/5 p-4 gap-1 overflow-y-auto">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 px-2">Occasion</p>
          {[{ id: 'all', label: 'All Templates', emoji: '✨', count: allTemplates.length }, ...CATEGORIES].map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === 'all' ? allTemplates.length : (TEMPLATES[cat.id]?.length || 0);
            return (
              <button key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                style={isActive ? {
                  background: 'rgba(249,115,22,0.15)',
                  border: '1px solid rgba(249,115,22,0.3)',
                } : {}}
              >
                <span>{cat.emoji}</span>
                <span className="flex-1">{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-gray-600'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </aside>

        {/* Template grid */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-4 custom-scroll">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3">
              <span className="text-4xl">🔍</span>
              <p className="text-gray-400 font-medium">No templates found</p>
              <button onClick={() => { setSearch(''); setActiveCategory('all'); }}
                className="text-sm text-orange-400 hover:text-orange-300">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="p-4 lg:p-6 max-w-7xl mx-auto">
              {/* Responsive grid: 2 mobile → 3 tablet → 4 desktop → 5 xl */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
