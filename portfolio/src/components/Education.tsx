import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

const educationData = [
  {
    year: "2082",
    degree: "Bachelor’s in Computer Science & IT",
    college: "Academia International College",
    location: "Gwarko, Lalitpur",
  },
  {
    year: "2077",
    degree: "+2 in Science",
    college: "St. Xavier’s School",
    location: "Jawalakhel,  Lalitpur",
  },
  {
    year: "2074",
    degree: "S.E.E.",
    college: "Innovative English School",
    location: "Buddhanagar, Kathmandu",
  },
];

const Education = () => {
  return (
    <div id="Education" className="py-12 md:py-16 bg-blue-950 bg-cover md:aspect-[16/9] aspect-[9/16] bg-[url('../src/assets/bg3mob.png')] md:bg-[url('../src/assets/bg3.png')]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl text-center text-white mb-10 font-cormorant">
          Education
        </h2>

        <div className="relative border-l-4 border-blue-800 pl-6 space-y-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              className="relative bg-white shadow-md rounded-xl p-5 sm:p-6 md:p-7 hover:shadow-2xl transition-all duration-300 font-karla cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="absolute -left-8 sm:-left-10 top-1/2 transform -translate-y-1/2 bg-blue-800 text-white p-3 sm:p-4 rounded-full">
                <FontAwesomeIcon icon={faGraduationCap} size="lg" />
              </div>

              {/* Text Content */}
              <p className="text-gray-600 text-sm sm:text-base">{edu.year}</p>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-900">
                {edu.degree}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {edu.college}
              </p>
              {edu.location && (
                <p className="text-gray-500 text-xs sm:text-sm">
                  {edu.location}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
