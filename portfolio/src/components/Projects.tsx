import { useState, useRef } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLink, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useInView } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import login1 from "../assets/login.jpg";
import reg1 from "../assets/reg.jpg";
import hp from "../assets/hp.jpg";
import hp1 from "../assets/hp1.jpg";
import hp2 from "../assets/hp2.jpg";
import hp3 from "../assets/hp3.jpg";
import ca1 from "../assets/ca1.jpg";
import ca2 from "../assets/ca2.jpg";
import ca2_1 from "../assets/ca2_1.jpg";
import ca3 from "../assets/ca3.jpg";
import ca4 from "../assets/ca4.jpg";
import ca4_1 from "../assets/ca4_1.jpg";
import ca5 from "../assets/ca5.jpg";
import ba1 from "../assets/ba1.jpg";
import ba2 from "../assets/ba2.jpg";
import pd1 from "../assets/pd.jpg";
import pd2 from "../assets/pd2.jpg";
import pd3 from "../assets/pd3.jpg";

interface Project {
  name: string;
  description: string;
  website?: string;
  github?: string;
  screenshots?: string[];
}

const projects: Record<string, Project[]> = {
  "Personal Projects": [
    {
      name: "Online Auction System (MERN)",
      description: "An online auction platform implementing a price prediction algorithm.",
      website: "https://online-auction-system-tjot.vercel.app/",
      github: "https://github.com/amanshakya912/online-auction-system",
    },
    {
      name: "Online Auction App (React Native)",
      description: "A mobile auction system built with React Native & TypeScript.",
      github: "https://github.com/amanshakya912/oas-app",
      screenshots: [login1, reg1, hp, hp1, hp2, hp3, ca1, ca2, ca2_1, ca3, ca4, ca4_1, ca5, ba1, ba2, pd1, pd2, pd3],
    },
  ],
  "Professional Projects": [
    { name: "GKavach DWM", description: "Dark Web Monitoring website built using Django and Next.js", website: "https://dwm.gkavach.com/" },
    { name: "GKavach DWM (Mobile)", description: "Dark Web Monitoring mobile application built using Flutter", website: "https://play.google.com/store/apps/details?id=com.gkavach.gkavach_dwm" },
    { name: "Lion's Club", description: "A social club website developed using React and Laravel.", website: "https://ktmudaya.org/" },
    // { name: "Hope Fertility & Diagnostics", description: "Doctor booking and appointment website built using Next.js and Laravel.", website: "https://hopefd.com.np/" },
    { name: "Siddhartha Cable Car", description: "Website for Siddhartha Cable Car built in Laravel framework.", website: "https://siddharthacablecar.com.np/" },
    { name: "Patan Museum Festivals", description: "Festivals Calendar website built using React", website: "https://www.patanmuseum.gov.np/museum-calendar/" },
  ],
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("Personal Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  return (
    <section
      id="Projects"
      ref={ref}
      className="relative bg-blue-950 text-white py-20"
    >
      <div className="absolute inset-0 bg-blue-950/70" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl text-center font-cormorant"
        >
          Projects
        </motion.h2>

        <div className="mx-auto my-6 h-0.5 w-28 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        <div className="flex justify-center gap-6 mb-10 font-karla">
          {Object.keys(projects).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-lg transition-all cursor-pointer
                ${activeTab === tab
                  ? "text-cyan-300 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-cyan-300 after:to-blue-400"
                  : "text-blue-200 hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-karla">
          {projects[activeTab].map((proj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative rounded-2xl p-px
                bg-gradient-to-br from-blue-400/30 via-cyan-300/10 to-transparent"
            >
              <div className="relative h-full rounded-2xl bg-blue-950/85
                backdrop-blur-lg border border-blue-800/50
                p-6 flex flex-col text-center">
                <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition
                  bg-gradient-to-tr from-cyan-400/10 via-transparent to-transparent" />

                <h4 className="text-xl font-semibold text-blue-100 mb-2 relative z-10">
                  {proj.name}
                </h4>
                <p className="text-sm text-blue-200/80 mb-6 leading-relaxed relative z-10">
                  {proj.description}
                </p>

                <div className="flex justify-center gap-6 mt-auto text-lg relative z-10">
                  {proj.website && (
                    <a
                      href={proj.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-300 transition cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faExternalLink} />
                    </a>
                  )}
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  )}
                  {proj.screenshots && (
                    <button
                      onClick={() => openModal(proj)}
                      className="hover:text-blue-400 transition cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-[100] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/70" />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative bg-blue-950/90 backdrop-blur-xl
            border border-blue-800/60 rounded-2xl
            p-5 w-full max-w-lg shadow-2xl"
        >
          <h3 className="text-lg mb-4 text-center text-white">
            {selectedProject?.name}
          </h3>
          <Swiper navigation modules={[Navigation]} className="h-[70vh]">
            {selectedProject?.screenshots?.map((src: string, i: number) => (
              <SwiperSlide key={i} className="flex items-center justify-center">
                <img
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  className="max-h-full rounded-xl object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full py-2 rounded-lg
              bg-blue-800 hover:bg-blue-600 transition text-white cursor-pointer"
          >
            Close
          </button>
        </motion.div>
      </Dialog>
    </section>
  );
};

export default Projects;