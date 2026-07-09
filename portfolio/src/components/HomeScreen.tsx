import ocean from "../assets/ocean.mp4";
import resume from "../assets/AmanShakyaCV.pdf";
import { motion, useScroll, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const HomeScreen = () => {
  const { scrollYProgress } = useScroll();
  const videoScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.35, 0.6]);

  return (
    <div className="relative overflow-hidden h-screen w-full z-40">
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 will-change-transform">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
        >
          <source src={ocean} type="video/mp4" />
        </video>
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-blue-950/20 to-blue-900/60 pointer-events-none"
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 80 + i * 50,
              height: 80 + i * 50,
              left: `${5 + i * 16}%`,
              top: `${15 + (i % 3) * 22}%`,
              background: i < 3
                ? 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(100,200,255,0.08) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
            animate={{
              x: [0, 40 + i * 10, -25, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.2, 0.9, 1],
              opacity: [0.5, 0.9, 0.4],
            }}
            transition={{
              duration: 7 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-0 flex flex-col items-center md:justify-center top-[28%] md:top-0 text-center z-50"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-cormorant font-bold text-shimmer leading-tight">
            Aman Shakya
          </h1>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-blue-950/40 to-transparent my-5"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-cormorant text-blue-950/70 font-light"
        >
          Software Developer
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex gap-5 mt-6"
        >
          {[
            { icon: faGithub, href: "https://github.com/amanshakya912" },
            { icon: faLinkedin, href: "https://linkedin.com/in/amanshakya912" },
          ].map((s, i) => (
            <motion.a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-blue-950/15 backdrop-blur-sm
                border border-blue-950/20 flex items-center justify-center
                text-blue-950/60 hover:text-blue-950 hover:bg-blue-950/25
                transition-colors duration-300 cursor-pointer"
            >
              <FontAwesomeIcon icon={s.icon} className="text-sm" />
            </motion.a>
          ))}
        </motion.div>

        <motion.a
          href={resume}
          download="AmanShakyaCV.pdf"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 40px rgba(34,211,238,0.3), 0 8px 30px rgba(0,0,0,0.2)',
          }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 font-karla bg-blue-950/90 backdrop-blur-sm text-white
            text-lg px-8 py-4 rounded-full cursor-pointer
            border border-cyan-400/20
            shadow-[0_4px_25px_rgba(0,0,0,0.25)]
            hover:border-cyan-400/40 transition-all duration-300
            relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="relative z-10">View Resume</span>
        </motion.a>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-400 via-blue-400/50 to-transparent pointer-events-none" />

      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-50">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          className="w-px h-20 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent origin-top"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="text-blue-950/25 text-[9px] font-karla tracking-[0.3em] uppercase [writing-mode:vertical-lr] rotate-180"
        >
          Portfolio
        </motion.span>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          className="w-px h-20 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent origin-bottom"
        />
      </div>
    </div>
  );
};

export default HomeScreen;