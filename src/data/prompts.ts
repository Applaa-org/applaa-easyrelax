export interface RelaxationPrompt {
  id: string;
  title: string;
  description: string;
  category: 'Breathing' | 'Mindfulness' | 'Movement' | 'Visual';
  duration: string;
  icon: string;
  color: string;
}

export const relaxationPrompts: RelaxationPrompt[] = [
  {
    id: '1',
    title: 'Box Breathing',
    description: 'Inhale for 4 seconds, hold for 4, exhale for 4, and hold for 4. Repeat this cycle to stabilize your nervous system.',
    category: 'Breathing',
    duration: '5 min',
    icon: 'Wind',
    color: 'bg-mint-100 text-mint-700',
  },
  {
    id: '2',
    title: 'Cloud Watching',
    description: 'Close your eyes and imagine a clear blue sky. Watch as soft, white clouds drift slowly by, carrying your thoughts away.',
    category: 'Visual',
    duration: '10 min',
    icon: 'Cloud',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    id: '3',
    title: 'Gentle Neck Rolls',
    description: 'Slowly drop your chin to your chest. Roll your head to the right, then back, then left. Feel the tension melting away.',
    category: 'Movement',
    duration: '3 min',
    icon: 'Move',
    color: 'bg-lavender-100 text-lavender-700',
  },
  {
    id: '4',
    title: 'The 5-4-3-2-1 Technique',
    description: 'Acknowledge 5 things you see, 4 you can touch, 3 you hear, 2 you can smell, and 1 you can taste.',
    category: 'Mindfulness',
    duration: '5 min',
    icon: 'Eye',
    color: 'bg-peach-100 text-peach-700',
  },
  {
    id: '5',
    title: 'Ocean Breath',
    description: 'Slightly constrict the back of your throat while breathing through your nose, creating a sound like gentle ocean waves.',
    category: 'Breathing',
    duration: '7 min',
    icon: 'Waves',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    id: '6',
    title: 'Progressive Muscle Relaxation',
    description: 'Tense each muscle group for 5 seconds, then release suddenly. Start from your toes and work up to your face.',
    category: 'Movement',
    duration: '12 min',
    icon: 'Zap',
    color: 'bg-rose-100 text-rose-700',
  },
  {
    id: '7',
    title: 'Golden Light Visualization',
    description: 'Imagine a warm, golden light entering through the top of your head and slowly filling your entire body with peace.',
    category: 'Visual',
    duration: '8 min',
    icon: 'Sun',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    id: '8',
    title: 'Mindful Tea Sipping',
    description: 'Focus entirely on the warmth of the cup, the aroma of the tea, and the sensation of each small sip.',
    category: 'Mindfulness',
    duration: '10 min',
    icon: 'Coffee',
    color: 'bg-emerald-100 text-emerald-700',
  }
];