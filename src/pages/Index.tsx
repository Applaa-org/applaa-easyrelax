import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import PromptCard from '../components/PromptCard';
import { relaxationPrompts, moods, Mood } from '../data/prompts';
import { MadeWithApplaa } from '../components/made-with-applaa';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Sparkles, Heart } from 'lucide-react';

export default function Index() {
  const [userMood, setUserMood] = useState<Mood | null>(null);

  // Daily rotation logic
  const dailyPrompt = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return relaxationPrompts[dayOfYear % relaxationPrompts.length];
  }, []);

  // Mood-based recommendation
  const recommendedPrompt = useMemo(() => {
    if (!userMood) return null;
    const matches = relaxationPrompts.filter(p => p.recommendedFor.includes(userMood));
    return matches[Math.floor(Math.random() * matches.length)] || dailyPrompt;
  }, [userMood, dailyPrompt]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-lavender-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight"
            >
              Your Moment of <span className="text-emerald-600">Calm</span>
            </motion.h1>
            
            <div className="space-y-4">
              <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">How are you feeling right now?</p>
              <div className="flex flex-wrap justify-center gap-3">
                {moods.map(mood => (
                  <Button
                    key={mood}
                    variant={userMood === mood ? 'default' : 'outline'}
                    onClick={() => setUserMood(mood)}
                    className={`rounded-2xl px-6 py-6 h-auto transition-all ${
                      userMood === mood ? 'bg-emerald-500 scale-105 shadow-lg shadow-emerald-100' : 'bg-white/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-lg font-bold">{mood}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={userMood ? 'recommended' : 'daily'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 bg-white px-4 py-1 rounded-full shadow-sm border border-slate-100 flex items-center space-x-2">
                {userMood ? <Heart size={14} className="text-rose-500" /> : <Sparkles size={14} className="text-amber-500" />}
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {userMood ? `Recommended for ${userMood}` : "Today's Daily Zen"}
                </span>
              </div>
              <PromptCard prompt={userMood ? recommendedPrompt! : dailyPrompt} isDaily={!userMood} />
            </motion.div>
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
              <h3 className="font-bold text-slate-800 mb-2">Gentle Visuals</h3>
              <p className="text-sm text-slate-600">Designed to soothe your eyes and mind.</p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
              <h3 className="font-bold text-slate-800 mb-2">Daily Rotation</h3>
              <p className="text-sm text-slate-600">A new way to relax every single day.</p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center">
              <h3 className="font-bold text-slate-800 mb-2">Simple Prompts</h3>
              <p className="text-sm text-slate-600">Easy to follow, effective results.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-200/50">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Disclaimer</p>
          <p className="text-sm text-slate-500 max-w-xl mx-auto italic">
            EasyRelax is for educational and relaxation purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <MadeWithApplaa />
        </div>
      </footer>
    </div>
  );
}