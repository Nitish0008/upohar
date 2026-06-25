// src/data/categories.js
// All celebration categories with metadata

export const CATEGORIES = [
  {
    id: 'birthday',
    label: 'Birthday Wishes',
    emoji: '🎂',
    icon: 'cake',
    color: '#F97316',
    gradient: 'linear-gradient(135deg, #F97316, #FBBF24)',
    description: 'Make their day unforgettable',
    count: 50,
  },
  {
    id: 'anniversary',
    label: 'Anniversary',
    emoji: '❤️',
    icon: 'heart',
    color: '#FB7185',
    gradient: 'linear-gradient(135deg, #FB7185, #F43F5E)',
    description: 'Celebrate love milestones',
    count: 30,
  },
  {
    id: 'congratulations',
    label: 'Congratulations',
    emoji: '🎉',
    icon: 'party-popper',
    color: '#A78BFA',
    gradient: 'linear-gradient(135deg, #A78BFA, #7C3AED)',
    description: 'Honor achievements & wins',
    count: 25,
  },
  {
    id: 'proposal',
    label: 'Proposal',
    emoji: '💍',
    icon: 'ring',
    color: '#FBBF24',
    gradient: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
    description: 'Pop the big question',
    count: 15,
  },
  {
    id: 'invitation',
    label: 'Invitations',
    emoji: '📜',
    icon: 'scroll',
    color: '#2DD4BF',
    gradient: 'linear-gradient(135deg, #2DD4BF, #0891B2)',
    description: 'Digital invite cards',
    count: 20,
  },
  {
    id: 'reminder',
    label: 'Reminders',
    emoji: '📅',
    icon: 'calendar',
    color: '#60A5FA',
    gradient: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
    description: 'Never miss a date',
    count: 0,
  },
];

export const getCategoryById = (id) => CATEGORIES.find((c) => c.id === id);
