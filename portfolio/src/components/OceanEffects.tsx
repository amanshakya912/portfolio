// OceanEffects.tsx
// Create this as a new component in your components folder

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const OceanDivingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const bubblesRef = useRef<any[]>([]);
  const fishRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize bubbles
    bubblesRef.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height + canvas.height,
      radius: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      wobble: Math.random() * 2,
      wobbleSpeed: Math.random() * 0.05 + 0.02
    }));

    // Initialize fish
    fishRef.current = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height + canvas.height,
      size: Math.random() * 30 + 20,
      speed: Math.random() * 1.5 + 0.5,
      direction: Math.random() > 0.5 ? 1 : -1,
      wobble: 0,
      swimCycle: Math.random() * Math.PI * 2
    }));

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let frame = 0;

    const animate = () => {
      const scrollProgress = Math.min(window.scrollY / window.innerHeight, 1);
      const diveDepth = scrollProgress * canvas.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw water ripple effect when starting to dive
      if (scrollProgress > 0 && scrollProgress < 0.3) {
        const rippleStrength = scrollProgress * 3;
        ctx.save();
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.arc(
            canvas.width / 2,
            -50 + diveDepth + i * 30,
            100 + i * 40,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * rippleStrength * (1 - i * 0.15)})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Animate and draw bubbles
      bubblesRef.current.forEach((bubble) => {
        bubble.y -= bubble.speed * (1 + scrollProgress * 2);
        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += Math.sin(bubble.wobble) * 0.5;

        if (bubble.y < -100) {
          bubble.y = canvas.height + 100;
          bubble.x = Math.random() * canvas.width;
        }

        if (scrollProgress > 0.1) {
          ctx.beginPath();
          ctx.arc(bubble.x, bubble.y - diveDepth, bubble.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(173, 216, 230, ${0.4 * scrollProgress})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 * scrollProgress})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Animate and draw fish
      fishRef.current.forEach((f) => {
        f.swimCycle += 0.1;
        f.y += Math.sin(f.swimCycle) * 0.5;
        f.x += f.direction * f.speed * (0.5 + scrollProgress);

        if (f.x > canvas.width + 100) {
          f.x = -100;
          f.y = Math.random() * canvas.height + canvas.height * 0.5;
        } else if (f.x < -100) {
          f.x = canvas.width + 100;
          f.y = Math.random() * canvas.height + canvas.height * 0.5;
        }

        if (scrollProgress > 0.2) {
          const fishY = f.y - diveDepth * 0.8;
          const opacity = Math.min(scrollProgress * 1.5, 1);

          ctx.save();
          ctx.translate(f.x, fishY);
          if (f.direction < 0) ctx.scale(-1, 1);

          // Draw fish body
          ctx.beginPath();
          ctx.ellipse(0, 0, f.size, f.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100, 180, 220, ${opacity * 0.8})`;
          ctx.fill();
          
          // Draw tail
          ctx.beginPath();
          const tailWag = Math.sin(f.swimCycle) * 5;
          ctx.moveTo(-f.size, 0);
          ctx.lineTo(-f.size * 1.4 + tailWag, -f.size * 0.3);
          ctx.lineTo(-f.size * 1.4 + tailWag, f.size * 0.3);
          ctx.closePath();
          ctx.fillStyle = `rgba(80, 160, 200, ${opacity * 0.8})`;
          ctx.fill();

          // Draw eye
          ctx.beginPath();
          ctx.arc(f.size * 0.4, -f.size * 0.15, f.size * 0.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();

          ctx.restore();
        }
      });

      // Draw light rays
      if (scrollProgress > 0.15) {
        const rayCount = 6;
        for (let i = 0; i < rayCount; i++) {
          const gradient = ctx.createLinearGradient(
            canvas.width * (i / rayCount),
            -diveDepth,
            canvas.width * (i / rayCount) + 100,
            canvas.height - diveDepth
          );
          gradient.addColorStop(0, `rgba(135, 206, 235, ${0.15 * scrollProgress})`);
          gradient.addColorStop(1, 'rgba(135, 206, 235, 0)');

          ctx.fillStyle = gradient;
          ctx.fillRect(
            canvas.width * (i / rayCount) + Math.sin(frame * 0.01 + i) * 20,
            -diveDepth,
            80,
            canvas.height
          );
        }
      }

      // Draw depth gradient
      const depthGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      depthGradient.addColorStop(0, `rgba(0, 20, 40, ${scrollProgress * 0.3})`);
      depthGradient.addColorStop(1, `rgba(0, 10, 30, ${scrollProgress * 0.6})`);
      ctx.fillStyle = depthGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frame++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export const WaterRippleOverlay = () => {
  const { scrollYProgress } = useScroll();
  const rippleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.div
      style={{ opacity: rippleOpacity }}
      className="fixed inset-0 pointer-events-none z-20"
    >
      <div className="absolute inset-0 water-ripple" />
    </motion.div>
  );
};