import { useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Bubble {
  x: number; y: number; radius: number;
  speed: number; wobble: number; wobbleSpeed: number; opacity: number;
}
interface MouseBubble {
  x: number; y: number; radius: number;
  speed: number; life: number; maxLife: number;
  vx: number; wobble: number;
}
interface ClickBurst {
  x: number; y: number; radius: number;
  vx: number; vy: number; life: number; maxLife: number;
}
interface Plankton {
  x: number; y: number; size: number;
  vx: number; vy: number;
  glow: number; glowSpeed: number; hue: number;
}
interface Ray {
  x: number; width: number; speed: number;
  opacity: number; angle: number;
}

type FishShape = 'standard' | 'round' | 'elongated' | 'angel' | 'tiny';

interface Fish {
  x: number; y: number; size: number;
  speed: number; direction: 1 | -1;
  swimCycle: number; swimSpeed: number;
  color: string; tailColor: string; bellyColor: string;
  scared: boolean; scareTimer: number;
  shape: FishShape;
  baseY: number;
  yOffset: number;
  curious: boolean;
  spots: { x: number; y: number; r: number }[];
  stripeCount: number;
}

interface Jellyfish {
  x: number; y: number; size: number;
  pulse: number; pulseSpeed: number;
  driftX: number; driftSpeed: number;
  hue: number; tentacles: number;
}

export const OceanDivingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const bubblesRef = useRef<Bubble[]>([]);
  const mouseBubblesRef = useRef<MouseBubble[]>([]);
  const clickBurstsRef = useRef<ClickBurst[]>([]);
  const planktonRef = useRef<Plankton[]>([]);
  const fishRef = useRef<Fish[]>([]);
  const jellyfishRef = useRef<Jellyfish[]>([]);
  const raysRef = useRef<Ray[]>([]);
  const frameRef = useRef(0);
  const lastSpawnRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const count = 8 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const force = 1.5 + Math.random() * 2.5;
      clickBurstsRef.current.push({
        x: e.clientX, y: e.clientY,
        radius: Math.random() * 4 + 2,
        vx: Math.cos(angle) * force,
        vy: Math.sin(angle) * force - 1.5,
        life: 0, maxLife: 40 + Math.random() * 30,
      });
    }
    fishRef.current.forEach((f) => {
      const dx = f.x - e.clientX, dy = f.y - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        f.scared = true;
        f.scareTimer = 45;
        f.direction = dx > 0 ? 1 : -1;
        f.speed = 4 + Math.random() * 2;
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cw = 0, ch = 0;
    const W = () => cw;
    const H = () => ch;

    const resize = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = window.innerHeight;
      initParticles();
    };

    const fishPalettes = [
      { body: 'rgba(255, 140, 50, 0.75)', tail: 'rgba(255, 100, 30, 0.65)', belly: 'rgba(255, 200, 130, 0.3)' },
      { body: 'rgba(80, 200, 255, 0.7)', tail: 'rgba(50, 170, 230, 0.6)', belly: 'rgba(180, 230, 255, 0.25)' },
      { body: 'rgba(255, 220, 80, 0.75)', tail: 'rgba(230, 190, 40, 0.65)', belly: 'rgba(255, 240, 160, 0.3)' },
      { body: 'rgba(180, 100, 255, 0.7)', tail: 'rgba(150, 70, 230, 0.6)', belly: 'rgba(210, 170, 255, 0.25)' },
      { body: 'rgba(100, 255, 180, 0.7)', tail: 'rgba(70, 220, 150, 0.6)', belly: 'rgba(180, 255, 220, 0.25)' },
      { body: 'rgba(255, 120, 140, 0.7)', tail: 'rgba(230, 90, 110, 0.6)', belly: 'rgba(255, 190, 195, 0.25)' },
      { body: 'rgba(255, 180, 200, 0.65)', tail: 'rgba(240, 150, 170, 0.55)', belly: 'rgba(255, 220, 230, 0.2)' },
      { body: 'rgba(70, 130, 180, 0.6)', tail: 'rgba(50, 110, 160, 0.5)', belly: 'rgba(140, 180, 210, 0.2)' },
      { body: 'rgba(100, 160, 140, 0.6)', tail: 'rgba(80, 140, 120, 0.5)', belly: 'rgba(160, 200, 190, 0.2)' },
      { body: 'rgba(160, 140, 180, 0.55)', tail: 'rgba(140, 120, 160, 0.45)', belly: 'rgba(200, 190, 210, 0.2)' },
    ];

    const makeSpots = (s: number, count: number) =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.3) * s * 0.8,
        y: (Math.random() - 0.5) * s * 0.5,
        r: s * (0.04 + Math.random() * 0.05),
      }));

    const initParticles = () => {
      const w = W(), h = H();

      bubblesRef.current = Array.from({ length: 35 }, () => ({
        x: Math.random() * w, y: Math.random() * h + h,
        radius: Math.random() * 4 + 1.5, speed: Math.random() * 1.8 + 0.6,
        wobble: Math.random() * Math.PI * 2, wobbleSpeed: Math.random() * 0.04 + 0.015,
        opacity: Math.random() * 0.3 + 0.15,
      }));

      const fishList: Fish[] = [];

      // Large feature fish
      const featureShapes: FishShape[] = ['standard', 'round', 'angel'];
      for (let i = 0; i < 3; i++) {
        const c = fishPalettes[i];
        fishList.push({
          x: Math.random() * w, y: Math.random() * h,
          size: 28 + Math.random() * 15, speed: 0.35 + Math.random() * 0.35,
          direction: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
          swimCycle: Math.random() * Math.PI * 2, swimSpeed: 0.055 + Math.random() * 0.02,
          color: c.body, tailColor: c.tail, bellyColor: c.belly,
          scared: false, scareTimer: 0, shape: featureShapes[i],
          baseY: Math.random() * h, yOffset: 0, curious: Math.random() > 0.5,
          spots: makeSpots(35, 3), stripeCount: 0,
        });
      }

      // Medium fish
      const medShapes: FishShape[] = ['standard', 'round', 'elongated', 'angel', 'standard'];
      for (let i = 0; i < 8; i++) {
        const c = fishPalettes[3 + (i % 5)];
        const sh = medShapes[i % medShapes.length];
        fishList.push({
          x: Math.random() * w, y: Math.random() * h,
          size: 15 + Math.random() * 12, speed: 0.45 + Math.random() * 0.55,
          direction: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
          swimCycle: Math.random() * Math.PI * 2, swimSpeed: 0.065 + Math.random() * 0.03,
          color: c.body, tailColor: c.tail, bellyColor: c.belly,
          scared: false, scareTimer: 0, shape: sh,
          baseY: Math.random() * h, yOffset: 0, curious: Math.random() > 0.6,
          spots: makeSpots(20, 2), stripeCount: sh === 'elongated' ? 0 : Math.floor(Math.random() * 3),
        });
      }

      // 3 schools of tiny fish
      for (let g = 0; g < 3; g++) {
        const c = fishPalettes[7 + (g % 3)];
        const gx = Math.random() * w;
        const gy = Math.random() * h;
        const gd = (Math.random() > 0.5 ? 1 : -1) as 1 | -1;
        const gs = 0.55 + Math.random() * 0.45;
        const count = 5 + Math.floor(Math.random() * 4);
        for (let i = 0; i < count; i++) {
          fishList.push({
            x: gx + (Math.random() - 0.5) * 80,
            y: gy + (Math.random() - 0.5) * 50,
            size: 4 + Math.random() * 4, speed: gs + (Math.random() - 0.5) * 0.15,
            direction: gd,
            swimCycle: Math.random() * Math.PI * 2, swimSpeed: 0.09 + Math.random() * 0.04,
            color: c.body, tailColor: c.tail, bellyColor: c.belly,
            scared: false, scareTimer: 0, shape: 'tiny',
            baseY: gy, yOffset: 0, curious: false,
            spots: [], stripeCount: 0,
          });
        }
      }

      fishRef.current = fishList;

      jellyfishRef.current = Array.from({ length: 3 }, () => ({
        x: Math.random() * w, y: h * 0.25 + Math.random() * h * 0.5,
        size: Math.random() * 22 + 16, pulse: 0,
        pulseSpeed: Math.random() * 0.018 + 0.012,
        driftX: Math.random() * 0.2 + 0.06, driftSpeed: Math.random() * 0.004 + 0.002,
        hue: 260 + Math.random() * 80, tentacles: Math.floor(Math.random() * 3) + 5,
      }));

      raysRef.current = Array.from({ length: 6 }, () => ({
        x: Math.random() * w, width: Math.random() * 50 + 30,
        speed: Math.random() * 0.2 + 0.06, opacity: Math.random() * 0.07 + 0.03,
        angle: (Math.random() - 0.5) * 0.2,
      }));

      planktonRef.current = Array.from({ length: 45 }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        size: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
        glow: Math.random() * Math.PI * 2, glowSpeed: Math.random() * 0.02 + 0.008,
        hue: 170 + Math.random() * 50,
      }));
    };

    // ── Fish drawing by shape ──
    const drawEye = (ex: number, ey: number, er: number) => {
      ctx.beginPath();
      ctx.arc(ex, ey, er, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ex + er * 0.2, ey, er * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fill();
    };

    const drawFish = (f: Fish) => {
      const s = f.size;
      const tw = Math.sin(f.swimCycle) * (f.scared ? 8 : 4);

      ctx.save();
      ctx.translate(f.x, f.y);
      if (f.direction < 0) ctx.scale(-1, 1);

      switch (f.shape) {
        case 'standard': {
          ctx.beginPath();
          ctx.ellipse(0, 0, s, s * 0.42, 0, 0, Math.PI * 2);
          ctx.fillStyle = f.color;
          ctx.fill();
          // Belly
          ctx.beginPath();
          ctx.ellipse(0, s * 0.12, s * 0.7, s * 0.18, 0, 0, Math.PI * 2);
          ctx.fillStyle = f.bellyColor;
          ctx.fill();
          // Dorsal fin
          ctx.beginPath();
          ctx.moveTo(-s * 0.15, -s * 0.38);
          ctx.quadraticCurveTo(s * 0.1, -s * 0.7, s * 0.25, -s * 0.32);
          ctx.fillStyle = f.tailColor;
          ctx.fill();
          // Tail
          ctx.beginPath();
          ctx.moveTo(-s * 0.88, 0);
          ctx.lineTo(-s * 1.35 + tw, -s * 0.3);
          ctx.quadraticCurveTo(-s * 1.05, 0, -s * 1.35 + tw, s * 0.3);
          ctx.closePath();
          ctx.fillStyle = f.tailColor;
          ctx.fill();
          // Stripes
          if (f.stripeCount > 0) {
            for (let i = 0; i < f.stripeCount; i++) {
              const sx = -s * 0.2 + i * s * 0.3;
              ctx.beginPath();
              ctx.moveTo(sx, -s * 0.35);
              ctx.lineTo(sx, s * 0.35);
              ctx.strokeStyle = 'rgba(255,255,255,0.12)';
              ctx.lineWidth = s * 0.04;
              ctx.stroke();
            }
          }
          // Spots
          f.spots.forEach(sp => {
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            ctx.fill();
          });
          drawEye(s * 0.42, -s * 0.07, s * 0.1);
          break;
        }
        case 'round': {
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = f.color;
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(0, s * 0.15, s * 0.45, s * 0.25, 0, 0, Math.PI * 2);
          ctx.fillStyle = f.bellyColor;
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(-s * 0.6, 0);
          ctx.lineTo(-s * 0.9 + tw * 0.5, -s * 0.2);
          ctx.lineTo(-s * 0.9 + tw * 0.5, s * 0.2);
          ctx.closePath();
          ctx.fillStyle = f.tailColor;
          ctx.fill();
          f.spots.forEach(sp => {
            ctx.beginPath();
            ctx.arc(sp.x * 0.6, sp.y * 0.6, sp.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,0.18)';
            ctx.fill();
          });
          // Pectoral fins
          ctx.beginPath();
          ctx.ellipse(s * 0.15, s * 0.3, s * 0.2, s * 0.08, 0.3, 0, Math.PI * 2);
          ctx.fillStyle = f.tailColor;
          ctx.fill();
          drawEye(s * 0.3, -s * 0.15, s * 0.12);
          break;
        }
        case 'elongated': {
          ctx.beginPath();
          ctx.ellipse(0, 0, s * 1.2, s * 0.22, 0, 0, Math.PI * 2);
          ctx.fillStyle = f.color;
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(s * 0.1, s * 0.06, s * 0.8, s * 0.1, 0, 0, Math.PI * 2);
          ctx.fillStyle = f.bellyColor;
          ctx.fill();
          // Forked tail
          ctx.beginPath();
          ctx.moveTo(-s * 1.1, 0);
          ctx.lineTo(-s * 1.5 + tw, -s * 0.22);
          ctx.lineTo(-s * 1.25, 0);
          ctx.lineTo(-s * 1.5 + tw, s * 0.22);
          ctx.closePath();
          ctx.fillStyle = f.tailColor;
          ctx.fill();
          // Dorsal ridge
          ctx.beginPath();
          ctx.moveTo(s * 0.3, -s * 0.2);
          ctx.lineTo(-s * 0.5, -s * 0.25);
          ctx.strokeStyle = f.tailColor;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          drawEye(s * 0.75, -s * 0.04, s * 0.06);
          break;
        }
        case 'angel': {
          ctx.beginPath();
          ctx.moveTo(s * 0.5, 0);
          ctx.quadraticCurveTo(s * 0.2, -s * 0.85, -s * 0.3, -s * 0.65);
          ctx.lineTo(-s * 0.5, 0);
          ctx.lineTo(-s * 0.3, s * 0.65);
          ctx.quadraticCurveTo(s * 0.2, s * 0.85, s * 0.5, 0);
          ctx.fillStyle = f.color;
          ctx.fill();
          for (let i = 0; i < 3; i++) {
            const sx = -s * 0.1 + i * s * 0.2;
            ctx.beginPath();
            ctx.moveTo(sx, -s * 0.55);
            ctx.lineTo(sx, s * 0.55);
            ctx.strokeStyle = 'rgba(255,255,255,0.13)';
            ctx.lineWidth = s * 0.035;
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.moveTo(-s * 0.45, 0);
          ctx.lineTo(-s * 0.7 + tw * 0.5, -s * 0.15);
          ctx.lineTo(-s * 0.7 + tw * 0.5, s * 0.15);
          ctx.closePath();
          ctx.fillStyle = f.tailColor;
          ctx.fill();
          drawEye(s * 0.2, -s * 0.08, s * 0.08);
          break;
        }
        case 'tiny': {
          ctx.beginPath();
          ctx.ellipse(0, 0, s, s * 0.38, 0, 0, Math.PI * 2);
          ctx.fillStyle = f.color;
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(-s * 0.8, 0);
          ctx.lineTo(-s * 1.2 + tw * 0.6, -s * 0.25);
          ctx.lineTo(-s * 1.2 + tw * 0.6, s * 0.25);
          ctx.closePath();
          ctx.fillStyle = f.tailColor;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(s * 0.4, -s * 0.05, s * 0.08, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.fill();
          break;
        }
      }

      ctx.restore();
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const animate = () => {
      const w = W(), h = H();
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const frame = frameRef.current++;

      ctx.clearRect(0, 0, w, h);

      // ── Constant subtle tint — NO depth change ──
      const dg = ctx.createLinearGradient(0, 0, 0, h);
      dg.addColorStop(0, 'rgba(0, 15, 35, 0.08)');
      dg.addColorStop(1, 'rgba(0, 10, 25, 0.12)');
      ctx.fillStyle = dg;
      ctx.fillRect(0, 0, w, h);

      // ── Light rays ──
      raysRef.current.forEach((ray) => {
        ray.x += ray.speed * Math.sin(frame * 0.005 + ray.angle);
        if (ray.x > w + 100) ray.x = -100;
        if (ray.x < -100) ray.x = w + 100;

        const ro = ray.opacity * (0.7 + 0.3 * Math.sin(frame * 0.01 + ray.angle * 10));

        ctx.save();
        ctx.translate(ray.x, 0);
        ctx.rotate(ray.angle);
        const rg = ctx.createLinearGradient(0, -40, 0, h + 40);
        rg.addColorStop(0, `rgba(135, 206, 235, ${ro})`);
        rg.addColorStop(0.5, `rgba(100, 180, 230, ${ro * 0.2})`);
        rg.addColorStop(1, 'rgba(100, 180, 230, 0)');
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.moveTo(-ray.width / 2, -40);
        ctx.lineTo(ray.width / 2, -40);
        ctx.lineTo(ray.width * 1.4, h + 40);
        ctx.lineTo(-ray.width * 0.9, h + 40);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // ── Jellyfish ──
      jellyfishRef.current.forEach((jf) => {
        jf.pulse += jf.pulseSpeed;
        jf.x += Math.sin(frame * jf.driftSpeed) * jf.driftX;
        jf.y += Math.sin(jf.pulse * 0.5) * 0.2;
        if (jf.x > w + 80) jf.x = -80;
        if (jf.x < -80) jf.x = w + 80;
        if (jf.y < -100) jf.y = h + 60;
        if (jf.y > h + 100) jf.y = -60;

        const ps = 1 + Math.sin(jf.pulse) * 0.13;
        const sz = jf.size * ps;

        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.translate(jf.x, jf.y);

        // Glow
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, sz * 2);
        glow.addColorStop(0, `hsla(${jf.hue}, 75%, 72%, 0.1)`);
        glow.addColorStop(1, `hsla(${jf.hue}, 75%, 72%, 0)`);
        ctx.fillStyle = glow;
        ctx.fillRect(-sz * 2, -sz * 2, sz * 4, sz * 4);

        // Bell
        ctx.beginPath();
        ctx.ellipse(0, 0, sz, sz * 0.65, 0, Math.PI, 0);
        const bg = ctx.createRadialGradient(0, -sz * 0.15, 0, 0, 0, sz);
        bg.addColorStop(0, `hsla(${jf.hue}, 65%, 82%, 0.45)`);
        bg.addColorStop(1, `hsla(${jf.hue}, 55%, 55%, 0.12)`);
        ctx.fillStyle = bg;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.ellipse(0, -sz * 0.08, sz * 0.55, sz * 0.35, 0, Math.PI, 0);
        ctx.fillStyle = `hsla(${jf.hue}, 80%, 90%, 0.12)`;
        ctx.fill();

        // Tentacles
        for (let t = 0; t < jf.tentacles; t++) {
          const tx = -sz * 0.65 + (t / (jf.tentacles - 1)) * sz * 1.3;
          ctx.beginPath();
          ctx.moveTo(tx, 0);
          let cx = tx, cy = 0;
          for (let s = 0; s < 5; s++) {
            const wave = Math.sin(jf.pulse + t * 0.5 + s * 0.8) * (4 + s * 1.8);
            cx += wave * 0.25; cy += 11;
            ctx.lineTo(cx + wave, cy);
          }
          ctx.strokeStyle = `hsla(${jf.hue}, 55%, 68%, ${0.22 - t * 0.015})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();
      });

      // ── Fish — constant presence, interactive ──
      fishRef.current.forEach((f) => {
        f.swimCycle += f.swimSpeed;
        f.yOffset += Math.sin(f.swimCycle * 0.5) * 0.3;
        f.y = f.baseY + f.yOffset;
        f.x += f.direction * f.speed;

        // Mouse proximity — flee or curious
        const dx = f.x - mx, dy = f.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (f.scared) {
          f.scareTimer--;
          if (f.scareTimer <= 0) {
            f.scared = false;
            f.speed = f.shape === 'tiny' ? 0.55 + Math.random() * 0.4 : 0.4 + Math.random() * 0.5;
          }
        } else if (dist < 120 && f.shape !== 'tiny') {
          if (f.curious) {
            // Slowly drift toward mouse
            f.x -= (dx / dist) * 0.3;
            f.y -= (dy / dist) * 0.2;
          } else {
            // Flee
            f.scared = true;
            f.scareTimer = 40;
            f.direction = dx > 0 ? 1 : -1;
            f.speed = 3.5 + Math.random() * 1.5;
          }
        }

        // Wrap around
        if (f.x > w + 150) { f.x = -150; f.baseY = Math.random() * h; f.yOffset = 0; }
        if (f.x < -150) { f.x = w + 150; f.baseY = Math.random() * h; f.yOffset = 0; }

        const fishOpacity = f.shape === 'tiny' ? 0.6 : 0.75;
        ctx.save();
        ctx.globalAlpha = fishOpacity;
        drawFish(f);
        ctx.restore();
      });

      // ── Ambient bubbles ──
      bubblesRef.current.forEach((b) => {
        b.y -= b.speed;
        b.wobble += b.wobbleSpeed;
        b.x += Math.sin(b.wobble) * 0.5;

        const dx = b.x - mx, dy = b.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 70 && dist > 0) {
          b.x += (dx / dist) * 1.5;
          b.y += (dy / dist) * 0.8;
        }

        if (b.y < -40) { b.y = h + 40; b.x = Math.random() * w; }

        ctx.save();
        ctx.globalAlpha = b.opacity;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(173, 216, 230, 0.35)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x - b.radius * 0.25, b.y - b.radius * 0.25, b.radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fill();
        ctx.restore();
      });

      // ── Mouse bubble trail ──
      if (frame - lastSpawnRef.current > 3 && mx > 0) {
        if (mouseBubblesRef.current.length < 30) {
          mouseBubblesRef.current.push({
            x: mx + (Math.random() - 0.5) * 16,
            y: my + (Math.random() - 0.5) * 8,
            radius: Math.random() * 3.5 + 1.5,
            speed: Math.random() * 1.5 + 0.8,
            life: 0, maxLife: 50 + Math.random() * 30,
            vx: (Math.random() - 0.5) * 0.4,
            wobble: Math.random() * Math.PI * 2,
          });
        }
        lastSpawnRef.current = frame;
      }

      mouseBubblesRef.current = mouseBubblesRef.current.filter((mb) => {
        mb.life++;
        mb.y -= mb.speed;
        mb.wobble += 0.08;
        mb.x += Math.sin(mb.wobble) * 0.4 + mb.vx;
        if (mb.life > mb.maxLife) return false;

        const lr = mb.life / mb.maxLife;
        const alpha = lr < 0.15 ? lr / 0.15 : (1 - lr);
        const r = mb.radius * (1 - lr * 0.25);

        ctx.save();
        ctx.globalAlpha = alpha * 0.5;
        ctx.beginPath();
        ctx.arc(mb.x, mb.y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(173, 216, 230, 0.3)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(mb.x - r * 0.25, mb.y - r * 0.25, r * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.fill();
        ctx.restore();
        return true;
      });

      // ── Click burst bubbles ──
      clickBurstsRef.current = clickBurstsRef.current.filter((cb) => {
        cb.life++;
        cb.x += cb.vx;
        cb.y += cb.vy;
        cb.vy += 0.02; // slight gravity
        cb.vx *= 0.98;
        if (cb.life > cb.maxLife) return false;

        const lr = cb.life / cb.maxLife;
        const alpha = (1 - lr) * 0.6;
        const r = cb.radius * (1 - lr * 0.4);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(cb.x, cb.y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180, 230, 255, 0.4)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.restore();
        return true;
      });

      // ── Bioluminescent plankton ──
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      planktonRef.current.forEach((p) => {
        p.glow += p.glowSpeed;
        p.x += p.vx;
        p.y += p.vy;

        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 10) {
          p.vx += (dx / dist) * 0.008;
          p.vy += (dy / dist) * 0.008;
        }
        p.vx *= 0.995;
        p.vy *= 0.995;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const gi = (Math.sin(p.glow) * 0.5 + 0.5);
        const fo = gi * 0.35;

        const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
        pg.addColorStop(0, `hsla(${p.hue}, 100%, 75%, ${fo})`);
        pg.addColorStop(0.4, `hsla(${p.hue}, 100%, 60%, ${fo * 0.3})`);
        pg.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
        ctx.fillStyle = pg;
        ctx.fillRect(p.x - p.size * 4, p.y - p.size * 4, p.size * 8, p.size * 8);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${fo})`;
        ctx.fill();
      });
      ctx.restore();

      // ── Mouse flashlight ──
      if (mx > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const mg = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
        mg.addColorStop(0, 'rgba(140, 210, 255, 0.05)');
        mg.addColorStop(0.5, 'rgba(100, 180, 240, 0.02)');
        mg.addColorStop(1, 'rgba(100, 180, 240, 0)');
        ctx.fillStyle = mg;
        ctx.fillRect(mx - 90, my - 90, 180, 180);
        ctx.restore();
      }

      // ── Surface ripples (always present, subtle) ──
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        const ry = 20 + i * 18 + Math.sin(frame * 0.015 + i) * 4;
        for (let x = 0; x <= w; x += 4) {
          const y = ry + Math.sin(x * 0.012 + frame * 0.02 + i * 1.8) * (5 - i * 1.2);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(180, 230, 255, ${0.04 - i * 0.01})`;
        ctx.lineWidth = 1.5 - i * 0.4;
        ctx.stroke();
      }

      // ── Subtle vignette (constant) ──
      const vg = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.75);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,5,15,0.1)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [handleMouseMove, handleClick]);

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
  const rippleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 0.3]);

  return (
    <motion.div
      style={{ opacity: rippleOpacity }}
      className="fixed inset-0 pointer-events-none z-20"
    >
      <div className="absolute inset-0 water-ripple" />
    </motion.div>
  );
};