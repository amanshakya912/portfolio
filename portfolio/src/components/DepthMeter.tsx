import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const DepthMeter = () => {
  const { scrollYProgress } = useScroll();
  const meterY = useTransform(scrollYProgress, [0, 1], ['0%', '85%']);
  const [depthNum, setDepthNum] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setDepthNum(Math.round(v * 4000));
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50
        flex flex-col items-center gap-3 hidden md:flex select-none"
    >
      <div className="relative w-1 h-44 rounded-full bg-white/[0.06] overflow-visible">
        <motion.div
          style={{ height: meterY }}
          className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-cyan-400/50 to-blue-600/20"
        />
        <motion.div
          style={{ top: meterY }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="w-3 h-3 rounded-full bg-cyan-300
            shadow-[0_0_8px_rgba(34,211,238,0.8),0_0_20px_rgba(34,211,238,0.3)]" />
        </motion.div>
        {[0, 25, 50, 75, 100].map((pct) => (
          <div
            key={pct}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-px bg-white/10"
            style={{ top: `${pct}%` }}
          />
        ))}
      </div>
      <div className="text-center -ml-1">
        <div className="text-cyan-300/70 font-mono text-[10px] tabular-nums leading-none">
          {depthNum}
        </div>
        <div className="text-cyan-400/25 text-[7px] mt-1 tracking-[0.2em] uppercase">depth</div>
      </div>
    </motion.div>
  );
};

export default DepthMeter;