import { useState, useRef, MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticWrapperProps {
  children: ReactNode;
  className?: string;
  range?: number; // Distance threshold for magnetic attraction
  strength?: number; // How strong the attraction is
  key?: string | number;
}

export default function MagneticWrapper({ children, className = '', range = 50, strength = 0.35 }: MagneticWrapperProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  
  // Spring configuration for super organic feel
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    const { clientX, clientY } = e;
    const rect = elementRef.current.getBoundingClientRect();
    
    // Center of the item
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Distance vector
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Check if within magnetic pull range
    const distance = Math.hypot(distanceX, distanceY);
    
    if (distance < range) {
      // Pull element towards cursor slightly
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      // Snap back to resting state
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
