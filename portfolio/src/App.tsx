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
        {/* <DepthMeter /> */}

        <style>{`
          .water-ripple {
            background:
              radial-gradient(ellipse at 20% 30%, rgba(100, 200, 255, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(100, 200, 255, 0.06) 0%, transparent 50%);
            animation: ripple 10s ease-in-out infinite;
          }
          @keyframes ripple {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.04); opacity: 0.4; }
          }
          .water-ripple::before {
            content: '';
            position: absolute;
            inset: 0;
            background: repeating-linear-gradient(
              0deg, transparent, transparent 3px,
              rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 6px
            );
            animation: distort 4s linear infinite;
          }
          @keyframes distort {
            0% { transform: translateY(0); }
            100% { transform: translateY(6px); }
          }

          @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          .text-shimmer {
            background: linear-gradient(
              90deg,
              rgba(255,255,255,0.85) 0%,
              rgba(34,211,238,1) 25%,
              rgba(255,255,255,0.85) 50%,
              rgba(34,211,238,1) 75%,
              rgba(255,255,255,0.85) 100%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 6s linear infinite;
          }

          .porthole {
            border-radius: 50%;
            border: 5px solid rgba(120, 180, 220, 0.35);
            box-shadow:
              inset 0 0 30px rgba(0,0,0,0.35),
              0 0 20px rgba(34,211,238,0.15),
              0 0 60px rgba(34,211,238,0.08);
            position: relative;
          }
          .porthole::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: linear-gradient(
              135deg,
              rgba(255,255,255,0.12) 0%,
              transparent 35%,
              transparent 65%,
              rgba(0,0,0,0.15) 100%
            );
            pointer-events: none;
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
      <ScrollToTopButton />
    </>
  );
};

export default App;