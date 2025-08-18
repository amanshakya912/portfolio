import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Experience {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

const experiences: Experience[] = [
  {
    title: "Frontend Developer Intern",
    company: "Outlines Research And Development PVT. LTD.",
    duration: "May 2023 - October 2023",
    responsibilities: [
      "Started with HTML, CSS, and JavaScript.",
      "Transitioned to React with TypeScript and JavaScript.",
      "Worked with Bootstrap and Tailwind CSS for CSS.",
    ],
  },
  {
    title: "Software Developer",
    company: "Outlines Research And Development PVT. LTD.",
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
    ],
  },
];

const Experience = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div
      id="Experience"
      className="py-16 bg-blue-950 flex items-center text-white bg-contain bg-no-repeat md:aspect-[16/9] aspect-[9/16] bg-[url('../src/assets/bg2_mob.png')] md:bg-[url('../src/assets/bg2.png')]"
    >
      <div className="w-full max-w-6xl px-6 mx-auto">
        <h2 className="text-3xl sm:text-4xl text-center mb-12 font-cormorant tracking-wide text-white">
          Experience
        </h2>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 w-1 bg-blue-800 h-full transform -translate-x-1/2"></div>

          <div className="space-y-12 font-karla">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0; // Alternating sides

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                  className={`relative flex items-start ${
                    isLeft ? "justify-start" : "justify-end"
                  } group`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 w-5 h-5 bg-blue-800 rounded-full transform -translate-x-1/2 border-4 border-blue-800 group-hover:scale-125 transition-all"></div>

                  {/* Experience Card */}
                  <motion.div
                    className={`relative bg-blue-900 p-6 rounded-lg shadow-lg w-full md:w-5/12 transition-all duration-300 cursor-pointer ${
                      expandedIndex === index
                        ? "scale-105 shadow-2xl"
                        : "hover:scale-105 hover:shadow-xl"
                    } ${isLeft ? "ml-auto" : "mr-auto"}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
                  >
                    <h3 className="text-xl font-semibold text-white">
                      {exp.title}
                    </h3>
                    <p className="text-white">
                      {exp.company} {exp.duration}
                    </p>

                    {/* Animated Details */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: expandedIndex === index ? "auto" : 0,
                        opacity: expandedIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden mt-3"
                    >
                      <ul className="mt-3 space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="flex items-start space-x-3"
                          >
                            <span className="text-gray-300 text-lg">
                              <FontAwesomeIcon icon={faArrowRight} />
                            </span>
                            <span className="text-gray-300 leading-relaxed">
                              {resp}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
