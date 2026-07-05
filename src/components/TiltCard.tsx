import { useState, useRef, MouseEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  key?: string | number;
}

export default function TiltCard({ children, className = '', onClick, id }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Motion values to keep track of rotation state
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs create high-fidelity, organic physics motion instead of rigid linear changes
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(x, springConfig);
  const rotateY = useSpring(y, springConfig);

  // Glow gradients follow mouse
  const mouseXValue = useMotionValue(0);
  const mouseYValue = useMotionValue(0);
  const glowX = useSpring(mouseXValue, springConfig);
  const glowY = useSpring(mouseYValue, springConfig);

  // Is mouse hovering
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Width and height of the target card
    const width = rect.width;
    const height = rect.height;

    // Position of cursor relative to element center
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    
    const mouseX = relativeX - width / 2;
    const mouseY = relativeY - height / 2;

    // Limit rotation to 6 degrees max for perfect high-end elegance
    const maxRotation = 6;
    const rX = -(mouseY / (height / 2)) * maxRotation;
    const rY = (mouseX / (width / 2)) * maxRotation;

    x.set(rX);
    y.set(rY);

    // Track percent for hover reflection lighting
    mouseXValue.set(relativeX);
    mouseYValue.set(relativeY);
    
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={`relative transition-shadow duration-300 ${isHovered ? 'shadow-[0_20px_40px_rgba(0,0,0,0.6)]' : 'shadow-none'} ${className}`}
    >
      {/* 3D Sheen Lighting Overlay Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 rounded-inherit overflow-hidden transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
        }}
      >
        <motion.div
          className="absolute w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-white/5 to-transparent blur-2xl pointer-events-none mix-blend-overlay"
          style={{
            left: glowX,
            top: glowY,
          }}
        />
      </div>

      {/* Preserve-3D wrapper for inner elements to pull them forward visually */}
      <div 
        className="h-full w-full flex flex-col justify-between"
        style={{ 
          transform: 'translateZ(12px)', 
          transformStyle: 'preserve-3d' 
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
