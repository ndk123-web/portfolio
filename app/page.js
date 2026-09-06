"use client";

import { useRef } from "react";
import Header from "@/components/Header.jsx";
import Home from "@/components/Home.jsx";
import Projects from "@/components/Projects.jsx";
import Skills from "@/components/Skills.jsx";
import Experience from "@/components/Experience.jsx";
import About from "@/components/About.jsx";
import Contact from "@/components/Contact.jsx";
import Footer from "@/components/Footer.jsx";

export default function Main() {
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const skillRef = useRef(null);
  const experienceRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-[#0c0d0e] text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      <Header
        homeRef={homeRef}
        projectsRef={projectsRef}
        skillRef={skillRef}
        experienceRef={experienceRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
      />

      <main>
        <Home homeRef={homeRef} projectsRef={projectsRef} contactRef={contactRef} />
        <Projects projectsRef={projectsRef} />
        <Skills skillRef={skillRef} />
        <Experience experienceRef={experienceRef} />
        <About aboutRef={aboutRef} />
        <Contact contactRef={contactRef} />
      </main>

      <Footer />
    </div>
  );
}
