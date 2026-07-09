import ocean from "../assets/ocean.mp4";
import resume from "../assets/AmanShakyaCV.pdf";
import { motion } from "framer-motion";

const HomeScreen = () => {
  return (
    <div className="relative overflow-hidden h-screen w-full z-40">
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={ocean} type="video/mp4" />
      </video>

      {/* Floating light spots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-3xl"
            style={{
              width: 100 + i * 60,
              height: 100 + i * 60,
              left: `${10 + i * 18}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center md:justify-center top-[30%] md:top-0 text-center text-blue-950 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant animate-fade-up animate-once animate-duration-2000 animate-delay-100 text-shimmer">
            Aman Shakya
          </h1>
        </motion.div>

        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-cormorant animate-fade-up animate-once animate-duration-2000 animate-delay-600 text-blue-950/80">
          Software Developer
        </h2>

        <motion.a
          href={resume}
          download="AmanShakyaCV.pdf"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34,211,238,0.4)' }}
          whileTap={{ scale: 0.97 }}
          className="animate-fade animate-once animate-duration-2000 animate-delay-1000 font-karla bg-blue-950 text-white text-xl px-6 py-4 mt-10 hover:bg-blue-900 cursor-pointer rounded-md
            border border-cyan-400/20 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
        >
          View Resume
        </motion.a>
      </div>

      {/* THIS is the key transition — original gradient that fades video into the blue sections below */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-400 pointer-events-none"></div>
    </div>
  );
};

export default HomeScreen;