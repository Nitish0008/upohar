// src/data/templates.js
// All 50+ templates organized by category

const generateTemplates = (category, count, baseColors) => {
  const palettes = [
    { name: 'Sunset Bliss', bg: '#1a0a00', accent: '#F97316', text: '#FFF7ED', secondary: '#FBBF24' },
    { name: 'Midnight Rose', bg: '#1a0010', accent: '#FB7185', text: '#FFF1F2', secondary: '#FDA4AF' },
    { name: 'Royal Violet', bg: '#0d0020', accent: '#A78BFA', text: '#F5F3FF', secondary: '#C4B5FD' },
    { name: 'Ocean Deep', bg: '#00111a', accent: '#2DD4BF', text: '#F0FDFA', secondary: '#67E8F9' },
    { name: 'Golden Hour', bg: '#1a1000', accent: '#FBBF24', text: '#FFFBEB', secondary: '#FCD34D' },
    { name: 'Ember Glow', bg: '#1a0500', accent: '#EF4444', text: '#FEF2F2', secondary: '#FCA5A5' },
    { name: 'Emerald Dream', bg: '#001a0a', accent: '#34D399', text: '#ECFDF5', secondary: '#6EE7B7' },
    { name: 'Cosmic Dusk', bg: '#05001a', accent: '#818CF8', text: '#EEF2FF', secondary: '#A5B4FC' },
  ];

  return Array.from({ length: count }, (_, i) => {
    const palette = palettes[i % palettes.length];
    return {
      id: `${category}-${i + 1}`,
      category,
      name: `${palette.name} ${i + 1}`,
      palette,
      isFree: i < 40,
      isPremium: i >= 40,
      hasAnimation: i % 3 === 0,
      tags: [category, palette.name.split(' ')[0].toLowerCase()],
      previewStyle: {
        background: `radial-gradient(ellipse at top, ${palette.accent}33 0%, ${palette.bg} 60%)`,
        accentColor: palette.accent,
        textColor: palette.text,
        secondaryColor: palette.secondary,
      },
    };
  });
};

export const TEMPLATES = {
  birthday: generateTemplates('birthday', 50, ['#F97316', '#FBBF24']),
  anniversary: generateTemplates('anniversary', 30, ['#FB7185', '#F43F5E']),
  congratulations: generateTemplates('congratulations', 25, ['#A78BFA', '#7C3AED']),
  proposal: generateTemplates('proposal', 15, ['#FBBF24', '#F59E0B']),
  invitation: generateTemplates('invitation', 20, ['#2DD4BF', '#0891B2']),
};

export const getAllTemplates = () => Object.values(TEMPLATES).flat();
export const getTemplatesByCategory = (category) => TEMPLATES[category] || [];
export const getTemplateById = (id) => getAllTemplates().find((t) => t.id === id);

export const MUSIC_TRACKS = [
  { id: 'none', label: 'No Music', icon: '🔇' },
  { id: 'happy-birthday', label: 'Happy Birthday', icon: '🎂', duration: '0:30' },
  { id: 'romantic', label: 'Romantic Melody', icon: '❤️', duration: '0:45' },
  { id: 'celebration', label: 'Celebration', icon: '🎉', duration: '0:35' },
  { id: 'classical', label: 'Classical Indian', icon: '🎵', duration: '0:40' },
  { id: 'bihu', label: 'Bihu Melody', icon: '🌾', duration: '0:30' },
];
