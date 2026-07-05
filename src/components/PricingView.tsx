import { motion } from 'motion/react';
import { Compass, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { PricingTier } from '../types';
import AnimatedSection from './AnimatedSection';

export default function PricingView() {
  const tiers: PricingTier[] = [
    {
      name: "Research Core",
      tagline: "Ideal for academic laboratories and aerodynamic wind tunnels.",
      price: "$14,500",
      period: "per Core / year",
      features: [
        "Isolation chamber size: Max 2.5m diameter",
        "Continuous static suspension: Up to 500 lbs",
        "Dedicated web terminal debug logs access",
        "Baseline 24-hour supervisor monitoring locks",
        "API integrations for local simulation parameters"
      ],
      specs: {
        maxLoad: "0.25 Metric Tons",
        energyEfficiency: "94.2% lock",
        warpRadius: "1.25 meters"
      },
      isPopular: false
    },
    {
      name: "Commercial Transit",
      tagline: "Optimized for municipal systems, logistics hulls, and passenger transport.",
      price: "Inquire",
      period: "Enterprise Licensing",
      features: [
        "Unlimited flight lane nodes authorizations",
        "Continuous dynamic levitation: Up to 15 tons",
        "Double-redundant stator magnets arrays",
        "Dedicated remote site-reliability engineers",
        "Deep integrations with local atmospheric grids",
        "Custom vessel structural blueprints validation"
      ],
      specs: {
        maxLoad: "15.0 Metric Tons",
        energyEfficiency: "98.8% lock",
        warpRadius: "18.5 meters"
      },
      isPopular: true
    },
    {
      name: "Interstellar Custom",
      tagline: "Unrestricted propulsion rigs for aerospace flight launch manifolds.",
      price: "Custom",
      period: "Bespoke Project Spec",
      features: [
        "Unrestricted superconducting chamber volumes",
        "Mass negating escape scaffolds arrays",
        "Tripled superconductor cooling loops",
        "Unlimited custom quantum parameters scaling",
        "Custom hardware casing & iridescence finishes",
        "Physical deployment onsite team engineering"
      ],
      specs: {
        maxLoad: "4.2M Metric Tons",
        energyEfficiency: "99.98% lock",
        warpRadius: "240+ meters"
      },
      isPopular: false
    }
  ];

  return (
    <div className="relative pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 pb-24 text-left">
      <AnimatedSection>
        <div className="space-y-4 max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LICENSING & INTEGRATIONS</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight leading-none">
            Invest in Gravity-Null Core Arrays.
          </h1>
          
          <p className="text-gray-400 font-sans font-light text-base leading-relaxed">
            Select an appropriate superconductor allocation tier. Each includes certified safety validations, automatic core parameter lockups, and telemetry logging profiles.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`glass rounded-3xl overflow-hidden border p-6 sm:p-8 flex flex-col justify-between relative group ${
                tier.isPopular ? 'border-neon-cyan/30 bg-neon-cyan/[0.01] shadow-[0_0_20px_rgba(0,240,255,0.06)]' : 'border-white/5'
              }`}
            >
              {/* Visual glow indicator for popular tier */}
              {tier.isPopular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet text-black font-mono text-[9px] font-bold uppercase tracking-wider">
                  Recommended platform
                </div>
              )}

              <div>
                <div className="space-y-2 mb-6">
                  <h3 className="text-xl font-display font-medium text-white">{tier.name}</h3>
                  <p className="text-gray-400 text-xs font-sans font-light leading-relaxed">{tier.tagline}</p>
                </div>

                {/* Pricing breakdown */}
                <div className="border-b border-white/5 pb-6 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-display font-medium text-white">{tier.price}</span>
                    {tier.price !== "Inquire" && tier.price !== "Custom" && (
                      <span className="text-gray-500 font-mono text-xs">{tier.period}</span>
                    )}
                  </div>
                  {tier.price === "Inquire" && <span className="text-xs font-mono text-neon-cyan">{tier.period}</span>}
                  {tier.price === "Custom" && <span className="text-xs font-mono text-neon-violet">{tier.period}</span>}
                </div>

                {/* Specs parameters sub-breakdown */}
                <div className="grid grid-cols-3 gap-2 bg-cosmic-black/50 rounded-xl p-3 border border-white/5 mb-6 text-center font-mono">
                  <div>
                    <span className="text-[8px] text-gray-500 uppercase block">Max Lift</span>
                    <span className="text-[10px] text-white font-medium">{tier.specs.maxLoad}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-gray-500 uppercase block">Efficiency</span>
                    <span className="text-[10px] text-neon-cyan font-medium">{tier.specs.energyEfficiency}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-gray-500 uppercase block">Field Rad</span>
                    <span className="text-[10px] text-neon-violet font-medium">{tier.specs.warpRadius}</span>
                  </div>
                </div>

                {/* Features check list */}
                <ul className="space-y-3 font-sans font-light text-xs text-gray-400">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-neon-cyan shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA action button */}
              <div className="pt-8">
                <button
                  className={`w-full py-4 text-[11px] font-bold uppercase tracking-[0.2em] cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 rounded-sm ${
                    tier.isPopular
                      ? 'bg-white text-black hover:bg-neon-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                      : 'bg-transparent text-white border border-white/10 hover:border-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/5'
                  }`}
                >
                  <span>Request Core Allocation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
