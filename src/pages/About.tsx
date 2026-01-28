import React from 'react';
import Header from '../components/Header';
import { Leaf, Shield, Heart, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-16">
          <section className="text-center space-y-6">
            <div className="inline-flex p-4 bg-emerald-50 rounded-full text-emerald-600 mb-4">
              <Leaf size={48} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Our Mission</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              EasyRelax was created to provide a digital sanctuary in an increasingly busy world. 
              We believe that relaxation should be accessible, simple, and beautiful.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-emerald-600">
                <Heart size={24} />
                <h2 className="text-xl font-bold text-slate-900">Mindful Design</h2>
              </div>
              <p className="text-slate-600">
                Every color, icon, and interaction in EasyRelax is chosen to reduce cognitive load and promote a sense of tranquility.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-emerald-600">
                <Sparkles size={24} />
                <h2 className="text-xl font-bold text-slate-900">Daily Practice</h2>
              </div>
              <p className="text-slate-600">
                Consistency is key to mental well-being. Our daily rotation ensures you always have a fresh way to find your center.
              </p>
            </div>
          </div>

          <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-6">
            <div className="flex items-center space-x-3 text-slate-800">
              <Shield size={24} />
              <h2 className="text-2xl font-bold">Medical Disclaimer</h2>
            </div>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>
                The content provided by EasyRelax, including text, graphics, images, and other material, is for informational and educational purposes only. 
              </p>
              <p>
                It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or mental health concern.
              </p>
              <p>
                Never disregard professional medical advice or delay in seeking it because of something you have read on this application. If you think you may have a medical emergency, call your doctor or emergency services immediately.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}