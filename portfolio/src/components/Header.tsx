import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 right-0 z-50 w-full bg-transparent">
      <div className="container mx-auto flex justify-between items-center p-5">
        <div className="text-2xl text-blue-950 font-cormorant py-1">ADTS</div>

        <nav className="hidden md:flex space-x-4 text-lg text-blue-950 font-karla">
          {[
            "About",
            "Education",
            "Skills",
            "Experience",
            "Projects",
            "Contact",
          ].map((item) => (
            <HashLink
              to={`/#${item}`}
              smooth
              key={item}
              className="list-none px-4 py-1 cursor-pointer hover:bg-blue-950 hover:text-white border-0 rounded-full"
            >
              {item}
            </HashLink>
          ))}
        </nav>

        <button
          className={`md:hidden text-3xl focus:outline-none z-50`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <FontAwesomeIcon className="text-white" icon={faX} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
      </div>

      <motion.nav
        initial={{ x: "100%" }} // Start from right
        animate={{ x: isOpen ? "0%" : "100%" }} // Slide in when open
        exit={{ x: "-100%" }} // Slide out to left when closing
        transition={{ type: "tween", duration: 0.5 }} // Smooth animation
        className="md:hidden fixed top-0 left-0 w-full h-screen bg-blue-950 shadow-lg z-40 flex items-center justify-center"
      >
        <ul className="flex flex-col items-center space-y-4 p-4 text-lg text-white font-karla">
          {[
            "About",
            "Education",
            "Skills",
            "Experience",
            "Projects",
            "Contact",
          ].map((item) => (
            <HashLink
              to={`/#${item}`}
              smooth
              key={item}
              onClick={()=>setIsOpen(false)}
              className="px-5 py-2 cursor-pointer hover:bg-white hover:text-blue-950 border-0 rounded-full"
            >
              {item}
            </HashLink>
          ))}
        </ul>
      </motion.nav>
    </header>
  );
};

export default Header;
