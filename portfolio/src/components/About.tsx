import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pfp from "../assets/UEoFR6mP.jpg";
import bubble from "../assets/Bubbles.png";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const About = () => {
  const float = {
    animate: {
      y: [0, -12, 0, 8, 0],
      rotate: [0, 1.5, 0, -1.5, 0],
    },
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  };

  return (
    <div
      id="About"
      className="px-6 md:px-10 relative flex items-center justify-center bg-blue-950 w-full bg-cover md:aspect-video aspect-9/16 bg-[url('../src/assets/bg1mob.png')] md:bg-[url('../src/assets/bg1_2.png')] "
    >
      <div className="z-50 grid md:grid-cols-6 grid-cols-1  w-full gap-10">
        {/* About Me Text Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="md:col-span-3 lg:col-span-4"
        >
          <h2 className="text-white font-cormorant text-4xl mb-4">About Me</h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl"
          >
            <p className="text-white/90 text-base md:text-lg leading-relaxed relative z-10">
              <span className="text-cyan-300 font-semibold text-xl">
                Hi there, I am Aman Shakya
              </span>
              , an enthusiastic, ambitious and diligent software developer with
              a strong background in web and mobile application development who
              is consistently seeking opportunities to learn and develop skills
              and knowledge. Skilled in React, Next.js, Django, Laravel, and
              Flutter, with strong expertise in API integration, backend
              services, and DevOps practices. Passionate about building secure,
              scalable, and user-focused applications while continuously
              learning and adapting to new technologies.
            </p>
          </motion.div>
        </motion.div>

        {/* Profile Picture Section */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-3 lg:col-span-2 relative flex flex-col items-center"
        >
          {/* Decorative bubble */}
          <motion.img
            src={bubble}
            className="absolute -top-10 -left-10 md:-top-20 md:-left-15 z-10 h-[150px] w-[150px] md:h-[200px] md:w-[200px]"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating visual stack */}
          <motion.div
            className="relative w-full max-w-sm"
            animate={float.animate}
            transition={float.transition}
          >
            {/* Bioluminescent glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                y: [0, -6, 0],
                boxShadow: [
                  "0 0 20px rgba(100,200,255,0.3)",
                  "0 0 45px rgba(100,200,255,0.5)",
                  "0 0 20px rgba(100,200,255,0.3)",
                ],
              }}
              transition={{
                y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 3, repeat: Infinity },
              }}
            />

            {/* Animated border */}
            <motion.div
              className="absolute -inset-4 rounded-3xl opacity-75"
              style={{
                background:
                  "linear-gradient(45deg, #00d4ff, #0099cc, #0066ff, #00d4ff)",
                backgroundSize: "300% 300%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                y: [0, -8, 0],
              }}
              transition={{
                backgroundPosition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                },
                y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              }}
            />

            {/* Image container */}
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              animate={{
                y: [0, -4, 0],
                rotate: [0, 0.8, 0, -0.8, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={pfp}
                alt="Aman Shakya"
                className="w-full h-[400px] object-cover relative z-10"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-blue-900/60 via-transparent to-blue-900/30 z-20" />

              {/* Bubble particles */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-300 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${80 + Math.random() * 20}%`,
                    }}
                    animate={{
                      y: [0, -40],
                      opacity: [0, 1, 0],
                      scale: [0.3, 1],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 w-full max-w-sm"
          >
            <div className="flex space-x-6 justify-center items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-4 px-8">
              {[
                {
                  icon: faPhone,
                  link: "tel:+977-9818313576",
                  title: "Call",
                  color: "from-green-400 to-emerald-500",
                },
                {
                  icon: faGithub,
                  link: "https://github.com/amanshakya912",
                  title: "GitHub",
                  color: "from-purple-400 to-pink-500",
                },
                {
                  icon: faLinkedin,
                  link: "https://linkedin.com/in/amanshakya912",
                  title: "LinkedIn",
                  color: "from-blue-400 to-cyan-500",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.2, y: -8 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-linear-to-r ${social.color} opacity-0 group-hover:opacity-50 blur-xl transition-opacity`}
                  />
                  <div
                    className={`relative w-10 h-10 rounded-full bg-linear-to-br ${social.color} flex items-center justify-center shadow-lg`}
                  >
                    <FontAwesomeIcon
                      icon={social.icon}
                      className="text-white text-xl"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-blue-400 via-transparent to-transparent"></div>
    </div>
  );
};

export default About;
