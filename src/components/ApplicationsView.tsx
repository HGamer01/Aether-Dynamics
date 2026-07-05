import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Anchor, ArrowUpRight, Check, X, ShieldAlert, Cpu } from 'lucide-react';
import { ApplicationCard } from '../types';
import TiltCard from './TiltCard';
import AnimatedSection from './AnimatedSection';

export default function ApplicationsView() {
  const [selectedApp, setSelectedApp] = useState<ApplicationCard | null>(null);

  const applications: ApplicationCard[] = [
    {
      id: "pod-transit",
      title: "Nimbus Levitating Commuter Pods",
      category: "Urban Transportation",
      description: "Quiet, localized-G commuter pods that trace dedicated magnetic municipal paths. They negate 95% of internal drag, offering frictionless city commutes at 180 mph with zero noise pollution.",
      specs: [
        "Maximum velocity: 220 mph (statically locked)",
        "Stator locking nodes: 14 auxiliary electromagnets",
        "Average energy efficiency coefficient: 98.6%",
        "Chamber safety factor: Triple redundant power nodes"
      ],
      status: "Operational Pilot",
      metric: "14,200 Passengers / Day",
      imageSeed: "commuter_pod"
    },
    {
      id: "air-villa",
      title: "Serene Residential Floating Villas",
      category: "Luxury Platforms",
      description: "High-altitude architectural wonders anchored entirely by static superconductor cores. Suspended 150 meters above the landscape, they support up to 45 tons of premium steel and glass.",
      specs: [
        "Maximum load tolerance: 120 tons",
        "Altitude threshold: 50m - 300m adjustable",
        "Stabilization lock tolerance: +/- 0.5 cm under high wind",
        "Secondary backup batteries: 72-hour discharge safety"
      ],
      status: "Engineering Phase",
      metric: "3 Anchor platforms built",
      imageSeed: "floating_villa"
    },
    {
      id: "cargo-rig",
      title: "Vanguard Orbital Cargo Launchers",
      category: "Aerospace Logistics",
      description: "Heavy weightless launch rigging designed to lift aerospace hulls past orbital escape velocities. By neutralizing fuel weight, it cuts traditional fossil booster costs by 99.4%.",
      specs: [
        "Structural mass displacement: 4.2M Metric Tons",
        "Required baseline core input: 120 MW",
        "Levitation field width: 240 meters radial lock",
        "Integrated thermal shield locks: Carbon mesh"
      ],
      status: "In Orbit Verification",
      metric: "9 successful launches",
      imageSeed: "orbital_rig"
    }
  ];

  return (
    <div className="relative pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 pb-24 text-left">
      <AnimatedSection>
        <div className="space-y-4 max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs font-mono">
            <Anchor className="w-3.5 h-3.5" />
            <span>ACTIVE FIELD APPLICATIONS</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight leading-none">
            Deploying Anti-Gravity Infrastructure.
          </h1>
          
          <p className="text-gray-400 font-sans font-light text-base leading-relaxed">
            From compact urban micro-commutes to grand sky-villas and interstellar launch scaffolds, Aether Dynamics bridges laboratory quantum physics into physical, durable weightless assets.
          </p>
        </div>
      </AnimatedSection>

      {/* Grid of high-fidelity application cards */}
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {applications.map((app) => (
            <TiltCard
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className="glass rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-between group hover:border-neon-cyan/20 cursor-pointer transition-all duration-300 relative"
            >
              {/* Visual Header representing technical specs */}
              <div className="p-6 pb-2">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[9px] text-neon-cyan tracking-wider uppercase bg-neon-cyan/5 border border-neon-cyan/15 px-2 py-0.5 rounded">
                    {app.category}
                  </span>
                  <span className="font-mono text-[9px] text-gray-500 uppercase">
                    {app.status}
                  </span>
                </div>
                <h3 className="text-lg font-display font-medium text-white group-hover:text-neon-cyan transition-colors">
                  {app.title}
                </h3>
              </div>

              {/* Application descriptive overview */}
              <div className="p-6 pt-2 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-gray-400 text-xs font-sans font-light leading-relaxed truncate-3-lines">
                  {app.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 uppercase block">Active Metric</span>
                    <span className="text-xs font-mono font-medium text-white">{app.metric}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-neon-cyan/40 group-hover:bg-neon-cyan/5 flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-neon-cyan" />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Expanded detailed specifications modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl rounded-3xl glass border border-white/10 overflow-hidden text-left relative shadow-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedApp(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Headers */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-neon-cyan/10 border border-neon-cyan/20 font-mono text-[9px] text-neon-cyan uppercase">
                  {selectedApp.category}
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-medium text-white pr-8">
                  {selectedApp.title}
                </h2>
              </div>

              {/* Body narrative content */}
              <p className="text-gray-300 font-sans font-light text-sm leading-relaxed">
                {selectedApp.description}
              </p>

              {/* Tech Specs detailed breakdown list */}
              <div className="space-y-3 bg-cosmic-black/40 rounded-xl border border-white/5 p-4 sm:p-6">
                <div className="flex items-center gap-2 pb-2 border-b border-white/5 mb-1 text-[10px] font-mono text-neon-violet uppercase font-semibold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Telemetry & Engineering Specifications</span>
                </div>
                <ul className="space-y-2 font-sans font-light text-xs text-gray-400">
                  {selectedApp.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-neon-cyan shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status footer inside modal */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs font-mono">
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase">PROJECT STATUS</span>
                  <span className="text-neon-cyan font-medium">{selectedApp.status}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[9px] uppercase">DEPLOYMENT TELEMETRY</span>
                  <span className="text-white font-medium">{selectedApp.metric}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
