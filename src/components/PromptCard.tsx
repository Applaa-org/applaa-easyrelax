import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Sparkles, Play, X, Timer } from 'lucide-react';
import * as Icons from 'lucide-react';
import { RelaxationPrompt } from '../data/prompts';
import { Button } from './ui/button';
import { logCompletion } from '../lib/api';
import { showSuccess } from '../utils/toast';

interface PromptCardProps {
  prompt: RelaxationPrompt;
  isDaily?: boolean;
}

export default function PromptCard({ prompt, isDaily }: PromptCardProps) {
  const [status, setStatus] = useState<'idle' | 'active' | 'completed'>('idle');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const IconComponent = (Icons as any)[prompt.icon] || Sparkles;

  // Parse duration string (e.g., "5 min") to seconds
  const durationSeconds = parseInt(prompt.duration) * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'active' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setProgress(((durationSeconds - (timeLeft - 1)) / durationSeconds) * 100);
      }, 1000);
    } else if (status === 'active' && timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [status, timeLeft]);

  const handleStart = () => {
    setTimeLeft(durationSeconds);
    setProgress(0);
    setStatus('active');
  };

  const handleCancel = () => {
    setStatus('idle');
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await logCompletion(prompt.id, 'relaxed');
      setStatus('completed');
      showSuccess("Session complete. You've earned this moment of peace.");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/60 backdrop-blur-lg border border-white/40 rounded-3xl p-8 shadow-xl shadow-emerald-100/20 min-h-[400px] flex flex-col justify-center"
    >
      {isDaily && status === 'idle' && (
        <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <Sparkles size={12} />
          <span>DAILY ZEN</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center space-y-6"
          >
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

            <Button 
              onClick={handleStart}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-7 rounded-2xl text-xl font-semibold shadow-lg shadow-emerald-200 transition-all hover:scale-105 active:scale-95 flex items-center space-x-2"
            >
              <Play size={20} fill="currentColor" />
              <span>Start Session</span>
            </Button>
          </motion.div>
        )}

        {status === 'active' && (
          <motion.div 
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Progress Ring */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-emerald-100"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={553}
                  initial={{ strokeDashoffset: 553 }}
                  animate={{ strokeDashoffset: 553 - (553 * progress) / 100 }}
                  className="text-emerald-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-mono font-bold text-slate-800">{formatTime(timeLeft)}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Remaining</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">Focus on your {prompt.category.toLowerCase()}</h3>
              <p className="text-slate-500 italic">"Let go of everything else..."</p>
            </div>

            <div className="flex space-x-4">
              <Button 
                variant="outline"
                onClick={handleCancel}
                className="border-slate-200 text-slate-500 hover:bg-slate-50 rounded-xl"
              >
                <X size={18} className="mr-2" />
                Cancel
              </Button>
              <Button 
                onClick={handleComplete}
                disabled={loading}
                className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-xl"
              >
                <Timer size={18} className="mr-2" />
                Finish Early
              </Button>
            </div>
          </motion.div>
        )}

        {status === 'completed' && (
          <motion.div 
            key="completed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
              <CheckCircle2 size={64} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Session Complete</h2>
            <p className="text-slate-600">Your progress has been saved to your account.</p>
            <Button 
              variant="ghost" 
              onClick={() => setStatus('idle')}
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              Back to Daily Zen
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}