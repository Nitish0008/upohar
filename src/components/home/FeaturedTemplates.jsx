// src/components/home/FeaturedTemplates.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import { getTemplatesByCategory } from '../../data/templates';
import TemplateCard from '../templates/TemplateCard';

export default function FeaturedTemplates() {
  const navigate = useNavigate();
  const featured = [
    ...getTemplatesByCategory('birthday').slice(0, 4),
    ...getTemplatesByCategory('anniversary').slice(0, 2),
    ...getTemplatesByCategory('congratulations').slice(0, 2),
    ...getTemplatesByCategory('proposal').slice(0, 2),
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-10 border-t border-white/5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-2">
            <Star size={20} className="text-yellow-400 fill-yellow-400" />
            Featured Templates
          </h2>
          <p className="text-sm text-gray-500 mt-1">Handpicked for every occasion</p>
        </div>
        <button onClick={() => navigate('/templates')}
          className="flex items-center gap-1 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors">
          View all <ChevronRight size={16} />
        </button>
      </div>

      {/* Mobile: horizontal scroll | Desktop: grid */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {featured.map((t) => <TemplateCard key={t.id} template={t} />)}
      </div>
      <div className="flex sm:hidden gap-3 overflow-x-auto pb-2 custom-scroll snap-x snap-mandatory">
        {featured.map((t) => (
          <div key={t.id} className="flex-shrink-0 w-36 snap-start">
            <TemplateCard template={t} compact />
          </div>
        ))}
      </div>
    </section>
  );
}
