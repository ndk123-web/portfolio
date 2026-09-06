"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import {
  SiGo,
  SiTypescript,
  SiPython,
  SiRust,
  SiJavascript,
  SiCplusplus,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiApachekafka,
  SiRedis,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiLinux,
  SiDocker,
  SiJenkins,
  SiGit,
  SiGithubactions,
  SiVercel,
  SiRender,
  SiGooglegemini,
  SiPytorch,
  SiOpencv,
  SiTensorflow,
  SiScikitlearn,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
} from "react-icons/si";
import { FaJava, FaAws, FaNetworkWired, FaDatabase, FaServer, FaEye } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

const skillGroups = [
  {
    category: "Languages",
    description: "Core systems and application programming languages used in daily development.",
    skills: [
      { name: "Go", icon: SiGo },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Python", icon: SiPython },
      { name: "Rust", icon: SiRust },
      { name: "JavaScript", icon: SiJavascript },
      { name: "C / C++", icon: SiCplusplus },
      { name: "Java", icon: FaJava },
    ],
  },
  {
    category: "Backend & Distributed Systems",
    description: "Frameworks, protocols, and runtimes for building resilient server-side services.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "FastAPI", icon: SiFastapi },
      { name: "Axum", icon: FaServer },
      { name: "Kafka", icon: SiApachekafka },
      { name: "Custom RPC", icon: FaNetworkWired },
      { name: "Redis", icon: SiRedis },
      { name: "WebSockets", icon: FaNetworkWired },
    ],
  },
  {
    category: "Databases & Storage",
    description: "Persistent databases, caching layers, and client-side offline storage.",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Redis", icon: SiRedis },
      { name: "MongoDB", icon: SiMongodb },
      { name: "TimescaleDB", icon: SiPostgresql },
      { name: "IndexedDB", icon: FaDatabase },
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    category: "DevOps, Cloud & Tooling",
    description: "Deployment targets, operating environments, and automated CI/CD pipelines.",
    skills: [
      { name: "Linux CLI", icon: SiLinux },
      { name: "Docker", icon: SiDocker },
      { name: "Jenkins", icon: SiJenkins },
      { name: "Git", icon: SiGit },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "AWS", icon: FaAws },
      { name: "Azure", icon: VscAzure },
      { name: "Vercel", icon: SiVercel },
      { name: "Render", icon: SiRender },
    ],
  },
  {
    category: "AI & Machine Learning",
    description: "Model integration, multimodal processing, and computer vision pipelines.",
    skills: [
      { name: "Gemini API", icon: SiGooglegemini },
      { name: "PyTorch", icon: SiPytorch },
      { name: "OpenCV", icon: SiOpencv },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "scikit-learn", icon: SiScikitlearn },
      { name: "MediaPipe", icon: FaEye },
    ],
  },
  {
    category: "Client & Web Interfaces",
    description: "Modern web tools for building developer dashboards and product interfaces.",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "HTML5 / Canvas", icon: SiHtml5 },
    ],
  },
];

export default function Skills({ skillRef }) {
  const { theme, mounted } = useContext(ThemeContext);
  const isDark = mounted ? theme === "dark" : true;

  return (
    <section
      ref={skillRef}
      className={`py-20 border-t transition-colors duration-200 ${
        isDark ? "bg-[#0c0d0e] border-[#22252a] text-neutral-100" : "bg-[#f9fafb] border-neutral-300 text-neutral-950"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
            Technical Stack
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
            Systems & Technologies
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-400 mt-1 max-w-xl">
            Grouped breakdown of languages, backend runtimes, distributed tools, and data stores with corresponding tools.
          </p>
        </div>

        {/* Structured Technical Table / Card Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-colors ${
                isDark
                  ? "bg-[#131518] border-[#22252a] hover:border-[#2e333b]"
                  : "bg-white border-neutral-300 hover:border-neutral-400 shadow-sm"
              }`}
            >
              <div>
                <h3 className="text-base font-bold tracking-tight text-neutral-950 dark:text-neutral-100 mb-1">
                  {group.category}
                </h3>
                <p className="text-xs text-neutral-700 dark:text-neutral-400 leading-relaxed mb-4">
                  {group.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-200 dark:border-[#22252a]/60">
                {group.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded border transition-colors ${
                        isDark
                          ? "bg-[#0f1013] border-[#22252a] text-neutral-200 hover:border-neutral-600"
                          : "bg-neutral-100 border-neutral-300 text-neutral-900 font-medium hover:border-neutral-400"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0 text-neutral-600 dark:text-neutral-400" />
                      <span>{skill.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Focus note */}
        <div
          className={`mt-6 p-4 rounded-xl border flex items-center justify-between text-xs font-mono ${
            isDark
              ? "bg-[#131518] border-[#22252a] text-neutral-300"
              : "bg-white border-neutral-300 text-neutral-800 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Primary Focus: Go & Node.js for backend systems · Next.js for product frontends</span>
          </div>
          <span className="text-neutral-600 dark:text-neutral-400 hidden sm:inline font-medium">Linux environment</span>
        </div>
      </div>
    </section>
  );
}
