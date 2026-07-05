import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Orbit, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';
import MagneticWrapper from './MagneticWrapper';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

export default function Navbar({ activeTab, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Overview' },
    { id: 'about', label: 'Company' },
    { id: 'tech', label: 'Technology' },
    { id: 'applications', label: 'Applications' },
    { id: 'pricing', label: 'Licensing' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Levitating Brand Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 border-2 border-[#00F0FF] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF]"></div>
            </div>
            <div>
              <span className="font-display font-bold tracking-widest uppercase text-white text-sm">Aether</span>
              <span className="font-mono text-[8px] text-neon-cyan font-bold tracking-[0.3em] block -mt-1 uppercase">Dynamics</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-display font-medium uppercase tracking-[0.25em]">
            {navItems.map((item) => (
              <MagneticWrapper key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`relative py-2 text-gray-400 hover:text-white transition-colors cursor-pointer ${
                    activeTab === item.id ? 'text-[#00F0FF] opacity-100 font-bold' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00F0FF]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </MagneticWrapper>
            ))}

            {/* Elegant Inquire Action Badge */}
            <MagneticWrapper>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer font-display font-semibold"
              >
                Inquire
              </button>
            </MagneticWrapper>
          </div>

          {/* Hamburger Trigger for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-white/5 hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Navigation Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-20 left-0 right-0 glass border-b border-white/10 p-6 flex flex-col gap-4 text-sm font-display"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`py-3 text-left border-b border-white/5 font-medium flex items-center justify-between text-gray-400 active:text-neon-cyan ${
                  activeTab === item.id ? 'text-neon-cyan font-semibold border-neon-cyan/20' : ''
                }`}
              >
                <span>{item.label}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-0 active:opacity-100" />
              </button>
            ))}
            
            {/* Quick Simulation Link on mobile overlay */}
            <button
              onClick={() => {
                onNavigate('tech');
                setIsOpen(false);
              }}
              className="mt-2 w-full py-3.5 rounded-xl bg-neon-cyan text-black font-display font-medium text-xs text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Access Quantum Simulation Lab</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
