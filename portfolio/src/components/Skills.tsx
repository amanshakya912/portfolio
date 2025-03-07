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
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faCogs, faToolbox } from "@fortawesome/free-solid-svg-icons";

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
  ],
  "Frontend Development": [
    { name: "React", icon: faReact },
    { name: "Next.js", icon: faReact },
    { name: "React Native", icon: faReact },
    { name: "HTML", icon: faHtml5 },
    { name: "CSS", icon: faCss3Alt },
    { name: "Tailwind CSS", icon: faBootstrap },
  ],
  "Backend & API Development": [
    { name: "Node.js", icon: faNodeJs },
    { name: "Express.js", icon: faNodeJs },
    { name: "Laravel", icon: faPhp },
  ],
  "Tools & Platforms": [
    { name: "Git", icon: faGitAlt },
    { name: "Shopify", icon: faToolbox },
    { name: "Postman", icon: faDatabase },
    { name: "Electron", icon: faCogs },
  ],
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof skills>(
    "Programming Languages"
  );

  return (
    <div id="Skills" className="py-16 bg-blue-950 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 font-karla">
        <h2 className="text-3xl sm:text-4xl text-center text-white mb-10 font-cormorant">
          Skills
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.keys(skills).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as keyof typeof skills)}
              className={`px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? "bg-blue-900 text-white"
                  : "bg-gray-200 text-blue-900 hover:bg-blue-700 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {skills[activeCategory].map((skill) => (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.1 }}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <FontAwesomeIcon icon={skill.icon} className="text-4xl text-blue-800 mb-2" />
              <p className="text-lg text-blue-900">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
