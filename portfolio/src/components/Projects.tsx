import { useState } from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faExternalLink,
  faDownload,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import login1 from "../assets/login.jpg"

interface Project {
  name: string;
  description: string;
  website?: string;
  github?: string;
  apk?: string;
  screenshots?: string[];
}

const projects: Record<string, Project[]> = {
  "Personal Projects": [
    {
      name: "Online Auction System (MERN)",
      description:
        "An online auction platform implementing a price prediction algorithm.",
      website: "https://online-auction-system-tjot.vercel.app/",
      github: "https://github.com/amanshakya912/online-auction-system",
      // screenshots: ["/images/auction1.png", "/images/auction2.png"],
    },
    {
      name: "Online Auction App (React Native)",
      description:
        "A mobile auction system built with React Native & TypeScript.",
      github: "https://github.com/amanshakya912/oas-app",
      //   apk: "/path-to-apk-file.apk",
      screenshots: [login1, "../src/assets/reg.jpg", "../src/assets/hp.jpg","../src/assets/hp1.jpg","../src/assets/hp2.jpg", "../src/assets/hp3.jpg","../src/assets/ca1.jpg", "../src/assets/ca2.jpg","../src/assets/ca2_1.jpg", "../src/assets/ca3.jpg", "../src/assets/ca4.jpg", "../src/assets/ca4_1.jpg", "../src/assets/ca5.jpg", "../src/assets/ba1.jpg","../src/assets/ba2.jpg","../src/assets/pd.jpg","../src/assets/pd2.jpg", "../src/assets/pd3.jpg",],
    },
  ],
  "Professional Projects": [
    {
      name: "Lion's Club",
      description: "A social club website developed using React and Laravel.",
      website: "https://ktmudaya.org/",
    },
    {
      name: "Hope Fertility & Diagnostics",
      description: "Doctor booking and appointment website built using Next.js and Laravel.",
      website: "https://hopefd.com.np/",
    },
    {
      name: "Siddhartha Cable Car",
      description: "Website for Siddhartha Cable Car built in Laravel framework.",
      website: "https://siddharthacablecar.com.np/",
    },
    {
      name: "Patan Museum Festivals Calendar",
      description: "Festivals Calendar website built using React",
      website: "https://www.patanmuseum.gov.np/museum-calendar/",
    },
  ],
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("Personal Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  return (
    <div id="Projects" className=" py-16 bg-blue-950 text-white md:bg-cover bg-contain bg-no-repeat md:aspect-[16/9] aspect-[9/16] bg-[url('../src/assets/bg4mob.png')] md:bg-[url('../src/assets/bg4.png')]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl text-center mb-10 font-cormorant">Projects</h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6 border-b border-blue-900 font-karla">
          {Object.keys(projects).map((tab) => (
            <button
              key={tab}
              className={`cursor-pointer px-4 py-2 text-lg transition-all ${
                activeTab === tab
                  ? "border-b-2 border-blue-400 text-blue-400"
                  : "text-white hover:text-gray-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-karla">
          {projects[activeTab].map((proj, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer bg-blue-900 p-6 rounded-lg shadow-md flex flex-col items-center transition-all hover:shadow-lg"
            >
              <h4 className="text-xl font-semibold mb-2">{proj.name}</h4>
              <p className="text-white text-sm text-center mb-4">
                {proj.description}
              </p>

              <div className="flex space-x-4">
                {proj.website && (
                  <a
                    href={proj.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={proj.website}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <FontAwesomeIcon icon={faExternalLink} />
                  </a>
                )}
                {proj.github && (
                  <a
                    href={proj.github}
                    title={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                )}
                {proj.apk && (
                  <a
                    href={proj.apk}
                    download
                    className="text-green-400 hover:text-green-300"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </a>
                )}
                {proj.screenshots && (
                  <button
                    title="Preview"
                    onClick={() => openModal(proj)}
                    className="text-white hover:text-blue-400 cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal with Swiper Slider */}
      {selectedProject && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 p-5 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg"
          >
            <h3 className="text-lg sm:text-xl mb-4 text-white font-karla text-center">
              {selectedProject.name}
            </h3>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="w-full h-[65vh] sm:h-[70vh] md:h-[75vh] flex items-center justify-center"
            >
              {selectedProject.screenshots?.map((src, i) => (
                <SwiperSlide
                  key={i}
                  className="flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt={`Screenshot ${i + 1}`}
                    className="w-auto h-full max-h-full object-contain rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-800 hover:bg-blue-600 rounded-lg w-full sm:w-auto text-white cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </Dialog>
      )}
    </div>
  );
};

export default Projects;
