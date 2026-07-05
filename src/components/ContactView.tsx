import { useState, FormEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, ShieldCheck, Cpu, Phone } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    vesselType: 'Urban Transit',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative pt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 pb-24 text-left">
      <div className="space-y-4 max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs font-mono">
          <Mail className="w-3.5 h-3.5" />
          <span>QUANTUM VECTOR GATEWAY</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight leading-none">
          Initiate Core Allocation.
        </h1>
        
        <p className="text-gray-400 font-sans font-light text-base leading-relaxed">
          Need a heavy cargo orbital launch or localized commuter pod integration? Dispatch your parameters. Our engineering department handles coordinate calibrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-neon-cyan">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-medium text-white text-sm mb-1">Geneva Dynamics Vault</h4>
                  <p className="text-gray-400 text-xs font-sans font-light leading-relaxed">
                    Facility Block G, Sub-level 14<br />
                    Meyrin, CH-1211 Geneva<br />
                    Switzerland
                  </p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-neon-violet">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-medium text-white text-sm mb-1">Secure Vector Dispatch</h4>
                  <p className="text-gray-400 text-xs font-mono font-light leading-relaxed">
                    vectors@aetherdynamics.net<br />
                    PGP Key Fingerprint ID: AETH-884F-942G
                  </p>
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 text-neon-pink">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-medium text-white text-sm mb-1">Hyper-Resonance Voice</h4>
                  <p className="text-gray-400 text-xs font-sans font-light leading-relaxed">
                    Intl Priority: +41 22 942 0500<br />
                    Orbital Relay: CH-094
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-neon-cyan/15 bg-neon-cyan/[0.01] p-4 text-xs font-mono text-neon-cyan flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <p className="font-light">
              All inbounds are processed under quantum cryptographic envelopes. Realtime parameter logs are locked upon submission.
            </p>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="lg:col-span-7 glass p-6 sm:p-8 rounded-2xl border border-white/5">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Elena Vance"
                      className="w-full bg-cosmic-black text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-neon-cyan focus:outline-none transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Cryptographic Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="elena@cern.ch"
                      className="w-full bg-cosmic-black text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-neon-cyan focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Organization */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Organization / Lab</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      placeholder="CERN Physics Group"
                      className="w-full bg-cosmic-black text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-neon-cyan focus:outline-none transition-all"
                    />
                  </div>

                  {/* Vessel Type */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Vessel Category Interest</label>
                    <select
                      name="vesselType"
                      value={formData.vesselType}
                      onChange={handleInputChange}
                      className="w-full bg-cosmic-black text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-neon-cyan focus:outline-none transition-all"
                    >
                      <option value="Urban Transit">Nimbus Commuter Pods</option>
                      <option value="Luxury Floating Platform">Serene Air Villa</option>
                      <option value="Aerospace Rig">Vanguard Cargo Launcher</option>
                      <option value="Academic Sandbox">Research Core Laboratory</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Project Narrative Specs</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Provide mechanical displacement details, desired baseline superconductor temperatures, or flight lanes clearance requirements..."
                    className="w-full bg-cosmic-black text-white text-xs px-4 py-3 rounded-xl border border-white/10 focus:border-neon-cyan focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-[11px] font-bold uppercase tracking-[0.2em] bg-white text-black hover:bg-neon-cyan active:scale-[0.99] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 rounded-sm shadow-[0_0_20px_rgba(0,240,255,0.2)] cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Locking Quantum Cryptography..." : "Dispatch Parameters Packet"}</span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6 min-h-[350px]"
              >
                <div className="p-4 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan">
                  <Cpu className="w-8 h-8 animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-display font-medium text-white">Cryptographic Dispatch Established.</h3>
                  <p className="text-gray-400 font-sans font-light text-xs max-w-sm leading-relaxed mx-auto">
                    Your parameters packet has been successfully encrypted under node signature <strong>#AETH-{Math.floor(Math.random() * 90000) + 10000}</strong>. Our orbital relay team will calibrate responsive telemetries within 24 hours.
                  </p>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-neon-cyan/40 hover:bg-neon-cyan/5 text-white font-mono text-xs transition-all cursor-pointer"
                >
                  Clear Node Session
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
