"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { ThemeContext } from "@/context/ThemeContext";

export default function Intro() {
  const { theme, mounted } = useContext(ThemeContext);
  const isDark = mounted ? theme === "dark" : true;
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  const dismiss = useCallback(() => {
    setVisible(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const reveal = (delay) =>
    reduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 14, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={false}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03, filter: "blur(6px)" }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeInOut" }}
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-6 transition-colors duration-200 ${
            isDark ? "bg-[#0c0d0e]" : "bg-[#f9fafb]"
          }`}
        >
          <div
            className={`pointer-events-none absolute h-72 w-72 rounded-full blur-3xl ${
              isDark ? "bg-blue-500/10" : "bg-blue-400/10"
            }`}
          />

          <div className="relative w-full max-w-md text-center">
            <motion.p
              {...reveal(0.05)}
              className={`font-mono text-[11px] uppercase tracking-[0.25em] ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Portfolio · 2026
            </motion.p>

            <motion.div
              {...reveal(0.15)}
              className={`mt-5 text-4xl font-bold tracking-tight sm:text-5xl ${
                isDark ? "text-neutral-100" : "text-neutral-950"
              }`}
            >
              Navnath Kadam
            </motion.div>

            <motion.p
              {...reveal(0.25)}
              className={`mt-3 text-sm sm:text-base ${isDark ? "text-neutral-400" : "text-neutral-700"}`}
            >
              AI Systems Engineer | Backend &amp; Distributed Systems
            </motion.p>

            <motion.div {...reveal(0.35)} className="mt-9 flex justify-center">
              <button
                type="button"
                onClick={dismiss}
                aria-label="Enter portfolio"
                className={`group relative inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                  isDark
                    ? "bg-neutral-100 text-neutral-950 hover:bg-white"
                    : "bg-neutral-950 text-white hover:bg-neutral-800"
                }`}
              >
                <span>Enter Portfolio</span>
                <FaArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>

            <motion.p
              {...reveal(0.45)}
              className={`mt-4 font-mono text-[11px] ${isDark ? "text-neutral-600" : "text-neutral-400"}`}
            >
              click to view my work
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
