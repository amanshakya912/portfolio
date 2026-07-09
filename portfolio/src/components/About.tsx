import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pfp from "../assets/UEoFR6mP.jpg";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socials = [
    { icon: faPhone, link: "tel:+977-9818313576", gradient: "from-emerald-400 to-teal-500" },
    { icon: faGithub, link: "https://github.com/amanshakya912", gradient: "from-violet-400 to-purple-500" },
    { icon: faLinkedin, link: "https://linkedin.com/in/amanshakya912", gradient: "from-sky-400 to-blue-500" },
  ];

  return (
    <section
      id="About"
      ref={ref}
      className="relative px-6 md:px-10 py-20 md:py-28 bg-blue-950 caustic-sweep"
    >
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-5 gap-10 md:gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="md:col-span-3 order-2 md:order-1"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl text-white font-cormorant mb-8"
          >
            About <span className="text-cyan-300">Me</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative bg-white/[0.04] backdrop-blur-lg border border-white/[0.08] rounded-2xl p-7
              before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br
              before:from-cyan-400/5 before:to-transparent before:pointer-events-none"
          >
            <p className="text-white/85 text-base md:text-lg leading-relaxed font-karla relative z-10">
              <span className="text-cyan-300 font-semibold text-xl">Hi there, I'm Aman Shakya</span>,
              an enthusiastic, ambitious and diligent software developer with experience building
              and shipping production-ready web and mobile applications. Strong background in
              full-stack development, security-focused systems, and API-driven architectures.
            </p>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4 font-karla relative z-10">
              Experienced in developing end-to-end products, with a focus on scalability,
              performance, and secure application design.
            </p>
          </motion.div>

          {/* Social links - mobile visible here */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex gap-4 mt-8 md:hidden"
          >
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-11 h-11 rounded-full bg-gradient-to-br ${s.gradient}
                  flex items-center justify-center shadow-lg`}
              >
                <FontAwesomeIcon icon={s.icon} className="text-white text-lg" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Porthole Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, type: "spring" }}
          className="md:col-span-2 order-1 md:order-2 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Outer glow ring */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px rgba(34,211,238,0.2), 0 0 60px rgba(34,211,238,0.1)',
                  '0 0 50px rgba(34,211,238,0.35), 0 0 100px rgba(34,211,238,0.15)',
                  '0 0 30px rgba(34,211,238,0.2), 0 0 60px rgba(34,211,238,0.1)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="porthole w-56 h-56 md:w-72 md:h-72 overflow-hidden"
            >
              <img
                src={pfp}
                alt="Aman Shakya"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating bubbles around porthole */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-cyan-300/60"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${70 + Math.random() * 20}%`,
                }}
                animate={{
                  y: [0, -60 - Math.random() * 40],
                  x: [0, (Math.random() - 0.5) * 20],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>

          {/* Desktop social links under photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="hidden md:flex gap-5 mt-8"
          >
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`relative group`}
              >
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-300`} />
                <div className={`relative w-11 h-11 rounded-full bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg border border-white/10`}>
                  <FontAwesomeIcon icon={s.icon} className="text-white text-lg" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-transparent to-transparent pointer-events-none"></div>

    </section>
  );
};

export default About;