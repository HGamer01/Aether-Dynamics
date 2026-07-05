import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Orbit, Zap, Cpu, Shield, ArrowRight, Compass, Activity, Server } from 'lucide-react';
import { ActiveTab } from '../types';
import TiltCard from './TiltCard';
import AnimatedSection from './AnimatedSection';

interface HomeViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

// Simple floating node definition for the interactive Anti-Gravity Playground
interface GravitonNode {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  label: string;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  // Stats counters
  const [stats, setStats] = useState({ coreStability: 0, flightHours: 0, fieldWarp: 0 });
  const [isSandboxActive, setIsSandboxActive] = useState(true);
  const sandboxRef = useRef<HTMLDivElement | null>(null);
  const [gravitons, setGravitons] = useState<GravitonNode[]>([]);
  const nextIdRef = useRef(1);

  // Animate stats counter on load
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let count = 0;

    const timer = setInterval(() => {
      count++;
      setStats({
        coreStability: Math.min(Math.round((count / steps) * 99.98), 99),
        flightHours: Math.min(Math.round((count / steps) * 142050), 142050),
        fieldWarp: Math.min(Math.round((count / steps) * 884), 884),
      });

      if (count >= steps) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Initialize Graviton physics nodes for Zero-G Playground
  useEffect(() => {
    if (!sandboxRef.current) return;
    const initialNodes: GravitonNode[] = [
      { id: nextIdRef.current++, x: 120, y: 150, vx: 0.5, vy: -0.3, size: 45, color: '#00F0FF', label: 'Quantum Core' },
      { id: nextIdRef.current++, x: 300, y: 100, vx: -0.4, vy: 0.5, size: 55, color: '#A020F0', label: 'Warp Ring' },
      { id: nextIdRef.current++, x: 500, y: 220, vx: 0.3, vy: -0.4, size: 40, color: '#FF007F', label: 'Stator Ring' },
      { id: nextIdRef.current++, x: 220, y: 280, vx: -0.2, vy: -0.2, size: 50, color: '#ffffff', label: 'Shield Pod' },
    ];
    setGravitons(initialNodes);
  }, []);

  // Physics animation frame for the Zero-G Playground
  useEffect(() => {
    if (!isSandboxActive) return;

    let animFrame: number;
    
    const updatePhysics = () => {
      setGravitons((prev) =>
        prev.map((g) => {
          let nx = g.x + g.vx;
          let ny = g.y + g.vy;
          let nvx = g.vx;
          let nvy = g.vy;

          // Simple wall bouncing inside 100% container
          const boundaryWidth = sandboxRef.current?.clientWidth || 800;
          const boundaryHeight = sandboxRef.current?.clientHeight || 360;

          if (nx - g.size / 2 < 0) {
            nx = g.size / 2;
            nvx = -nvx * 0.8;
          } else if (nx + g.size / 2 > boundaryWidth) {
            nx = boundaryWidth - g.size / 2;
            nvx = -nvx * 0.8;
          }

          if (ny - g.size / 2 < 0) {
            ny = g.size / 2;
            nvy = -nvy * 0.8;
          } else if (ny + g.size / 2 > boundaryHeight) {
            ny = boundaryHeight - g.size / 2;
            nvy = -nvy * 0.8;
          }

          // Subtle central upward thermal drift (simulating levitation)
          nvy -= 0.01;

          // Drag/Air resistance deceleration
          nvx *= 0.995;
          nvy *= 0.995;

          return { ...g, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrame);
  }, [isSandboxActive]);

  // Click on Sandbox to spawn custom graviton pulse bubbles
  const handleSandboxClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!sandboxRef.current) return;
    const rect = sandboxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Avoid spawning directly on top of another node if clicking on a node
    const isTargetingLabel = (e.target as HTMLElement).closest('.sandbox-node');
    if (isTargetingLabel) return;

    const size = Math.random() * 25 + 20;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    const colorChoices = ['#00F0FF', '#A020F0', '#FF007F'];
    const selectedColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];

    const newNode: GravitonNode = {
      id: nextIdRef.current++,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      color: selectedColor,
      label: `Emitter-${Math.floor(Math.random() * 900) + 100}`
    };

    setGravitons((prev) => [...prev, newNode].slice(-10)); // Keep max 10 nodes for high performance
  };

  // Node Drag and Hover interactions
  const triggerPush = (nodeId: number) => {
    setGravitons((prev) =>
      prev.map((g) => {
        if (g.id === nodeId) {
          return {
            ...g,
            vx: (Math.random() * 4 - 2) * 2,
            vy: (Math.random() * -3 - 2) * 1.5
          };
        }
        return g;
      })
    );
  };

  return (
    <div className="relative pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 grid-bg pb-24">
      {/* Hero Header Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 md:py-16">
        <AnimatedSection className="lg:col-span-7 space-y-8 text-left">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#00F0FF]"></div>
            <span className="text-[11px] uppercase tracking-[0.5em] text-[#00F0FF] font-mono">Quantum Levitation Systems</span>
          </div>

          <h1 className="text-[48px] sm:text-[76px] lg:text-[88px] leading-[0.95] font-bold tracking-tighter text-white mb-8 uppercase font-display">
            Defying<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/30">
              Gravity.
            </span>
          </h1>

          <p className="text-[#8E9299] text-lg sm:text-xl font-sans max-w-2xl font-light leading-relaxed">
            Pioneering the future of ethereal flight through advanced anti-gravity field manipulation and sustainable aerial freedom.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <button
              onClick={() => onNavigate('tech')}
              className="elegant-btn-primary px-10 py-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Experience Vision</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('applications')}
              className="elegant-btn-secondary px-10 py-4 flex items-center justify-center cursor-pointer"
            >
              Technical Specs
            </button>
          </div>

          {/* Quick specs horizontal ticker */}
          <div className="pt-8 border-t border-white/5 flex flex-wrap gap-8">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">Core Frequency</p>
              <p className="text-lg font-mono text-white font-light">942.5 GHz</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">Grav-Repulsion</p>
              <p className="text-lg font-mono text-neon-cyan font-light">100% Negative-G</p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">Thrust Yield</p>
              <p className="text-lg font-mono text-neon-violet font-light">4.2M Newtons</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Floating Core 3D visual showcase */}
        <AnimatedSection className="lg:col-span-5 relative flex justify-center">
          <TiltCard className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden glass p-4 group">
            {/* Ambient Aurora behind image */}
            <div className="absolute -inset-10 bg-gradient-to-br from-neon-cyan via-transparent to-neon-violet opacity-30 blur-2xl group-hover:opacity-40 transition-opacity duration-700" />
            
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center bg-cosmic-black/60">
              <img
                src="/src/assets/images/aether_core_1783235885541.jpg"
                alt="Aether Core Anti-Gravity Sphere"
                className="w-full h-full object-cover object-center levitate-slow"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Glass Panel representing technical readings */}
              <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-xl border border-white/10 text-left font-mono">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-[#00F0FF] tracking-wider uppercase font-medium">AETHER CORE V.9</span>
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                </div>
                <p className="text-[11px] text-gray-400 font-light truncate">Resonance Fields stabilized at 98.4% metric lock.</p>
              </div>
            </div>
          </TiltCard>
        </AnimatedSection>
      </div>

      {/* Bottom Interface Panels (Metrics & Sections) */}
      <AnimatedSection>
        <div className="border border-white/5 bg-[#111111]/30 backdrop-blur-md grid grid-cols-1 md:grid-cols-4 rounded-3xl overflow-hidden my-16">
          <div 
            onClick={() => onNavigate('tech')}
            className="border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer group text-left"
          >
            <span className="text-[10px] text-neon-violet font-bold tracking-widest uppercase font-mono">01. Core Tech</span>
            <h3 className="text-xl font-display font-medium text-white group-hover:text-[#00F0FF] mt-4 mb-2">Atmospheric Buoyancy</h3>
            <div className="flex items-center justify-between opacity-40 mt-4 text-[10px] font-mono tracking-widest uppercase italic">
              <span>v9.4.2</span>
              <div className="w-4 h-px bg-white"></div>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('applications')}
            className="border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer group text-left"
          >
            <span className="text-[10px] text-neon-cyan font-bold tracking-widest uppercase font-mono">02. Logistics</span>
            <h3 className="text-xl font-display font-medium text-white group-hover:text-[#00F0FF] mt-4 mb-2">Urban Aero-Transit</h3>
            <div className="flex items-center justify-between opacity-40 mt-4 text-[10px] font-mono tracking-widest uppercase italic">
              <span>Active Fleet</span>
              <div className="w-4 h-px bg-white"></div>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('about')}
            className="border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer group text-left"
          >
            <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase font-mono">03. Discovery</span>
            <h3 className="text-xl font-display font-medium text-white group-hover:text-[#00F0FF] mt-4 mb-2">Orbital Stations</h3>
            <div className="flex items-center justify-between opacity-40 mt-4 text-[10px] font-mono tracking-widest uppercase italic">
              <span>Low Earth Hub</span>
              <div className="w-4 h-px bg-white"></div>
            </div>
          </div>

