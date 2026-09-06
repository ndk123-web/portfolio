"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaNpm, FaArrowRight } from "react-icons/fa";

export default function Home({ homeRef, projectsRef, contactRef }) {
  const { theme, mounted } = useContext(ThemeContext);
  const isDark = mounted ? theme === "dark" : true;

  return (
    <section
      ref={homeRef}
      className={`pt-24 sm:pt-28 pb-14 sm:pb-16 transition-colors duration-200 ${
        isDark ? "bg-[#0c0d0e] text-neutral-100" : "bg-[#f9fafb] text-neutral-950"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Top meta status */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[11px] sm:text-xs font-mono text-neutral-700 dark:text-neutral-400">
            Open to software engineering roles & backend systems work
          </span>
        </div>

        {/* Main 2-Column Hero: Bio + Prominent Portrait */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Main Bio: 7 cols */}
          <div className="md:col-span-7 space-y-4 order-2 md:order-1 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-neutral-950 dark:text-neutral-100">
              Navnath Kadam
            </h1>

            <p className="text-base sm:text-lg font-medium text-neutral-900 dark:text-neutral-200 leading-snug">
              Backend-focused Software Engineer building distributed systems, developer tools, and AI-integrated applications.
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-neutral-800 dark:text-neutral-300 max-w-xl mx-auto md:mx-0">
              I specialize in backend architecture, real-time networking, and systems-level tooling. 
              Creator of open-source CLI utilities in Go and distributed RPC engines on npm. Experienced 
              in designing resilient services with Go, Node.js, PostgreSQL, and Redis.
            </p>

            {/* Direct Action Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 pt-2">
              <button
                onClick={() => projectsRef?.current?.scrollIntoView({ behavior: "smooth" })}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isDark
                    ? "bg-neutral-100 text-neutral-950 hover:bg-white"
                    : "bg-neutral-950 text-white hover:bg-neutral-800"
                }`}
              >
                <span>Explore Projects</span>
                <FaArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => contactRef?.current?.scrollIntoView({ behavior: "smooth" })}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                  isDark
                    ? "border-[#22252a] bg-[#131518] text-neutral-200 hover:border-neutral-500 hover:text-white"
                    : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 shadow-sm"
                }`}
              >
                Get in Touch
              </button>

              <div className="flex items-center gap-2 pt-1 sm:pt-0">
                <a
                  href="https://github.com/ndk123-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isDark
                      ? "border-[#22252a] text-neutral-400 hover:text-neutral-100 hover:bg-[#181a1f]"
                      : "border-neutral-300 text-neutral-800 hover:text-black hover:bg-neutral-100"
                  }`}
                  aria-label="GitHub Profile"
                  title="GitHub: @ndk123-web"
                >
                  <FaGithub className="w-4 h-4" />
                </a>

                <a
                  href="https://www.linkedin.com/in/navnath-kadam-883a57288/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isDark
                      ? "border-[#22252a] text-neutral-400 hover:text-neutral-100 hover:bg-[#181a1f]"
                      : "border-neutral-300 text-neutral-800 hover:text-black hover:bg-neutral-100"
                  }`}
                  aria-label="LinkedIn Profile"
                  title="LinkedIn: Navnath Kadam"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>

                <a
                  href="https://www.npmjs.com/~ndk18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isDark
                      ? "border-[#22252a] text-neutral-400 hover:text-neutral-100 hover:bg-[#181a1f]"
                      : "border-neutral-300 text-neutral-800 hover:text-black hover:bg-neutral-100"
                  }`}
                  aria-label="npm Packages"
                  title="npm: ~ndk18"
                >
                  <FaNpm className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Prominent, Well-Proportioned Portrait (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-end justify-center order-1 md:order-2">
            <div
              className={`w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border shadow-sm ${
                isDark ? "border-[#22252a] bg-[#131518]" : "border-neutral-300 bg-white"
              }`}
            >
              <Image
                src="/myImage.jpg"
                alt="Navnath Kadam"
                width={300}
                height={300}
                priority
                className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="mt-2 text-center md:text-right">
              <span className="text-[11px] sm:text-xs font-mono text-neutral-600 dark:text-neutral-400">
                Mumbai, India · UTC+5:30
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
