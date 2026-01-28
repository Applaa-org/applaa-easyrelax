export type Mood = 'Anxious' | 'Tired' | 'Stressed' | 'Restless' | 'Overwhelmed' | 'Neutral';

export interface RelaxationPrompt {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'Breathing' | 'Mindfulness' | 'Movement' | 'Visual';
  duration: string;
  icon: string;
  color: string;
  recommendedFor: Mood[];
  steps: string[];
}

export const relaxationPrompts: RelaxationPrompt[] = [
  {
    id: '1',
    title: 'Box Breathing',
    description: 'A powerful technique used by elite performers to stay calm under pressure.',
    longDescription: 'Box breathing, also known as four-square breathing, is a technique used when taking slow, deep breaths. It can heighten performance and concentration while also being a powerful stress reliever.',
    category: 'Breathing',
    duration: '5 min',
    icon: 'Wind',
    color: 'bg-mint-100 text-mint-700',
    recommendedFor: ['Anxious', 'Stressed', 'Overwhelmed'],
    steps: [
      'Inhale slowly through your nose for 4 seconds.',
      'Hold your breath for 4 seconds.',
      'Exhale slowly through your mouth for 4 seconds.',
      'Hold your breath for 4 seconds before the next inhale.'
    ]
  },
  {
    id: '2',
    title: 'Cloud Watching',
    description: 'A mental visualization to detach from racing thoughts.',
    longDescription: 'This visualization technique helps you practice non-attachment. By viewing your thoughts as passing clouds, you learn that you are the sky—vast and unchanging—not the temporary weather passing through.',
    category: 'Visual',
    duration: '10 min',
    icon: 'Cloud',
    color: 'bg-sky-100 text-sky-700',
    recommendedFor: ['Restless', 'Overwhelmed', 'Neutral'],
    steps: [
      'Find a comfortable seated or lying position.',
      'Close your eyes and visualize a clear, bright blue sky.',
      'When a thought arises, label it and place it on a cloud.',
      'Watch the cloud drift slowly across the sky and disappear.'
    ]
  },
  {
    id: '3',
    title: 'Gentle Neck Rolls',
    description: 'Release physical tension stored in the upper body.',
    longDescription: 'We often carry our stress in our shoulders and neck. These gentle movements help increase blood flow and signal to your nervous system that it is safe to relax.',
    category: 'Movement',
    duration: '3 min',
    icon: 'Move',
    color: 'bg-lavender-100 text-lavender-700',
    recommendedFor: ['Tired', 'Stressed'],
    steps: [
      'Sit tall and drop your shoulders away from your ears.',
      'Slowly drop your right ear toward your right shoulder.',
      'Gently roll your chin down to your chest.',
      'Continue the roll to the left side, then back to center.'
    ]
  },
  {
    id: '4',
    title: '5-4-3-2-1 Grounding',
    description: 'Quickly pull yourself out of a spiral and back to the present.',
    longDescription: 'This sensory grounding technique is one of the most effective ways to stop a panic attack or high-anxiety moment by forcing your brain to switch from internal rumination to external observation.',
    category: 'Mindfulness',
    duration: '5 min',
    icon: 'Eye',
    color: 'bg-peach-100 text-peach-700',
    recommendedFor: ['Anxious', 'Overwhelmed'],
    steps: [
      'Identify 5 things you can see around you.',
      'Identify 4 things you can touch.',
      'Identify 3 things you can hear.',
      'Identify 2 things you can smell.',
      'Identify 1 thing you can taste.'
    ]
  },
  {
    id: '5',
    title: 'Ocean Breath',
    description: 'Ujjayi breathing to build internal warmth and focus.',
    longDescription: 'Commonly used in yoga, this "Victorious Breath" creates a soothing sound that mimics the ocean. The slight constriction of the throat helps regulate blood pressure and calm the mind.',
    category: 'Breathing',
    duration: '7 min',
    icon: 'Waves',
    color: 'bg-blue-100 text-blue-700',
    recommendedFor: ['Restless', 'Tired', 'Neutral'],
    steps: [
      'Inhale deeply through your nose.',
      'Exhale through your nose while slightly constricting the back of your throat.',
      'The sound should be audible to you, like a soft whisper.',
      'Maintain a steady, rhythmic pace.'
    ]
  }
];

export const moods: Mood[] = ['Anxious', 'Tired', 'Stressed', 'Restless', 'Overwhelmed', 'Neutral'];