import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Settings, Activity, FileText, Zap, RotateCcw, Compass, Loader2, Sparkles, Sliders } from 'lucide-react';
import { SimulationSpecs, DiagnosticResult } from '../types';
import AnimatedSection from './AnimatedSection';

export default function TechView() {
  const [specs, setSpecs] = useState<SimulationSpecs>({
    vesselType: 'Urban Hover Craft',
    corePower: 65,
    altitude: 120,
    fieldStabilization: 0.85,
    propulsionFrequency: 450,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Loading screen sequences
  const loadingSequences = [
    "Establishing superconductor thermal lock...",
    "Injecting gaseous gravitons into primary chamber...",
    "Aligning magnetic stators at 142.4-degree phase shift...",
    "Querying Aether Dynamics AI central core...",
    "Finalizing quantum metric field visualization..."
  ];

  // Rotate loading steps
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingSequences.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Handle live canvas gravity field visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 400;
      height = canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    window.addEventListener('resize', handleResize);

    let angle = 0;

    const drawField = () => {
      ctx.fillStyle = 'rgba(12, 12, 14, 0.15)'; // Dark ambient background trail
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw quantum core central ring
      const pulseRadius = 35 + Math.sin(angle * 4) * 5 * (specs.corePower / 100);
      
      // Radiant energy fill
      const grad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, pulseRadius * 2.5);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
      grad.addColorStop(0.3, 'rgba(160, 32, 240, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Main superconductor orb
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Orbital gravitational warp rings
      const ringCount = 4;
      const stabilizationFactor = specs.fieldStabilization; // Higher stabilization -> more concentric/perfect rings
      
      for (let i = 1; i <= ringCount; i++) {
        const baseRadius = 50 + i * 35;
        const drift = Math.sin(angle + i) * 12 * (1 - stabilizationFactor); // Less stabilized drifts wildly
        
        ctx.beginPath();
        
        // Draw ellipses showing warp distortion
        ctx.ellipse(
          centerX + drift,
          centerY,
          baseRadius,
          baseRadius * 0.75,
          angle * 0.2 * (specs.propulsionFrequency / 450),
          0,
          Math.PI * 2
        );
        
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(160, 32, 240, 0.35)' : 'rgba(0, 240, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Rotating quantum particle dots floating along orbital lanes
      const dotCount = 8;
      for (let i = 0; i < dotCount; i++) {
        const dotAngle = angle * (1 + (specs.propulsionFrequency / 600)) + (i * (Math.PI * 2 / dotCount));
        const orbitRadius = 80 + (i % 3) * 35;
        const dx = centerX + Math.cos(dotAngle) * orbitRadius;
        const dy = centerY + Math.sin(dotAngle) * orbitRadius * 0.75;

        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#00F0FF' : '#FF007F';
        ctx.shadowColor = i % 2 === 0 ? '#00F0FF' : '#FF007F';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      angle += 0.02 * (specs.corePower / 65);
      animFrame = requestAnimationFrame(drawField);
    };

    drawField();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, [specs]);

  const handleSliderChange = (key: keyof SimulationSpecs, val: any) => {
    setSpecs((prev) => ({ ...prev, [key]: val }));
  };

  const handleRunDiagnostic = async () => {
    setIsLoading(true);
    setLoadingStep(0);
    setResult(null);

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(specs),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetSpecs = () => {
    setSpecs({
      vesselType: 'Urban Hover Craft',
      corePower: 65,
      altitude: 120,
      fieldStabilization: 0.85,
      propulsionFrequency: 450,
    });
    setResult(null);
  };

  return (
    <div className="relative pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 pb-24 text-left">
      <AnimatedSection>
        <div className="space-y-4 max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>QUANTUM FIELD DYNAMICS LAB</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight leading-none">
            Simulate Gravitational Resonance.
          </h1>
          
          <p className="text-gray-400 font-sans font-light text-base leading-relaxed">
            Unlock telemetry calculations by altering the parameters of the superconducting Aether Core. Our server-side neural calculations generate safety logs, diagnostic charts, and vector stability guides instantly.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Input Panel */}
        <AnimatedSection className="lg:col-span-4 h-full">
          <div className="glass p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <h3 className="text-sm font-mono text-white flex items-center gap-2 uppercase tracking-wide">
              <Sliders className="w-4 h-4 text-neon-cyan" />
              <span>Core Parameters</span>
            </h3>
            <button
              onClick={resetSpecs}
              className="text-gray-500 hover:text-white transition-colors cursor-pointer"
              title="Reset parameters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Vessel Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase">Vessel Platform</label>
              <select
                value={specs.vesselType}
                onChange={(e) => handleSliderChange('vesselType', e.target.value)}
                className="w-full bg-cosmic-black text-white rounded-lg px-3 py-2 border border-white/10 text-xs font-sans focus:border-neon-cyan focus:outline-none"
              >
                <option value="Urban Hover Craft">Urban Hover Craft (Standard)</option>
                <option value="Atmospheric Aerospace Shuttle">Atmospheric Aerospace Shuttle</option>
                <option value="Orbital Heavy Cargo Carrier">Orbital Heavy Cargo Carrier</option>
                <option value="Serene Air Villa Platform">Serene Air Villa Platform</option>
              </select>
            </div>

            {/* Core Power Level */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs text-gray-400">
                <span>Core Power</span>
                <span className="text-white">{specs.corePower}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={specs.corePower}
                onChange={(e) => handleSliderChange('corePower', parseInt(e.target.value))}
                className="w-full accent-neon-cyan bg-cosmic-black rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            {/* Target Altitude */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs text-gray-400">
                <span>Target Altitude</span>
                <span className="text-white">{specs.altitude}m</span>
              </div>
              <input
                type="range"
                min="5"
                max="1000"
                value={specs.altitude}
                onChange={(e) => handleSliderChange('altitude', parseInt(e.target.value))}
                className="w-full accent-neon-cyan bg-cosmic-black rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            {/* Field Stabilization */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs text-gray-400">
                <span>Stabilization Factor</span>
                <span className="text-white">{specs.fieldStabilization.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.40"
                max="1.00"
                step="0.01"
                value={specs.fieldStabilization}
                onChange={(e) => handleSliderChange('fieldStabilization', parseFloat(e.target.value))}
                className="w-full accent-neon-cyan bg-cosmic-black rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            {/* Propulsion Frequency */}
            <div className="space-y-2">
              <div className="flex justify-between font-mono text-xs text-gray-400">
                <span>Quantum Frequency</span>
                <span className="text-white">{specs.propulsionFrequency} GHz</span>
              </div>
              <input
                type="range"
                min="100"
                max="1200"
                value={specs.propulsionFrequency}
                onChange={(e) => handleSliderChange('propulsionFrequency', parseInt(e.target.value))}
                className="w-full accent-neon-cyan bg-cosmic-black rounded-lg h-1.5 cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handleRunDiagnostic}
            disabled={isLoading}
            className="w-full py-4 text-[11px] font-bold uppercase tracking-[0.2em] bg-white text-black hover:bg-neon-cyan active:scale-[0.99] transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 rounded-sm shadow-[0_0_20px_rgba(0,240,255,0.25)]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Simulating Field...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate AI Diagnostic</span>
              </>
            )}
          </button>
          </div>
        </AnimatedSection>

        {/* Live Vector Visualizer & Diagnostic Results */}
        <AnimatedSection className="lg:col-span-8 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-stretch">
          {/* Live Gravity Well Visualizer Box */}
          <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col min-h-[350px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-neon-cyan" />
                <span>Metric Warp Telemetry</span>
              </h3>
              <span className="px-2 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/20 font-mono text-[9px] text-neon-cyan animate-pulse">
                REALTIME FIELD DENSITY
              </span>
            </div>
            
            <div className="flex-1 w-full bg-cosmic-black/80 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>
          </div>

          {/* Diagnostic Log Output Panel */}
          <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
            <h3 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-neon-violet" />
              <span>Aether AI Diagnostic Outbound</span>
            </h3>

            {/* Simulated Loading screens, sequentially fading */}
            {isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-8 text-center">
                <Loader2 className="w-8 h-8 text-neon-cyan animate-spin" />
                <p className="font-mono text-xs text-neon-cyan animate-pulse">{loadingSequences[loadingStep]}</p>
                <div className="w-full bg-cosmic-black rounded-full h-1 overflow-hidden max-w-xs">
                  <div
                    className="bg-neon-cyan h-1 transition-all duration-700"
                    style={{ width: `${((loadingStep + 1) / loadingSequences.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Result display */}
            {!isLoading && result && (
              <div className="flex-1 space-y-6 overflow-y-auto max-h-[400px] text-xs">
                <div>
                  <h4 className="font-mono text-[10px] text-neon-cyan uppercase mb-1 font-semibold">SUMMARY OF SYSTEM LEVEL</h4>
                  <p className="text-gray-300 font-sans font-light leading-relaxed">{result.summary}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-white/5 py-4">
                  <div>
                    <span className="text-gray-500 font-mono block">LIFT VECTOR</span>
                    <span className="text-lg font-mono text-white font-medium">{result.metrics.liftCoefficient} G-m</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-mono block">ENERGY DISPERSION</span>
                    <span className="text-lg font-mono text-white font-medium">{result.metrics.energyDispersionRate} kW/s</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-mono block">GRAV-DEFLECTION</span>
                    <span className="text-lg font-mono text-neon-cyan font-medium">{result.metrics.gravitationalDeflection}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500 font-mono block">FIELD STABILITY</span>
                    <span className="text-lg font-mono text-neon-violet font-medium">{result.metrics.stabilityFactor}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] text-neon-violet uppercase mb-1 font-semibold">QUANTUM RESONANCE DEEP-DIVE</h4>
                  <p className="text-gray-300 font-sans font-light leading-relaxed">{result.resonanceAnalysis}</p>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] text-neon-pink uppercase mb-2 font-semibold">AI SYSTEM CORRECTIONS</h4>
                  <ul className="space-y-1.5 font-sans font-light text-gray-400 pl-3 border-l border-neon-pink/30">
                    {result.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Standby/Initial Screen */}
            {!isLoading && !result && (
              <div className="flex-1 flex flex-col items-center justify-center space-y-3 p-8 text-center text-gray-500 font-mono">
                <Compass className="w-12 h-12 text-cosmic-gray animate-spin-slow mb-2" />
                <p className="text-xs uppercase text-neon-violet">Telemetry System On Standby</p>
                <p className="text-[10px] text-gray-600 max-w-xs font-sans font-light">
                  Aether AI calculations are disabled. Toggle the inputs and click &quot;Generate AI Diagnostic&quot; above to initiate server resonance mappings.
                </p>
              </div>
            )}
          </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
