import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pfp from "../assets/UEoFR6mP.jpg";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div
      id="About"
      className="relative flex items-center justify-center bg-blue-950 w-full bg-cover md:aspect-[16/9] aspect-[9/16] bg-[url('../src/assets/bg1mob.png')] md:bg-[url('../src/assets/bg1_2.png')] "
    >
      <div className="z-50 grid md:grid-cols-6 grid-cols-1 px-5 w-full gap-10">
        {/* About Me Text Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="md:col-span-3 lg:col-span-4"
        >
          <h2 className="text-white font-cormorant text-3xl mb-4">About Me</h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white font-karla text-justify"
          >
            <b>Hi there, I am Aman Shakya</b>, an enthusiastic, ambitious, and
            diligent B.Sc. CSIT student with a strong passion for learning and
            skill development. My journey into the tech world began with web
            development, where I gained hands-on experience working with React
            using JavaScript and TypeScript. Currently, I am expanding my expertise in various fields, including mobile app development by building applications with React Native, and full-stack web development using the MERN stack. <br /> I am always eager to take on
            new challenges, committed to delivering my best while continuously
            learning and growing through every opportunity that comes my way.
          </motion.p>
        </motion.div>

        {/* Profile Picture Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="md:col-span-3 lg:col-span-2 relative flex flex-col items-center"
        >
          <motion.img
            src={pfp}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(0, 0, 255, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-4 w-full"
          >
            <div className="flex space-x-6 justify-center">
              {[
                { icon: faPhone, link: "tel:+977-9818313576", title: "Call at +977-9818313576" },
                {
                  icon: faGithub,
                  link: "https://github.com/amanshakya912",
                  title: "GitHub",
                },
                {
                  icon: faLinkedin,
                  link: "https://linkedin.com/in/amanshakya912",
                  title: "LinkedIn",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  title={social.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xl hover:text-blue-400 transition-all"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-transparent to-transparent"></div>
    </div>
  );
};

export default About;
