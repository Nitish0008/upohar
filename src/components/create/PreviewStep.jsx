// src/components/create/PreviewStep.jsx
import React from 'react';
import { Sparkles, Music, Image as ImageIcon } from 'lucide-react';

const catEmojis = {
  birthday: '🎂', anniversary: '❤️', congratulations: '🎉',
  proposal: '💍', invitation: '📜', reminder: '📅',
};

const catTitles = {
  birthday: 'Happy Birthday',
  anniversary: 'Happy Anniversary',
  congratulations: 'Congratulations',
  proposal: 'Will You Marry Me?',
  invitation: "You're Invited",
  reminder: 'Reminder',
};

export default function PreviewStep({ template, personalize, music, hideLabel = false }) {
  if (!template) {
    return (
      <div className="px-4 py-8 flex flex-col items-center justify-center gap-3 text-center">
        <span className="text-4xl">🎨</span>
        <p className="text-sm text-gray-400">Select a template to preview your card</p>
      </div>
    );
  }

  const { previewStyle, category } = template;
  const emoji = catEmojis[category] || '✨';
  const title = catTitles[category] || 'Celebrate!';
  const recipientName = personalize?.recipientName?.trim() || 'Someone Special';
  const senderName = personalize?.senderName?.trim();
  const message = personalize?.message?.trim();
  const photoUrl = personalize?.photoUrl;

  // Fallback if previewStyle is somehow undefined
  const bg = previewStyle?.background || 'linear-gradient(135deg, #1a0800, #2d1200)';
  const accentColor = previewStyle?.accentColor || '#F97316';
  const textColor = previewStyle?.textColor || '#FFF7ED';
  const secondaryColor = previewStyle?.secondaryColor || '#FBBF24';

  return (
    <div className="px-4 py-4">
      {/* Preview label */}
      {!hideLabel && (
        <div className="flex items-center justify-center gap-2 mb-5">
          <Sparkles size={14} className="text-orange-400" />
          <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Live Preview</span>
          <Sparkles size={14} className="text-orange-400" />
        </div>
      )}

      {/* Card */}
      <div
        className="relative rounded-3xl overflow-hidden mx-auto w-full shadow-2xl"
        style={{
          background: bg,
          maxWidth: '340px',
          border: `1px solid ${accentColor}30`,
        }}
      >
        {/* Decorative corner brackets to look like a premium physical card */}
        <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t border-l opacity-25 pointer-events-none" style={{ borderColor: accentColor }} />
        <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t border-r opacity-25 pointer-events-none" style={{ borderColor: accentColor }} />
        <div className="absolute bottom-11 left-3.5 w-4 h-4 border-b border-l opacity-25 pointer-events-none" style={{ borderColor: accentColor }} />
        <div className="absolute bottom-11 right-3.5 w-4 h-4 border-b border-r opacity-25 pointer-events-none" style={{ borderColor: accentColor }} />

        {/* Top glow */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${accentColor}60 0%, transparent 70%)`,
          }}
        />

        {/* Photo */}
        {photoUrl && (
          <div className="relative w-full h-44 overflow-hidden">
            <img
              src={photoUrl}
              alt="Celebration photo"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 40%, ${bg.includes('gradient') ? '#1a0800' : bg} 100%)`,
              }}
            />
          </div>
        )}

        {/* Card Content */}
        <div className="relative px-6 py-8 text-center">
          {/* Big emoji */}
          <div className="text-6xl mb-4 drop-shadow-lg">{emoji}</div>

          {/* Title */}
          <h2
            className="text-2xl font-bold mb-2 leading-tight"
            style={{ color: accentColor, fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h2>

          {/* Recipient name */}
          <p
            className="text-3xl font-bold mb-4 leading-tight break-words"
            style={{ color: textColor, fontFamily: "'Outfit', sans-serif" }}
          >
            {recipientName}
          </p>

          {/* Message */}
          {message ? (
            <div
              className="mx-0 p-4 rounded-2xl mb-4 text-sm leading-relaxed text-left"
              style={{
                background: `${accentColor}15`,
                border: `1px solid ${accentColor}30`,
                color: textColor,
              }}
            >
              <span style={{ color: accentColor }}>"</span>
              {message}
              <span style={{ color: accentColor }}>"</span>
            </div>
          ) : (
            <div
              className="mx-0 p-3 rounded-2xl mb-4 border border-dashed opacity-40"
              style={{ borderColor: accentColor }}
            >
              <p className="text-xs italic" style={{ color: textColor }}>Your message will appear here</p>
            </div>
          )}

          {/* From */}
          {senderName && (
            <p className="text-sm mb-3" style={{ color: secondaryColor }}>
              — With love from <strong>{senderName}</strong>
            </p>
          )}

          {/* Music indicator */}
          {music && music !== 'none' && (
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
              style={{
                background: `${accentColor}20`,
                color: accentColor,
                border: `1px solid ${accentColor}30`,
              }}
            >
              <Music size={11} />
              <span>Background music on</span>
            </div>
          )}
        </div>

        {/* Bottom color bar */}
        <div
          className="h-1.5"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, ${secondaryColor}, ${accentColor})`,
          }}
        />

        {/* Watermark */}
        <div className="py-2 text-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
          <p className="text-[10px] text-gray-400">
            ✨ Created with <span style={{ color: accentColor }}>Celebrate Assam</span>
          </p>
        </div>
      </div>

      {/* Template info below card */}
      <div className="text-center mt-4 space-y-1">
        <p className="text-xs text-gray-600">
          Template: <span className="text-gray-400">{template.name}</span>
        </p>
        {music && music !== 'none' && (
          <p className="text-xs text-orange-400">🎵 Background music: {music}</p>
        )}
        {photoUrl && (
          <p className="text-xs text-teal-400 flex items-center justify-center gap-1">
            <ImageIcon size={10} /> Photo attached
          </p>
        )}
      </div>
    </div>
  );
}
