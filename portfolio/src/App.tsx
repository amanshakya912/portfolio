import { BrowserRouter, Routes, Route } from "react-router";
import HomeScreen from "./components/HomeScreen";
import Header from "./components/Header";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ThreeJSPage from "./components/ThreeJS";

const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomeScreen />
                <About />
                <Education />
                <Skills />
                <Experience />
                <Projects />
                <Contact />
              </>
            }
          />

          <Route path="/threejs" element={<ThreeJSPage />} />
        </Routes>
      </BrowserRouter>

      <ScrollToTopButton />
    </>
  );
};

export default App;
