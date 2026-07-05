import { motion } from 'motion/react';
import { Eye, ShieldCheck, Cpu, Trophy, Sparkles, Flame, Orbit } from 'lucide-react';
import { TeamMember } from '../types';
import TiltCard from './TiltCard';
import AnimatedSection from './AnimatedSection';

export default function AboutView() {
  const timeline = [
    {
      year: "2021",
      title: "The Genesis Gravity-Null Project",
      desc: "Founded in a private subterranean research lab in Geneva, our scientists successfully isolated a localized gravitational dipole of 0.05m radius, proving mechanical levitation was viable."
    },
    {
      year: "2023",
      title: "V1 Stator-Core Unveiling",
      desc: "Developed the first closed-loop superconductor chamber (Aether Core V1). Suspended a 5-ton payload autonomously for 48 consecutive hours at static equilibrium."
    },
    {
      year: "2024",
      title: "Urban Air Mobility Partnership",
      desc: "Secured global airspace clearance and partnered with municipal planners to design the first modular hover lanes for premium zero-gravity commuters."
    },
    {
      year: "2026",
      title: "Deep Space Propulsion Array",
      desc: "Contracted by aerospace exploration bureaus to integrate quantum negative-g field thrusters onto flagship orbital hulls, initiating a new era of interstellar cargo weightlessness."
    }
  ];

  const team: TeamMember[] = [
    {
      name: "Dr. Elena Vance",
      role: "Chief Quantum Physicist & Founder",
      bio: "Former Director of Graviton Science at CERN. Spent 14 years mapping vacuum metric tensors before achieving the Geneva dipole breakthrough.",
      avatarSeed: "elena"
    },
    {
      name: "Marcus Sterling",
      role: "VP of Aerospace Systems",
      bio: "Ex-NASA propulsion lead. Designed high-temperature superconductor configurations that allowed Aether Cores to transition into full atmospheric drag mode.",
      avatarSeed: "marcus"
    },
    {
      name: "Aria Thorne",
      role: "Director of Industrial Kinetics",
      bio: "Industrial designer specializing in luxury aerospace cabins. Crafts the visual envelope of Aether's passenger pods for maximum safety and ergonomic bliss.",
      avatarSeed: "aria"
    }
  ];

  const values = [
    {
      icon: <Cpu className="w-6 h-6 text-neon-cyan" />,
      title: "Scientific Integrity",
      desc: "We stand on absolute empirical proof. Every quantum stator resonance is documented, validated, and optimized down to the nanosecond."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-neon-violet" />,
      title: "Absolute Safety Locks",
      desc: "Our cores feature triple-redundant magnetic stabilizers that lock the vessel at its current altitude during any atmospheric turbulence or power drop."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-neon-pink" />,
      title: "Visionary Luxury",
      desc: "Technology is not just utility; it is art. Our crafts glide in pristine, silent symmetry, elevating urban travel into a meditative state."
    }
  ];

  return (
    <div className="relative pt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 pb-24 text-left">
      {/* Intro Hero Section */}
      <AnimatedSection>
        <div className="space-y-6 max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs font-mono">
            <Eye className="w-3.5 h-3.5" />
            <span>OUR VISIONARY ORIGINS</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-none">
            Pioneering the Era of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-pink">
              Weightless Motion.
            </span>
          </h1>
          
          <p className="text-gray-400 font-sans font-light text-base leading-relaxed">
            Aether Dynamics was born out of a singular, defiant question: Why should mass bind us to the Earth? By fusing superconductor science, quantum entanglement fields, and high-frequency resonance vectors, we create systems that float as naturally as breathing.
          </p>
        </div>
      </AnimatedSection>

      {/* Corporate values bento grid */}
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {values.map((v, idx) => (
            <TiltCard key={idx} className="glass p-8 rounded-2xl border border-white/5 relative group hover:border-white/10 transition-colors">
              <div className="p-3 bg-white/5 rounded-xl w-fit mb-6 group-hover:scale-105 transition-transform duration-300">
                {v.icon}
              </div>
              <h3 className="text-lg font-display font-medium text-white mb-2">{v.title}</h3>
              <p className="text-gray-400 text-sm font-sans font-light leading-relaxed">{v.desc}</p>
            </TiltCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Narrative Vertical Timeline */}
      <AnimatedSection>
        <div className="mb-24">
          <h2 className="text-2xl sm:text-4xl font-display font-medium text-white mb-12">
            Milestones of Levitation
          </h2>

          <div className="relative border-l border-white/10 ml-4 pl-8 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Pulsing indicator node on the border */}
                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-cosmic-black border border-white/20 flex items-center justify-center group-hover:border-neon-cyan transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping absolute" />
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-neon-cyan text-sm font-medium">{item.year}</span>
                  <h3 className="text-lg font-display font-medium text-white">{item.title}</h3>
                  <p className="text-gray-400 font-sans font-light text-sm max-w-2xl leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Quantum Team Section */}
      <AnimatedSection>
        <div>
          <div className="mb-12 space-y-2">
            <h2 className="text-2xl sm:text-4xl font-display font-medium text-white">
              The Cartographers of Gravity
            </h2>
            <p className="text-gray-400 text-sm font-sans font-light">
              Meet the architects and physicists responsible for translating complex orbital metric equations into silent, reliable propulsion systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, idx) => (
              <TiltCard key={idx} className="glass rounded-2xl overflow-hidden border border-white/5 group hover:border-neon-cyan/20 transition-all duration-300">
                <div className="h-48 bg-gradient-to-tr from-cosmic-dark to-cosmic-gray flex items-center justify-center relative overflow-hidden">
                  {/* Decorative wireframe grid background */}
                  <div className="absolute inset-0 grid-bg opacity-20" />
                  
                  {/* Minimalist 3D Avatar Placeholders using SVG/HTML graphics */}
                  <div className="relative w-24 h-24 rounded-full border border-white/10 bg-cosmic-black/80 flex items-center justify-center text-neon-cyan group-hover:scale-105 transition-transform duration-500 shadow-xl">
                    <div className="absolute inset-1.5 rounded-full border border-dashed border-neon-cyan/20 group-hover:animate-spin" />
                    <Orbit className="w-8 h-8 opacity-70 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500" />
                  </div>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-cosmic-black/80 border border-white/5 font-mono text-[9px] text-gray-500 uppercase">
                    Telemetry Active
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-base font-display font-medium text-white">{t.name}</h3>
                    <p className="text-xs font-mono text-neon-cyan">{t.role}</p>
                  </div>
                  <p className="text-gray-400 text-xs font-sans font-light leading-relaxed">{t.bio}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
