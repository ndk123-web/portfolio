"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { FaArrowUp, FaGithub } from "react-icons/fa";

export default function Footer() {
  const { theme, mounted } = useContext(ThemeContext);
  const isDark = mounted ? theme === "dark" : true;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`py-12 border-t transition-colors duration-200 ${
        isDark ? "bg-[#0c0d0e] border-[#22252a] text-neutral-400" : "bg-[#f9fafb] border-neutral-300 text-neutral-700"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        {/* Left: Identity & Copyright */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-neutral-950 dark:text-neutral-200">
            Navnath Kadam
          </span>
          <span>·</span>
          <span>© {new Date().getFullYear()}</span>
          <span>·</span>
          <span>AI Systems Engineer | Backend & Distributed Systems</span>
        </div>

        {/* Right: Last Updated & Back to top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Updated: August 2026</span>
          </div>

          <a
            href="https://github.com/ndk123-web"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-neutral-200 transition-colors flex items-center gap-1 font-medium"
          >
            <FaGithub className="w-3 h-3" />
            <span>GitHub</span>
          </a>

          <button
            onClick={scrollToTop}
            className={`p-1.5 rounded border transition-colors ${
              isDark
                ? "border-[#22252a] hover:border-neutral-600 hover:text-neutral-200"
                : "border-neutral-300 bg-white hover:border-neutral-500 hover:text-black shadow-sm"
            }`}
            title="Return to top"
            aria-label="Back to top"
          >
            <FaArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
