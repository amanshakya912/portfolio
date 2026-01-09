import HomeScreen from "./components/HomeScreen";
import Header from "./components/Header";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { BrowserRouter } from "react-router";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { OceanDivingCanvas, WaterRippleOverlay } from "./components/OceanEffects";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <OceanDivingCanvas />
        <WaterRippleOverlay />
        
        <style>{`
          .water-ripple {
            background: 
              radial-gradient(ellipse at 20% 30%, rgba(100, 200, 255, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(100, 200, 255, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(100, 200, 255, 0.05) 0%, transparent 70%);
            animation: ripple 8s ease-in-out infinite;
          }

          @keyframes ripple {
            0%, 100% {
              transform: scale(1) translateY(0);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.1) translateY(-20px);
              opacity: 0.5;
            }
          }

          .water-ripple::before {
            content: '';
            position: absolute;
            inset: 0;
            background: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            );
            animation: distort 3s linear infinite;
          }

          @keyframes distort {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(4px);
            }
          }
        `}</style>

        <Header />
        <HomeScreen />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </BrowserRouter>
      <ScrollToTopButton/>
    </>
  );
};

export default App;