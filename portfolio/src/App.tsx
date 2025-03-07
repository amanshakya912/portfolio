// import React from "react";
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

const App = () => {
  return (
    <>
      <BrowserRouter>
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
