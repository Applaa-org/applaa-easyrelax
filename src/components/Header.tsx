import { Link } from '@tanstack/react-router';
import { Leaf, Library, Info, Home } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            EasyRelax
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-1 text-slate-600 hover:text-emerald-600 transition-colors font-medium">
            <Home size={18} />
            <span>Daily Zen</span>
          </Link>
          <Link to="/library" className="flex items-center space-x-1 text-slate-600 hover:text-emerald-600 transition-colors font-medium">
            <Library size={18} />
            <span>Library</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-1 text-slate-600 hover:text-emerald-600 transition-colors font-medium">
            <Info size={18} />
            <span>About</span>
          </Link>
        </nav>

        <div className="md:hidden">
          {/* Mobile menu could go here, but keeping it simple for now */}
          <Leaf className="text-emerald-500" />
        </div>
      </div>
    </header>
  );
}