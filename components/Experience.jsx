"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const experiences = [
  {
    role: "AI Automation Intern",
    company: "Autonova AI",
    period: "May 2026 – July 2026 · 3 mos",
    location: "India · Remote",
    type: "Internship",
    summary:
      "Engineered backend automation pipelines, integrated AI-driven task orchestration, and supported asynchronous microservice workflows.",
    responsibilities: [
      "Built resilient backend integration hooks connecting external LLM endpoints with internal execution pipelines.",
      "Developed automated data transformation routines to handle unstructured prompt inputs and normalize responses for client consumption.",
      "Collaborated remotely with engineering leads across asynchronous code reviews, API contract designs, and system reliability testing.",
      "Streamlined automated service workflows, reducing manual pipeline triggers across multi-step execution chains.",
    ],
    skills: ["AI Automation", "Backend Integration", "Asynchronous Systems", "REST APIs", "Remote Collaboration"],
  },
];

export default function Experience({ experienceRef }) {
  const { theme, mounted } = useContext(ThemeContext);
  const isDark = mounted ? theme === "dark" : true;

  return (
    <section
      ref={experienceRef}
      className={`py-20 border-t transition-colors duration-200 ${
        isDark ? "bg-[#0c0d0e] border-[#22252a] text-neutral-100" : "bg-[#f9fafb] border-neutral-300 text-neutral-950"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
            Career History
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
            Work Experience
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-400 mt-1 max-w-xl">
            Chronological engineering roles, responsibilities, and delivered systems.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-6 sm:p-7 transition-colors ${
                isDark
                  ? "bg-[#131518] border-[#22252a] hover:border-[#2e333b]"
                  : "bg-white border-neutral-300 hover:border-neutral-400 shadow-sm"
              }`}
            >
              {/* Header: Role, Company & Meta */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-[#22252a]/60">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#1f2228] text-neutral-900 dark:text-neutral-300 border border-neutral-200 dark:border-transparent font-medium">
                      {exp.type}
                    </span>
                    <span className="text-xs text-neutral-600 dark:text-neutral-400 font-mono flex items-center gap-1 font-medium">
                      <FaCalendarAlt className="w-2.5 h-2.5" /> {exp.period}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-400 mt-0.5">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-200 flex items-center gap-1.5">
                      <FaBuilding className="w-3 h-3 text-neutral-500" />
                      {exp.company}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-xs">
                      <FaMapMarkerAlt className="w-2.5 h-2.5 text-neutral-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-neutral-800 dark:text-neutral-200 mt-4 leading-relaxed font-normal">
                {exp.summary}
              </p>

              {/* Responsibilities */}
              <div className="my-4">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-400 mb-2 font-semibold">
                  Key Engineering Contributions
                </div>
                <ul className="space-y-1.5 text-xs text-neutral-800 dark:text-neutral-300">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 font-mono mt-0.5">›</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-200 dark:border-[#22252a]/60">
                {exp.skills.map((s) => (
                  <span
                    key={s}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                      isDark
                        ? "bg-[#0f1013] border-[#22252a] text-neutral-300"
                        : "bg-neutral-100 border-neutral-300 text-neutral-900 font-medium"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Open source & independent engineering notice */}
          <div
            className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono ${
              isDark
                ? "bg-[#131518]/80 border-[#22252a] text-neutral-300"
                : "bg-white border-neutral-300 text-neutral-800 shadow-sm"
            }`}
          >
            <div>
              <span className="font-bold text-neutral-950 dark:text-neutral-100 block mb-0.5">
                Independent Systems & Tooling Development (2024 – Present)
              </span>
              <span className="text-neutral-700 dark:text-neutral-400">
                Continuously publishing developer CLI tools in Go, distributed RPC engines on npm, and system design simulators.
              </span>
            </div>
            <a
              href="https://github.com/ndk123-web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap font-medium"
            >
              github.com/ndk123-web →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
