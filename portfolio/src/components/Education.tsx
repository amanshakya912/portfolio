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
    location: "Jawalakhel, Lalitpur",
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
    <section
      id="Education"
      className="relative py-14 md:py-20 bg-blue-950 bg-cover
      bg-[url('../src/assets/bg3mob.png')] md:bg-[url('../src/assets/bg3.png')]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl text-center text-white mb-16 font-cormorant"
        >
          Education
        </motion.h2>

        {/* Timeline */}
        <div className="relative pl-10 space-y-12">
          {/* Ocean line */}
          <div className="absolute left-[18px] top-0 h-full w-[3px] rounded-full bg-linear-to-b from-cyan-400/60 via-blue-500/40 to-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />

          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Icon */}
              <div className="absolute -left-[2.7rem] top-6">
                <div className="w-12 h-12 rounded-full bg-blue-900 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.7)]">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className="text-cyan-300 text-lg"
                  />
                </div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="
                  bg-white/95 backdrop-blur-md
                  border border-white/30
                  rounded-2xl p-6 sm:p-7
                  shadow-lg hover:shadow-cyan-500/20
                  font-karla
                "
              >
                <p className="text-cyan-700 text-sm font-medium">
                  {edu.year}
                </p>

                <h3 className="text-lg sm:text-xl font-semibold text-blue-900 mt-1">
                  {edu.degree}
                </h3>

                <p className="text-gray-700 text-sm sm:text-base">
                  {edu.college}
                </p>

                <p className="text-gray-500 text-xs sm:text-sm">
                  {edu.location}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
