import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faJs,
  faPhp,
  faPython,
  faReact,
  faNodeJs,
  faHtml5,
  faCss3Alt,
  faBootstrap,
  faGitAlt,
  faDartLang,
  faFlutter,
  faDocker,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDatabase,
  faCogs,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";

// Define skill categories and types
type Skill = {
  name: string;
  icon: any; // FontAwesome icons do not have strict TypeScript types
};

const skills: Record<string, Skill[]> = {
  "Programming Languages": [
    { name: "JavaScript", icon: faJs },
    { name: "TypeScript", icon: faJs },
    { name: "PHP", icon: faPhp },
    { name: "Python", icon: faPython },
    { name: "Dart", icon: faDartLang },
  ],
  "Frontend Development": [
    { name: "React", icon: faReact },
    { name: "Next.js", icon: faReact },
    { name: "HTML", icon: faHtml5 },
    { name: "CSS", icon: faCss3Alt },
    { name: "Tailwind CSS", icon: faBootstrap },
  ],
  "Backend & API Development": [
    { name: "Django", icon: faPython },
    { name: "Node.js", icon: faNodeJs },
    { name: "Express.js", icon: faNodeJs },
    { name: "Laravel", icon: faPhp },
  ],
  "Mobile Application Development": [
    { name: "React Native", icon: faReact },
    { name: "Flutter", icon: faFlutter },
  ],
  "Tools & Platforms": [
    { name: "Git", icon: faGitAlt },
    { name: "Docker", icon: faDocker },
    { name: "Shopify", icon: faToolbox },
    { name: "Postman", icon: faDatabase },
    { name: "Electron", icon: faCogs },
    { name: "Vendure", icon: faToolbox },
  ],
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof skills>(
    "Programming Languages"
  );
  const drift = {
    animate: { y: [0, -4, 0] },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section id="Skills" className="py-16 bg-blue-950 relative overflow-hidden">

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-karla">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl text-center text-white mb-12 font-cormorant"
        >
          Skills
        </motion.h2>

        {/* Category Buoys */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(skills).map((category) => {
            const active = activeCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() =>
                  setActiveCategory(category as keyof typeof skills)
                }
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-6 py-2 rounded-full text-sm sm:text-base font-medium
                  backdrop-blur-md border transition-all duration-300 cursor-pointer
                  ${
                    active
                      ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.7)]"
                      : "bg-white/10 border-white/20 text-cyan-100 hover:bg-cyan-400/20"
                  }
                `}
              >
                {category}
              </motion.button>
            );
          })}
        </div>

        {/* Skill Reef Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {skills[activeCategory].map((skill, index) => (
            <motion.div
              key={skill.name}
              {...drift}
              transition={{ ...drift.transition, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="
                relative group cursor-pointer
                bg-white/10 backdrop-blur-lg
                border border-white/20
                rounded-2xl p-5
                flex flex-col items-center justify-center
                shadow-lg
              "
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

              <FontAwesomeIcon
                icon={skill.icon}
                className="relative z-10 text-4xl text-cyan-300 mb-3"
              />

              <p className="relative z-10 text-base sm:text-lg text-white text-center">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
