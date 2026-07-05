import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const mouse = { x: -100, y: -100, targetX: -100, targetY: -100 };
    const ringPos = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener to check if we are hovering over interactive components
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('.cursor-pointer') !== null ||
        target.closest('.sandbox-node') !== null ||
        target.closest('[role="button"]') !== null;

      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    let animFrameId: number;

    const updatePosition = () => {
      // Direct positioning for inner core dot
      mouse.x = mouse.targetX;
      mouse.y = mouse.targetY;

      // Physics based smoothing for outer ring
      const ease = 0.15; // Ease factor for dampening
      ringPos.x += (mouse.targetX - ringPos.x) * ease;
      ringPos.y += (mouse.targetY - ringPos.y) * ease;

      if (dot) {
        dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring) {
        ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId = requestAnimationFrame(updatePosition);
    };

    animFrameId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  // Hidden on touchscreen / mobile devices by default for better ergonomics
  return (
    <div className={`hidden md:block pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Inner physical particle dot */}
      <div
        ref={cursorDotRef}
        className={`fixed left-0 top-0 w-2 h-2 rounded-full bg-[#00F0FF] mix-blend-screen shadow-[0_0_10px_#00F0FF] transition-transform duration-150 ease-out`}
      />

      {/* Outer leveling stabilization gravitational ring */}
      <div
        ref={cursorRingRef}
        className={`fixed left-0 top-0 rounded-full border border-dashed flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'w-10 h-10 border-[#8B5CF6] bg-[#8B5CF6]/5 rotate-45 scale-110 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
            : 'w-6 h-6 border-[#00F0FF]/40 bg-transparent rotate-0 scale-100'
        }`}
      >
        {/* Subtle target crosshairs when hovered */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-px h-2 bg-[#8B5CF6] absolute top-0" />
            <div className="w-px h-2 bg-[#8B5CF6] absolute bottom-0" />
            <div className="h-px w-2 bg-[#8B5CF6] absolute left-0" />
            <div className="h-px w-2 bg-[#8B5CF6] absolute right-0" />
          </div>
        )}
      </div>
    </div>
  );
}
