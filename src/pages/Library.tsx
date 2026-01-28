import React from 'react';
import Header from '../components/Header';
import { relaxationPrompts } from '../data/prompts';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

export default function Library() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Relaxation Library</h1>
            <p className="text-slate-600">Explore our full collection of mindfulness and breathing techniques.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relaxationPrompts.map((prompt, index) => {
              const IconComponent = (Icons as any)[prompt.icon] || Icons.Sparkles;
              return (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${prompt.color}`}>
                      <IconComponent size={24} />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {prompt.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                    {prompt.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3">
                    {prompt.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                      {prompt.category}
                    </span>
                    <button className="text-emerald-600 text-sm font-bold hover:underline">
                      View Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}