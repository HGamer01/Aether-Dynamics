import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import TechView from './components/TechView';
import ApplicationsView from './components/ApplicationsView';
import PricingView from './components/PricingView';
import ContactView from './components/ContactView';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import LaunchOverlay from './components/LaunchOverlay';
import { ActiveTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isLaunched, setIsLaunched] = useState(() => {
    return sessionStorage.getItem('aether_launched') === 'true';
  });

  // Automatically scroll to top of window when active tab changes for smooth scrollytelling feel
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigate={setActiveTab} />;
      case 'about':
        return <AboutView />;
      case 'tech':
        return <TechView />;
      case 'applications':
        return <ApplicationsView />;
      case 'pricing':
        return <PricingView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView onNavigate={setActiveTab} />;
    }
  };

  const handleLaunchComplete = () => {
    setIsLaunched(true);
    sessionStorage.setItem('aether_launched', 'true');
  };

  const handleResetLaunch = () => {
    setIsLaunched(false);
    sessionStorage.removeItem('aether_launched');
  };

  return (
    <AnimatePresence mode="wait">
      {!isLaunched ? (
        <LaunchOverlay key="launcher" onLaunchComplete={handleLaunchComplete} />
      ) : (
        <motion.div
          key="app-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative min-h-screen bg-cosmic-black text-gray-100 font-sans selection:bg-neon-cyan selection:text-black overflow-x-hidden md:cursor-none"
        >
          {/* Dynamic top viewport scroll progress indicator */}
          <ScrollProgressBar />

          {/* Physics-based 3D holographic custom cursor */}
          <CustomCursor />

          {/* Background Ambient Glows and Horizontal Divider Lines */}
          <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#0e7490]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
          <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#6d28d9]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none z-0"></div>

          {/* Immersive interactive gravity/space particle backdrop */}
          <ParticleBackground />

          {/* Sticky navigation layout */}
          <Navbar activeTab={activeTab} onNavigate={setActiveTab} />

          {/* Vertical Rail Info */}
          <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-12 opacity-40 z-20 pointer-events-none">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] [writing-mode:vertical-lr] rotate-180 text-white">Scroll to Immerse</span>
            <div className="w-1.5 h-1.5 border border-white rotate-45"></div>
          </div>

          {/* Main scrolly-telling display stage */}
          <main className="relative z-10 w-full min-h-[calc(100vh-80px)] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Ground luxury footer */}
          <Footer onNavigate={setActiveTab} onResetLaunch={handleResetLaunch} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
