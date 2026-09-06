"use client";

import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { HiMenu, HiX } from "react-icons/hi";
import { HiMoon, HiSun } from "react-icons/hi2";
import { FaFileAlt } from "react-icons/fa";

import Image from "next/image";

export default function Header({
  skillRef,
  homeRef,
  projectsRef,
  aboutRef,
  experienceRef,
  contactRef,
}) {
  const { theme, setTheme, mounted } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const isDark = mounted ? theme === "dark" : true;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section spy
      const sections = [
        { name: "Home", ref: homeRef },
        { name: "Projects", ref: projectsRef },
        { name: "Skills", ref: skillRef },
        { name: "Experience", ref: experienceRef },
        { name: "About", ref: aboutRef },
        { name: "Contact", ref: contactRef },
      ];

      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        if (section.ref?.current) {
          const top = section.ref.current.offsetTop;
          const height = section.ref.current.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [homeRef, projectsRef, skillRef, experienceRef, aboutRef, contactRef]);

  const scrollTo = (ref, name) => {
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(name);
    setIsOpen(false);
  };

  const navItems = [
    { name: "Projects", ref: projectsRef },
    { name: "Skills", ref: skillRef },
    { name: "Experience", ref: experienceRef },
    { name: "About", ref: aboutRef },
    { name: "Contact", ref: contactRef },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
        scrolled
          ? isDark
            ? "bg-[#0c0d0e]/95 border-[#22252a] backdrop-blur-md"
            : "bg-[#f9fafb]/95 border-[#e5e7eb] backdrop-blur-md"
          : isDark
          ? "bg-[#0c0d0e] border-transparent"
          : "bg-[#f9fafb] border-transparent"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Circular Avatar Image & Name */}
        <button
          onClick={() => scrollTo(homeRef, "Home")}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 flex-shrink-0 shadow-sm">
            <Image
              src="/myImage.jpg"
              alt="Navnath Kadam"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className={`text-sm font-semibold tracking-tight transition-colors ${
              isDark ? "text-neutral-200 group-hover:text-white" : "text-neutral-900 group-hover:text-neutral-700"
            }`}
          >
            Navnath Kadam
          </span>
        </button>

        {/* Right: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.name;
            return (
              <button
                key={item.name}
                onClick={() => scrollTo(item.ref, item.name)}
                className={`text-sm transition-colors focus:outline-none ${
                  isActive
                    ? isDark
                      ? "text-blue-400 font-semibold"
                      : "text-blue-600 font-semibold"
                    : isDark
                    ? "text-neutral-400 hover:text-neutral-200 font-medium"
                    : "text-neutral-700 hover:text-neutral-950 font-medium"
                }`}
              >
                {item.name}
              </button>
            );
          })}

          <div
            className={`w-px h-4 ${isDark ? "bg-[#22252a]" : "bg-[#e5e7eb]"}`}
          />

          {/* Resume link */}
          <a
            href="/v6_resume_sde.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-md border transition-colors ${
              isDark
                ? "border-[#2e333b] text-neutral-300 hover:bg-[#181a1f] hover:border-neutral-600"
                : "border-[#d1d5db] text-neutral-700 hover:bg-neutral-100 hover:border-neutral-400"
            }`}
          >
            <FaFileAlt className="w-3 h-3 text-neutral-400" />
            <span>resume</span>
          </a>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-1.5 rounded-md transition-colors focus:outline-none ${
              isDark
                ? "text-neutral-400 hover:text-neutral-200 hover:bg-[#181a1f]"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
            }`}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-1.5 rounded-md ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <HiSun className="w-4 h-4" /> : <HiMoon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-1.5 rounded-md focus:outline-none ${
              isDark ? "text-neutral-300 hover:bg-[#181a1f]" : "text-neutral-700 hover:bg-neutral-100"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {isOpen && (
        <div
          className={`md:hidden px-6 py-4 border-b ${
            isDark ? "bg-[#0c0d0e] border-[#22252a]" : "bg-[#f9fafb] border-[#e5e7eb]"
          }`}
        >
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.ref, item.name)}
                className={`text-left text-sm py-1.5 font-medium transition-colors ${
                  activeSection === item.name
                    ? isDark
                      ? "text-blue-400 font-semibold"
                      : "text-blue-600 font-semibold"
                    : isDark
                    ? "text-neutral-400"
                    : "text-neutral-800 hover:text-black"
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-2 border-t border-neutral-200 dark:border-[#22252a] flex items-center justify-between">
              <a
                href="/v6_resume_sde.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-blue-400 flex items-center gap-1.5"
              >
                <FaFileAlt className="w-3 h-3" /> Download Resume PDF
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
