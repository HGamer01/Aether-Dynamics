import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface LaunchOverlayProps {
  onLaunchComplete: () => void;
  key?: string;
}

export default function LaunchOverlay({ onLaunchComplete }: LaunchOverlayProps) {
  const [isCounting, setIsCounting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [systemState, setSystemState] = useState('STANDBY');
  const [coilsCharging, setCoilsCharging] = useState(0);

  // Sound generator using Web Audio API to create a premium cinematic sci-fi experience
  const playBeep = (freq: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Pitch slide downwards/upwards for sci-fi dramatic effect
      if (freq > 300) {
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);
      } else {
        osc.frequency.exponentialRampToValueAtTime(freq * 0.2, ctx.currentTime + duration);
      }

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio context blocked or not supported:', e);
    }
  };

  // Heavy synth rumble/charge sound
  const playChargeSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Main oscillator (rumble)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();
      
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note
      osc1.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 5.0); // Ram up to A4 over 5 seconds

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(55.4, ctx.currentTime); // detuned
      osc2.frequency.exponentialRampToValueAtTime(443, ctx.currentTime + 5.0);

      filter.type = 'lowpass';
      filter.Q.setValueAtTime(8, ctx.currentTime);
      filter.frequency.setValueAtTime(100, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 5.0);

      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 4.0);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.1);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 5.1);
      osc2.stop(ctx.currentTime + 5.1);
    } catch (e) {
      console.warn('Synth rumble blocked:', e);
    }
  };

  // Cinematic launch burst sound
  const playLaunchBurst = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const noise = ctx.createOscillator(); // we'll detune a saw
      const filter = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 1.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.5);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.6);
    } catch (e) {
      console.warn('Launch explosion sound blocked:', e);
    }
  };

  const handleStartLaunch = () => {
    if (isCounting) return;
    setIsCounting(true);
    setSystemState('CHARGING');
    playBeep(220, 0.4, 'triangle');
    playChargeSynth();
  };

  useEffect(() => {
    if (!isCounting) return;

    // Simulate charging progress bar
    const coilInterval = setInterval(() => {
      setCoilsCharging((prev) => {
        if (prev >= 100) {
          clearInterval(coilInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          clearInterval(coilInterval);
          setSystemState('GRAVITY_ZERO');
          playLaunchBurst();
          
          // Small timeout to let the user see "GRAVITY ZERO" and experience the white flash
          setTimeout(() => {
            onLaunchComplete();
          }, 800);
          
          return 0;
        }
        
        // Countdowns get higher-pitched beep signals
        const pitches = [0, 880, 784, 659, 523, 440];
        playBeep(pitches[prev - 1] || 440, 0.25, 'sine');
        
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(coilInterval);
    };
  }, [isCounting, onLaunchComplete]);

  return (
    <div className="fixed inset-0 bg-[#060608] z-[99999] flex flex-col items-center justify-center overflow-hidden font-mono select-none">
      {/* Dynamic technical background grid lines */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      
      {/* Left/Right orbital telemetry badges */}
      <div className="absolute left-6 top-6 hidden md:flex flex-col gap-2 text-[9px] text-[#00F0FF]/40 tracking-widest text-left">
        <span>LOC: L4-ORBITAL-POINT</span>
        <span>SYS_LOCK: SECURE</span>
        <span>COSMIC_RAD: 0.12 uSv/h</span>
      </div>

      <div className="absolute right-6 top-6 hidden md:flex flex-col gap-2 text-[9px] text-neon-violet/40 tracking-widest text-right">
        <span>CORE: AETHER_V9_PROT</span>
        <span>ANTIGRAV_COILS: INDUCTION</span>
        <span>ATMOSPHERE_PROP: SYNCED</span>
      </div>

      {/* Floating particle/resonance container rings */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
        {/* Concentric high-tech technical vector rings */}
        <div className={`absolute inset-0 rounded-full border border-[#00F0FF]/10 transition-transform duration-[4000ms] ${isCounting ? 'scale-110 rotate-[180deg]' : 'scale-100 rotate-0'}`} />
        <div className={`absolute inset-4 rounded-full border border-dashed border-neon-violet/20 transition-transform duration-[6000ms] ${isCounting ? 'scale-95 -rotate-[360deg]' : 'scale-100 rotate-0'}`} />
        <div className="absolute inset-8 rounded-full border border-[#00F0FF]/5" />

        {/* Ambient background glow inside ring */}
        <div className={`absolute inset-12 rounded-full blur-3xl transition-all duration-1000 ${
          isCounting ? 'bg-neon-violet/10 scale-125' : 'bg-[#00F0FF]/5 scale-100'
        }`} />

        <AnimatePresence mode="wait">
          {!isCounting ? (
            <motion.div
              key="standby-panel"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="z-10 text-center flex flex-col items-center p-6"
            >
              <div className="w-12 h-12 rounded-full border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-6 animate-pulse bg-[#00F0FF]/5">
                <Shield className="w-5 h-5" />
              </div>

              <span className="text-[10px] text-[#00F0FF] tracking-[0.4em] uppercase mb-1">AETHER PROPULSION</span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-widest text-white uppercase mb-4 font-display">
                Drive Offline
              </h2>

              <p className="text-[11px] text-gray-500 max-w-xs leading-relaxed mb-6">
                Establish quantum induction loop and release standard mechanical anchoring brackets.
              </p>

              <button
                onClick={handleStartLaunch}
                className="px-8 py-3.5 bg-white text-black text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-[#00F0FF] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] active:scale-95 transition-all duration-300 rounded-sm cursor-pointer"
              >
                Launch Sequence
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="countdown-panel"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="z-10 text-center flex flex-col items-center p-6"
            >
              {countdown > 0 ? (
                <motion.div
                  key={countdown}
                  initial={{ scale: 1.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="font-display font-black text-7xl sm:text-8xl text-white tracking-tighter"
                >
                  0{countdown}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-[#00F0FF] font-display font-bold text-3xl sm:text-4xl tracking-widest uppercase animate-pulse"
                >
                  WARPING
                </motion.div>
              )}

              <span className="text-[10px] text-neon-violet tracking-[0.3em] uppercase mt-4 mb-2">
                {systemState}
              </span>

              {/* Induction indicator */}
              <div className="w-32 bg-white/5 h-1 rounded-full overflow-hidden mt-4">
                <div 
                  className="h-full bg-gradient-to-r from-[#00F0FF] to-neon-violet transition-all duration-100"
                  style={{ width: `${coilsCharging}%` }}
                />
              </div>
              <span className="text-[8px] text-gray-500 mt-2 tracking-widest">
                INDUCTION: {coilsCharging}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating error logs mimicking boot check sequence */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-md w-full px-6 flex flex-col gap-1 text-[9px] text-gray-500 text-center">
        <div className="flex justify-center items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${isCounting ? 'bg-[#00F0FF] animate-ping' : 'bg-green-500'}`} />
          <span className="tracking-widest">
            {isCounting 
              ? `CHARGING GRAVITATIONAL COMPENSATOR VECT_0${countdown}...` 
              : 'SYSTEM IN STANDBY MODE - WAITING FOR MANUAL IGNITION'}
          </span>
        </div>
      </div>

      {/* Extreme whiteout flash overlay when countdown reaches 0 */}
      <AnimatePresence>
        {isCounting && countdown === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 bg-white z-[100000]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
