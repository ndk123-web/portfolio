"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { FaFileAlt, FaTerminal, FaNetworkWired, FaServer, FaBrain } from "react-icons/fa";

export default function About({ aboutRef }) {
  const { theme, mounted } = useContext(ThemeContext);
  const isDark = mounted ? theme === "dark" : true;

  const coreFocusAreas = [
    {
      icon: FaServer,
      title: "Backend Architecture",
      detail:
        "Designing scalable REST & RPC services, structured data schemas, and resilient database access layers with Go, Node.js, and PostgreSQL.",
    },
    {
      icon: FaNetworkWired,
      title: "Distributed Systems",
      detail:
        "Exploring consensus, message queues (Kafka), heartbeat health-checks, load balancers, and fault tolerance across microservices.",
    },
    {
      icon: FaTerminal,
      title: "Developer Tooling",
      detail:
        "Building lightweight OS-level CLI utilities in Go and reusable open-source packages that eliminate developer friction.",
    },
    {
      icon: FaBrain,
      title: "Practical AI Integration",
      detail:
        "Architecting asynchronous processing pipelines, schema-validated prompt execution, and multimodal ingestion flows.",
    },
  ];

  return (
    <section
      ref={aboutRef}
      className={`py-20 border-t transition-colors duration-200 ${
        isDark ? "bg-[#0c0d0e] border-[#22252a] text-neutral-100" : "bg-[#f9fafb] border-neutral-300 text-neutral-950"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
            Background & Focus
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
            About & Engineering Philosophy
          </h2>
        </div>

        {/* Narrative */}
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-neutral-800 dark:text-neutral-300 max-w-3xl mb-12">
          <p>
            I am a software engineer focused on the backend and systems side of software. 
            I prefer writing clear, explicit code with predictable failure modes rather than relying on heavy abstractions.
          </p>
          <p>
            My work centers on building systems that solve practical engineering challenges: 
            from authoring <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-[#1f2228] text-neutral-900 dark:text-neutral-200 font-semibold">trak</span> and <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-[#1f2228] text-neutral-900 dark:text-neutral-200 font-semibold">who-is-running</span> in Go, to publishing <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-[#1f2228] text-neutral-900 dark:text-neutral-200 font-semibold">ndk-rpc-cluster</span> on npm for automated microservice replica failover, to creating <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-[#1f2228] text-neutral-900 dark:text-neutral-200 font-semibold">FlowFrame</span> to simulate distributed systems interactions.
          </p>
          <p>
            When integrating AI models, I treat them as backend components that require strict validation schemas, 
            asynchronous message queuing, token budget monitoring, and deterministic fallbacks.
          </p>
        </div>

        {/* Focus Pillars Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {coreFocusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className={`p-5 rounded-xl border transition-colors ${
                  isDark
                    ? "bg-[#131518] border-[#22252a]"
                    : "bg-white border-neutral-300 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
                    {area.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-400 leading-relaxed">
                  {area.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Resume Download Callout */}
        <div
          className={`p-6 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isDark
              ? "bg-[#131518] border-[#22252a]"
              : "bg-white border-neutral-300 shadow-sm"
          }`}
        >
          <div>
            <h4 className="text-sm font-bold text-neutral-950 dark:text-neutral-100 mb-1">
              Looking for full resume credentials?
            </h4>
            <p className="text-xs text-neutral-700 dark:text-neutral-400">
              Complete breakdown of technical coursework, internship milestones, and production repositories.
            </p>
          </div>

          <a
            href="/v6_resume_sde.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-lg border transition-colors whitespace-nowrap ${
              isDark
                ? "bg-neutral-100 text-neutral-950 border-neutral-100 hover:bg-white font-semibold"
                : "bg-neutral-950 text-white border-neutral-950 hover:bg-neutral-800 font-semibold"
            }`}
          >
            <FaFileAlt className="w-3 h-3" />
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
