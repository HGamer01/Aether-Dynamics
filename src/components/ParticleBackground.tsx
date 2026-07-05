import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * -0.4 - 0.1; // Float upwards slightly
        this.alpha = Math.random() * 0.5 + 0.2;
        
        // Custom neon palettes
        const rand = Math.random();
        if (rand < 0.6) {
          this.color = `rgba(0, 240, 255, ${this.alpha})`; // Cyan
        } else if (rand < 0.9) {
          this.color = `rgba(160, 32, 240, ${this.alpha})`; // Violet
        } else {
          this.color = `rgba(255, 255, 255, ${this.alpha})`; // White highlight
        }
      }

      update() {
        // Simple ambient drifting
        this.x += this.speedX;
        this.y += this.speedY;

        // Subtle attraction to mouse (gravitational pull effect)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 250) {
          const force = (250 - distance) / 2500;
          this.x += (dx / distance) * force * 2;
          this.y += (dy / distance) * force * 2;
        }

        // Loop screen edge check
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
        if (this.x < 0 || this.x > width) {
          this.x = Math.random() * width;
        }
      }

      draw(cContext: CanvasRenderingContext2D) {
        cContext.beginPath();
        cContext.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        cContext.fillStyle = this.color;
        cContext.shadowColor = this.color;
        cContext.shadowBlur = this.size * 2;
        cContext.fill();
        cContext.shadowBlur = 0; // Reset shadow for efficiency
      }
    }

    // Initialize particle array
    const particleCount = Math.min(120, Math.floor((width * height) / 12000));
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.2)'; // Faint trail to preserve space feeling with brand off-black #0A0A0A
      ctx.fillRect(0, 0, width, height);

      // Dampen mouse move for physics feel
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw standard glowing gravitational aura around mouse
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 5, mouse.x, mouse.y, 180);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.04)');
      gradient.addColorStop(0.5, 'rgba(160, 32, 240, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
      ctx.fill();

      // Render quantum grid lines connecting close particles (quantum entanglement grid)
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alphaVal = (100 - dist) / 100 * 0.12;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alphaVal})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      id="quantum-particle-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
