import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

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
      "Worked with Bootstrap and Tailwind CSS for CSS.",
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
    title: "Software Developer intern",
    company: "Green Tick Nepal Pvt. Ltd.",
    duration: "March 2025 - July 2025",
    responsibilities: [
      "Developed and integrated REST APIs using Django, handling database interactions and connecting backend services with a Next.js frontend",
      "Upgraded and maintained the Dark Web Monitoring (DWM) website, improving functionality and performance.",
      "Built a cross-platform mobile application for the DWM system using Flutter, enhancing accessibility for users.",
      "Created dark web monitoring reports to detect and analyze potential breaches for specified domains.",
    ],
  },
  {
    title: "Software Developer",
    company: "Green Tick Nepal Pvt. Ltd.",
    duration: "July 2025 - Present",
    responsibilities: [
      "Maintained and enhanced the Dark Web Monitoring (DWM) website, implementing new features and improvements for better performance and usability. ",
      "Deployed and added new functionalities to the DWM mobile application, further enhancing the app’s capabilities using Kotlin.",
      "Identified and fixed security vulnerabilities reported through VAPT, strengthening application and website security."
    ],
  },
];


const Experience = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="Experience"
      className="relative py-24 bg-blue-950 text-white
      bg-contain bg-no-repeat
      bg-[url('../src/assets/bg2_mob.png')] md:bg-[url('../src/assets/bg2.png')]"
    >
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl text-center mb-24 font-cormorant"
        >
          Experience
        </motion.h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical current */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5
            bg-linear-to-b from-cyan-400/0 via-cyan-400/60 to-cyan-400/0
            hidden md:block"
          />

          <div className="space-y-28">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const isOpen = open === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative flex md:items-center"
                >
                  {/* Beacon */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-30 animate-ping" />
                      <div className="w-4 h-4 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                    </div>
                  </div>

                  {/* Card wrapper */}
                  <div
                    className={`w-full md:w-1/2 ${
                      isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -6 }}
                      onClick={() =>
                        setOpen(isOpen ? null : index)
                      }
                      className="
                        relative bg-white/10 backdrop-blur-lg
                        border border-white/20
                        rounded-2xl p-6
                        cursor-pointer
                        shadow-lg hover:shadow-cyan-500/30
                        transition-all
                      "
                    >
                      {/* Soft glow */}
                      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-400/10 to-blue-600/10 opacity-0 hover:opacity-100 transition-opacity" />

                      <h3 className="text-xl font-semibold">
                        {exp.title}
                      </h3>

                      <p className="text-cyan-200 text-sm mt-1">
                        {exp.company}
                      </p>

                      <p className="text-gray-300 text-xs">
                        {exp.duration}
                      </p>

                      {/* Expand affordance */}
                      <div className="mt-5 flex items-center justify-between text-sm text-cyan-300">
                        <span>
                          {isOpen ? "Hide details" : "Explore role"}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FontAwesomeIcon icon={faChevronDown} />
                        </motion.span>
                      </div>

                      {/* Expand content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35 }}
                            className="mt-4 space-y-3 text-sm text-gray-300 overflow-hidden"
                          >
                            {exp.responsibilities.map((item, i) => (
                              <li key={i} className="flex gap-3">
                                <FontAwesomeIcon
                                  icon={faArrowRight}
                                  className="text-cyan-300 mt-1"
                                />
                                <span>{item}</span>
                              </li>
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


