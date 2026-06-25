// src/components/templates/TemplateCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Zap, Check } from 'lucide-react';

// Generate a visual preview pattern from template data
function TemplatePreview({ template, compact, isSelected }) {
  const { previewStyle, category, name, hasAnimation } = template;
  
  const catEmojis = {
    birthday: '🎂',
    anniversary: '❤️',
    congratulations: '🎉',
    proposal: '💍',
    invitation: '📜',
    reminder: '📅',
  };
  const catEmoji = catEmojis[category] || '✨';
  
  const catLabels = {
    birthday: 'Birthday Wish',
    anniversary: 'Anniversary Card',
    congratulations: 'Congrats Card',
    proposal: 'Proposal Note',
    invitation: 'E-Invitation',
    reminder: 'Reminder Card',
  };
  const catLabel = catLabels[category] || 'Special Greeting';
  const size = compact ? 'h-36' : 'h-44';

  return (
    <div
      className={`w-full ${size} rounded-xl relative overflow-hidden flex flex-col items-center justify-between p-3.5 transition-all duration-300 border`}
      style={{
        background: previewStyle.background,
        borderColor: isSelected ? previewStyle.accentColor : 'rgba(255,255,255,0.06)',
        boxShadow: isSelected 
          ? `0 0 20px ${previewStyle.accentColor}30, inset 0 0 12px ${previewStyle.accentColor}20`
          : 'none'
      }}
    >
      {/* Background glowing gradients */}
      <div 
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full filter blur-xl opacity-20 transition-all duration-500 group-hover:scale-125"
        style={{ background: previewStyle.accentColor }}
      />
      <div 
        className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full filter blur-xl opacity-15 transition-all duration-500 group-hover:scale-125"
        style={{ background: previewStyle.secondaryColor }}
      />

      {/* Frame boundary inside the card to feel premium */}
      <div 
        className="absolute inset-1.5 rounded-[10px] border pointer-events-none opacity-20"
        style={{ borderColor: previewStyle.textColor }}
      />

      {/* Top Bar info */}
      <div className="w-full flex items-center justify-between z-10">
        <span 
          className="text-[8px] font-bold uppercase tracking-widest opacity-60" 
          style={{ color: previewStyle.textColor }}
        >
          {catLabel}
        </span>
        {hasAnimation && (
          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/10 text-[9px] animate-pulse">
            ✨
          </span>
        )}
      </div>

      {/* Centerpiece emoji within glass holder */}
      <div className="flex flex-col items-center justify-center gap-1.5 z-10">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ 
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(4px)',
            border: `1px solid ${previewStyle.accentColor}25`,
            boxShadow: `0 6px 12px rgba(0,0,0,0.15)`
          }}
        >
          <span className="text-2.5xl filter drop-shadow-md">{catEmoji}</span>
        </div>
        
        {/* Visual placeholders representing letter lines */}
        <div className="flex flex-col gap-1 items-center w-20">
          <div className="h-1 w-14 rounded-full opacity-35" style={{ background: previewStyle.textColor }} />
          <div className="h-1 w-8 rounded-full opacity-20" style={{ background: previewStyle.textColor }} />
        </div>
      </div>

      {/* Bottom Bar info */}
      <div className="w-full flex items-end justify-between z-10">
        <span 
          className="text-[8px] font-semibold tracking-wider opacity-45" 
          style={{ color: previewStyle.textColor }}
        >
          Celebrate Assam
        </span>
        {isSelected && (
          <span 
            className="flex items-center justify-center w-4.5 h-4.5 rounded-full text-white shadow-lg shadow-black/35 scale-110 border border-white/25"
            style={{ background: previewStyle.accentColor }}
          >
            <Check size={9} strokeWidth={3} />
          </span>
        )}
      </div>
    </div>
  );
}

export default function TemplateCard({ template, compact = false, isSelected = false, onSelect }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onSelect) {
      onSelect(template);
    } else {
      navigate(`/create?template=${template.id}`);
    }
  };

  return (
    <button
      id={`template-${template.id}`}
      onClick={handleClick}
      className={`template-card w-full text-left group transition-all duration-300 relative rounded-2xl p-1 bg-white/[0.01] hover:bg-white/[0.04] border ${
        isSelected 
          ? 'border-orange-500/40 bg-white/[0.03] shadow-lg shadow-orange-500/5' 
          : 'border-white/5'
      }`}
    >
      {/* Preview Grid Card */}
      <TemplatePreview template={template} compact={compact} isSelected={isSelected} />

      {/* Info details underneath */}
      <div className="mt-2 px-1 pb-1">
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors truncate flex-1">
            {template.name}
          </p>
          {template.isPremium ? (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.05)]">
              <Lock size={7} className="text-amber-400" />
              <span className="text-[7.5px] text-amber-400 font-bold uppercase tracking-wider">PRO</span>
            </span>
          ) : (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.05)]">
              <Zap size={7} className="text-emerald-400 animate-pulse" />
              <span className="text-[7.5px] text-emerald-400 font-bold uppercase tracking-wider">FREE</span>
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