          <div className="p-8 flex flex-col justify-between bg-[#111111]/80 overflow-hidden relative text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F0FF]/5 blur-3xl pointer-events-none"></div>
            <span className="text-[10px] text-white/40 font-bold tracking-widest uppercase font-mono">Metrics</span>
            
            <div className="flex gap-4 mt-4 mb-4">
              <div>
                <span className="block text-2xl font-light text-white font-mono">{stats.coreStability}%</span>
                <span className="text-[9px] uppercase tracking-tighter opacity-40">Stability Rate</span>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <span className="block text-2xl font-light text-white font-mono">0.0g</span>
                <span className="text-[9px] uppercase tracking-tighter opacity-40">Net Buoyancy</span>
              </div>
            </div>

            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="h-full bg-[#00F0FF] transition-all duration-500" style={{ width: `${stats.coreStability}%` }}></div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Interactive Zero-G Playground Sandbox */}
      <AnimatedSection>
        <div className="my-16 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
              Interact with the Zero-G Sandbox
            </h2>
            <p className="text-gray-400 font-sans font-light text-sm">
              Tired of earthbound web UI? Experience our local anti-gravity workspace. Drag, flick, or click empty space to generate new propulsion elements.
            </p>
          </div>

          <div
            ref={sandboxRef}
            onClick={handleSandboxClick}
            className="relative w-full h-[400px] rounded-3xl overflow-hidden glass border border-white/10 cursor-crosshair group flex items-center justify-center select-none"
          style={{ backgroundImage: 'radial-gradient(circle at center, rgba(16,16,24,0.4) 0%, rgba(5,5,5,0.8) 100%)' }}
        >
          {/* Faint Grid Layer */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Help Overlay when empty */}
          <div className="absolute pointer-events-none text-center font-mono space-y-1 opacity-40 group-hover:opacity-65 transition-opacity duration-300">
            <p className="text-xs text-neon-cyan">CLICK SANDBOX TO INJECT FIELD EMITTERS</p>
            <p className="text-[10px] text-gray-500">DRAG NODES TO ACCELERATE / HOVER TO ROTATE</p>
          </div>

          {/* Render floating node widgets */}
          <AnimatePresence>
            {gravitons.map((g) => (
              <motion.div
                key={g.id}
                drag
                dragMomentum={true}
                dragElastic={0.4}
                onClick={(e) => {
                  e.stopPropagation();
                  triggerPush(g.id);
                }}
                className="absolute flex flex-col items-center justify-center rounded-full glass cursor-grab active:cursor-grabbing text-center z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] sandbox-node group"
                style={{
                  left: g.x,
                  top: g.y,
                  width: g.size,
                  height: g.size,
                  borderColor: `${g.color}33`,
                  boxShadow: `0 0 15px ${g.color}15`,
                  x: '-50%',
                  y: '-50%'
                }}
                whileHover={{ scale: 1.15, borderColor: g.color }}
                whileDrag={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {/* Visual pulsing inner ring */}
                <div
                  className="absolute inset-2 rounded-full border border-dashed opacity-25 group-hover:opacity-100 group-hover:animate-spin duration-1000"
                  style={{ borderColor: g.color }}
                />
                
                {/* Icon mapping based on labels */}
                {g.label.includes('Core') && <Orbit className="w-5 h-5 mb-1" style={{ color: g.color }} />}
                {g.label.includes('Warp') && <Cpu className="w-5 h-5 mb-1" style={{ color: g.color }} />}
                {g.label.includes('Stator') && <Activity className="w-5 h-5 mb-1" style={{ color: g.color }} />}
                {g.label.includes('Emitter') && <Server className="w-4 h-4 mb-0.5" style={{ color: g.color }} />}
                {!g.label.includes('Core') && !g.label.includes('Warp') && !g.label.includes('Stator') && !g.label.includes('Emitter') && <Compass className="w-5 h-5 mb-1" style={{ color: g.color }} />}

                <span className="text-[8px] font-mono font-medium truncate max-w-[80%] text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                  {g.label}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Highlighted Signature Innovation Showcase */}
      <AnimatedSection>
        <div className="my-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-video sm:aspect-square rounded-3xl overflow-hidden glass p-4 border border-white/5">
                <img
                  src="/src/assets/images/aether_mobility_1783235899481.jpg"
                  alt="Aether Flight craft"
                  className="w-full h-full object-cover rounded-2xl border border-white/10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-violet/30 bg-neon-violet/5 text-neon-violet text-xs font-mono">
                <Orbit className="w-3.5 h-3.5" />
                <span>CORE APPLICATIONS</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight leading-none">
                The Horizon of Urban and Deep Space Freedom.
              </h2>
              
              <p className="text-gray-400 font-sans font-light leading-relaxed text-base">
                Aether Dynamics translates raw graviton physics into tangible transit infrastructure. From silent, zero-emissions commuter levitation pads to massive deep-space cargo hulls that negate weight to conserve fuel, we are structural cartographers of tomorrow's transport grid.
              </p>

              <ul className="space-y-3 font-sans text-sm text-gray-300 font-light">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                  <span>Urban Commuting: Glide quietly past traffic constraints with modular pods.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-violet" />
                  <span>Space Cargo Lift: Launch mega-vessels at 1/1000th of previous booster fuel volumes.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-pink" />
                  <span>Luxurious Lodges: Support high-altitude residential levitation platforms safely.</span>
                </li>
              </ul>

              <button
                onClick={() => onNavigate('applications')}
                className="mt-4 px-6 py-3 rounded-xl border border-white/10 hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-colors font-display text-sm font-medium text-white flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Active Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
