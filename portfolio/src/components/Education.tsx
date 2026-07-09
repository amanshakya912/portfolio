import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const educationData = [
  { year: "2082", degree: "Bachelor's in Computer Science & IT", college: "Academia International College", location: "Gwarko, Lalitpur" },
  { year: "2077", degree: "+2 in Science", college: "St. Xavier's School", location: "Jawalakhel, Lalitpur" },
  { year: "2074", degree: "S.E.E.", college: "Innovative English School", location: "Buddhanagar, Kathmandu" },
];

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="Education" ref={ref} className="relative py-20 md:py-28 bg-blue-950 caustic-sweep">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center text-white mb-16 font-cormorant"
        >
          Education
        </motion.h2>

        <div className="relative pl-12 md:pl-16 space-y-14">
          {/* Timeline line */}
          <div className="absolute left-[18px] md:left-[22px] top-0 h-full w-[2px]
            bg-gradient-to-b from-cyan-400/60 via-blue-500/30 to-cyan-400/10" />

          {/* Animated coral dots along line */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="absolute left-[14px] md:left-[18px] w-[10px] h-[10px] rounded-full
                bg-cyan-400/20"
              style={{ top: `${8 + i * 12.5}%` }}
            />
          ))}

          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="relative group"
            >
              {/* Node */}
              <div className="absolute -left-[2.55rem] md:-left-[3.1rem] top-5">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-11 h-11 md:w-12 md:h-12 rounded-full
                    bg-gradient-to-br from-blue-900 to-blue-950
                    border-2 border-cyan-400/50
                    flex items-center justify-center
                    shadow-[0_0_20px_rgba(34,211,238,0.5)]
                    group-hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]
                    transition-shadow duration-300"
                >
                  <FontAwesomeIcon icon={faGraduationCap} className="text-cyan-300 text-base md:text-lg" />
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -5, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-white/[0.06] backdrop-blur-lg
                  border border-white/[0.1] rounded-2xl p-6 md:p-7
                  hover:border-cyan-400/30 hover:bg-white/[0.08]
                  transition-all duration-300 font-karla
                  before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br
                  before:from-cyan-400/5 before:to-transparent before:opacity-0
                  group-hover:before:opacity-100 before:transition-opacity before:pointer-events-none"
              >
                <span className="inline-block px-3 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-medium mb-3">
                  {edu.year}
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {edu.degree}
                </h3>
                <p className="text-cyan-100/70 text-sm md:text-base mt-1">{edu.college}</p>
                <p className="text-white/40 text-xs mt-1">{edu.location}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;