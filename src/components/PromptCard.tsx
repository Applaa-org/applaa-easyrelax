import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Sparkles, * as Icons } from 'lucide-react';
import { RelaxationPrompt } from '../data/prompts';
import { Button } from './ui/button';
import { logCompletion } from '../lib/api';
import { showSuccess } from '../utils/toast';

interface PromptCardProps {
  prompt: RelaxationPrompt;
  isDaily?: boolean;
}

export default function PromptCard({ prompt, isDaily }: PromptCardProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const IconComponent = (Icons as any)[prompt.icon] || Icons.Sparkles;

  const handleComplete = async () => {
    setLoading(true);
    try {
      await logCompletion(prompt.id, 'relaxed');
      setIsCompleted(true);
      showSuccess("Well done. Take this feeling with you.");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/60 backdrop-blur-lg border border-white/40 rounded-3xl p-8 shadow-xl shadow-emerald-100/20"
    >
      {isDaily && (
        <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <Sparkles size={12} />
          <span>DAILY ZEN</span>
        </div>
      )}

      <div className="flex flex-col items-center text-center space-y-6">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${prompt.color} shadow-sm`}>
          <IconComponent size={40} />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-slate-800">{prompt.title}</h2>
          <div className="flex items-center justify-center space-x-4 text-slate-500 text-sm">
            <span className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{prompt.duration}</span>
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>{prompt.category}</span>
          </div>
        </div>

        <p className="text-lg text-slate-600 leading-relaxed max-w-md">
          {prompt.description}
        </p>

        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key="action"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button 
                onClick={handleComplete}
                disabled={loading}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95"
              >
                {loading ? "Saving..." : "I've completed this"}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center space-y-2 text-emerald-600"
            >
              <CheckCircle2 size={48} />
              <span className="font-medium">Session Logged</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}