import { Orbit, Send, RefreshCw } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  onNavigate: (tab: ActiveTab) => void;
  onResetLaunch?: () => void;
}

export default function Footer({ onNavigate, onResetLaunch }: FooterProps) {
  return (
    <footer className="relative border-t border-white/5 bg-[#050505] z-10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
        
        {/* Brand Information Column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="relative w-7 h-7 rounded-lg border border-neon-cyan/20 flex items-center justify-center text-neon-cyan bg-neon-cyan/5">
              <Orbit className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="font-display font-semibold tracking-wider text-white text-xs">AETHER</span>
              <span className="font-mono text-[8px] text-neon-cyan font-bold tracking-widest block -mt-1 uppercase">Dynamics</span>
            </div>
          </div>
          <p className="text-gray-500 font-sans font-light text-xs leading-relaxed max-w-sm">
            Forging high-fidelity negative-gravity fields and superconductor stators. Our blueprints define the safe, silent, urban air grids of tomorrow.
          </p>
          
          {onResetLaunch && (
            <div className="pt-2">
              <button
                onClick={onResetLaunch}
                className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#00F0FF]/30 rounded-full text-[9px] text-[#00F0FF] hover:bg-[#00F0FF]/10 hover:border-[#00F0FF] transition-all uppercase tracking-wider font-mono cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 animate-spin-slow" />
                <span>Re-launch Drive Overlay</span>
              </button>
            </div>
          )}
        </div>

        {/* Directory links */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-mono text-[9px] text-neon-violet uppercase tracking-widest font-semibold">COORDINATES</h4>
          <ul className="space-y-2 text-xs font-sans font-light text-gray-400">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer transition-colors">
                System Overview
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-white cursor-pointer transition-colors">
                Corporate Mission
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('tech')} className="hover:text-white cursor-pointer transition-colors">
                Quantum Simulation
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('applications')} className="hover:text-white cursor-pointer transition-colors">
                Active Projects
              </button>
            </li>
          </ul>
        </div>

        {/* Technical Documents Links */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-mono text-[9px] text-neon-pink uppercase tracking-widest font-semibold">ENGINEERING</h4>
          <ul className="space-y-2 text-xs font-sans font-light text-gray-400">
            <li>
              <button onClick={() => onNavigate('pricing')} className="hover:text-white cursor-pointer transition-colors">
                Platform Licensing
              </button>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Stator Mechanics PDF</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Geneva Safety Certs</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">API Schemas Outbound</a>
            </li>
          </ul>
        </div>

        {/* Quick parameters dispatch */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-mono text-[9px] text-neon-cyan uppercase tracking-widest font-semibold">DISPATCH RINGS</h4>
          <p className="text-gray-500 font-sans font-light text-[11px] leading-relaxed">
            Stay aligned with advanced superconductivity updates.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="vance@cern.ch"
              className="w-full bg-cosmic-black border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white focus:outline-none focus:border-neon-cyan pr-8 font-mono"
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neon-cyan hover:text-white transition-colors cursor-pointer"
              onClick={() => {
                console.log("Coordinate ring saved! Telemetry updates registered.");
              }}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-4 text-[10px] font-mono text-gray-500">
        <p>&copy; 2026 Aether Dynamics Corp. Quantum field parameters secured under vacuum locks.</p>
        <p className="text-gray-600">STATIC EQUILIBRIUM: ONLINE</p>
      </div>
    </footer>
  );
}
