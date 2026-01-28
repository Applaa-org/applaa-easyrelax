import React, { useMemo } from 'react';
import Header from '../components/Header';
import PromptCard from '../components/PromptCard';
import { relaxationPrompts } from '../data/prompts';
import { MadeWithApplaa } from '../components/made-with-applaa';
import { motion } from 'framer-motion';

export default function Index() {
  // Daily rotation logic based on date
  const dailyPrompt = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return relaxationPrompts[dayOfYear % relaxationPrompts.length];
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-lavender-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight"
            >
              Your Moment of <span className="text-emerald-600">Calm</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto"
            >
              Take a deep breath. Today's guided relaxation is ready for you.
            </motion.p>
          </div>

          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl animate-pulse" />
            
            <PromptCard prompt={dailyPrompt} isDaily />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
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