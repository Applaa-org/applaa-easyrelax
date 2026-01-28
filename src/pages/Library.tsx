import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { relaxationPrompts, moods, Mood } from '../data/prompts';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Button } from '../components/ui/button';
import PromptCard from '../components/PromptCard';

export default function Library() {
  const [selectedMood, setSelectedMood] = useState<Mood | 'All'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const filteredPrompts = useMemo(() => {
    if (selectedMood === 'All') return relaxationPrompts;
    return relaxationPrompts.filter(p => p.recommendedFor.includes(selectedMood as Mood));
  }, [selectedMood]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900">Relaxation Library</h1>
              <p className="text-slate-600">Find the perfect technique for your current state of mind.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedMood === 'All' ? 'default' : 'outline'}
                onClick={() => setSelectedMood('All')}
                className="rounded-full"
              >
                All
              </Button>
              {moods.map(mood => (
                <Button
                  key={mood}
                  variant={selectedMood === mood ? 'default' : 'outline'}
                  onClick={() => setSelectedMood(mood)}
                  className={`rounded-full ${selectedMood === mood ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPrompts.map((prompt) => {
                const IconComponent = (Icons as any)[prompt.icon] || Icons.Sparkles;
                const isExpanded = expandedId === prompt.id;
                const isActive = activeSessionId === prompt.id;

                if (isActive) {
                  return (
                    <div key={`session-${prompt.id}`} className="max-w-2xl mx-auto w-full">
                      <PromptCard prompt={prompt} />
                      <Button 
                        variant="ghost" 
                        onClick={() => setActiveSessionId(null)}
                        className="mt-4 text-slate-500"
                      >
                        <Icons.ArrowLeft size={16} className="mr-2" />
                        Back to Library
                      </Button>
                    </div>
                  );
                }

                return (
                  <motion.div
                    layout
                    key={prompt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
                  >
                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className={`p-4 rounded-2xl ${prompt.color}`}>
                          <IconComponent size={28} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">{prompt.title}</h3>
                          <div className="flex items-center space-x-3 text-sm text-slate-500">
                            <span className="flex items-center"><Icons.Clock size={14} className="mr-1" /> {prompt.duration}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span>{prompt.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          onClick={() => setExpandedId(isExpanded ? null : prompt.id)}
                          className="text-emerald-600 font-bold"
                        >
                          {isExpanded ? 'Hide Details' : 'View Details'}
                          <Icons.ChevronDown className={`ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} size={18} />
                        </Button>
                        <Button 
                          onClick={() => setActiveSessionId(prompt.id)}
                          className="bg-emerald-500 hover:bg-emerald-600 rounded-xl"
                        >
                          Start Session
                        </Button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-slate-50 bg-slate-50/50"
                        >
                          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <h4 className="font-bold text-slate-900 flex items-center">
                                <Icons.BookOpen size={18} className="mr-2 text-emerald-500" />
                                About this technique
                              </h4>
                              <p className="text-slate-600 leading-relaxed">
                                {prompt.longDescription}
                              </p>
                              <div className="flex flex-wrap gap-2 pt-2">
                                {prompt.recommendedFor.map(m => (
                                  <span key={m} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-slate-200 text-slate-500 rounded-md">
                                    {m}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-4">
                              <h4 className="font-bold text-slate-900 flex items-center">
                                <Icons.ListChecks size={18} className="mr-2 text-emerald-500" />
                                How to practice
                              </h4>
                              <ul className="space-y-3">
                                {prompt.steps.map((step, i) => (
                                  <li key={i} className="flex items-start space-x-3 text-slate-600 text-sm">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold mt-0.5">
                                      {i + 1}
                                    </span>
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}