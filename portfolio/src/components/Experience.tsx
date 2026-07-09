import { useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronDown, faBriefcase } from "@fortawesome/free-solid-svg-icons";

interface Experience {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

const experiences: Experience[] = [
  {
    title: "Frontend Developer Intern",
    company: "Outlines Research And Development Pvt. Ltd.",
    duration: "May 2023 - October 2023",
    responsibilities: [
      "Started with HTML, CSS, and JavaScript.",
      "Transitioned to React with TypeScript and JavaScript.",
      "Worked with Bootstrap and Tailwind CSS for styling.",
    ],
  },
  {
    title: "Software Developer",
    company: "Outlines Research And Development Pvt. Ltd.",
    duration: "October 2023 - November 2024",
    responsibilities: [
      "Developed various websites using React, JavaScript, TypeScript, Tailwind CSS, and Bootstrap.",
      "Built an e-commerce website using Shopify.",
      "Integrated Jitsi Meet API in React projects.",
      "Migrated React JS applications to Next.js.",
      "Developed dynamic websites and RESTful APIs using Laravel.",
      "Worked on AI projects for face detection and object detection.",
    ],
  },
  {
    title: "Software Developer Intern",
    company: "Green Tick Nepal Pvt. Ltd.",
    duration: "March 2025 - July 2025",
    responsibilities: [
      "Developed and integrated REST APIs using Django, handling database interactions and connecting backend services with a Next.js frontend.",
      "Upgraded and maintained the Dark Web Monitoring (DWM) website, improving functionality and performance.",
      "Built a cross-platform mobile application for the DWM system using Flutter.",
      "Created dark web monitoring reports to detect and analyze potential breaches for specified domains.",
    ],
  },
  {
    title: "Software Developer",
    company: "Green Tick Nepal Pvt. Ltd.",
    duration: "July 2025 - Present",
    responsibilities: [
      "Maintained and enhanced the Dark Web Monitoring (DWM) website, implementing new features and improvements.",
      "Deployed and added new functionalities to the DWM mobile application using Kotlin.",
      "Identified and fixed security vulnerabilities reported through VAPT, strengthening application and website security.",
    ],
  },
];

const Experience = () => {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="Experience"
      ref={ref}
      className="relative py-20 md:py-28 bg-blue-950 caustic-sweep"
    >      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl text-center text-white mb-20 font-cormorant"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px]
            bg-gradient-to-b from-cyan-400/50 via-blue-500/20 to-transparent" />

          <div className="space-y-16">
            {[...experiences].reverse().map((exp, index) => {
              const isLeft = index % 2 === 0;
              const isOpen = open === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Beacon dot */}
                  <div className={`absolute top-6 z-10
                    ${isLeft ? 'left-6 md:left-1/2 -translate-x-1/2' : 'left-6 md:left-1/2 -translate-x-1/2'}`}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping" />
                      <div className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)]
                    ${isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'}`}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      onClick={() => setOpen(isOpen ? null : index)}
                      className="relative bg-white/[0.05] backdrop-blur-lg
                        border border-white/[0.1] rounded-2xl p-6
                        cursor-pointer hover:border-cyan-400/30
                        hover:bg-white/[0.07] transition-all duration-300
                        before:absolute before:inset-0 before:rounded-2xl
                        before:bg-gradient-to-br before:from-cyan-400/5 before:to-transparent
                        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-400/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FontAwesomeIcon icon={faBriefcase} className="text-cyan-300 text-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                          <p className="text-cyan-200/70 text-sm mt-0.5">{exp.company}</p>
                          <p className="text-white/30 text-xs mt-1">{exp.duration}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-xs text-cyan-300/70">
                        <span>{isOpen ? 'Collapse' : 'View details'}</span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FontAwesomeIcon icon={faChevronDown} className="text-[10px]" />
                        </motion.span>
                      </div>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-2.5 text-sm text-white/60 overflow-hidden font-karla"
                          >
                            {exp.responsibilities.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="flex gap-2.5"
                              >
                                <FontAwesomeIcon
                                  icon={faArrowRight}
                                  className="text-cyan-400/60 mt-1 text-[10px] flex-shrink-0"
                                />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;