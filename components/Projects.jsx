"use client";

import { useContext, useState, useEffect, useCallback, useRef } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaNpm,
  FaCodeBranch,
  FaChevronLeft,
  FaChevronRight,
  FaList,
  FaSlidersH,
} from "react-icons/fa";

const projects = [
    {
    id: "flowframe",
    title: "FlowFrame",
    category: "Systems & Architecture",
    tag: "DISTRIBUTED SYSTEMS SIMULATOR",
    summary:
      "Interactive distributed systems visualizer and simulator for modeling request flows, latency bottlenecks, and microservice failure scenarios.",
    problem:
      "Traditional system design diagrams are static canvas drawings. Engineers cannot visually test how request pipelines behave under latency spikes, cascading database failures, or cache misses.",
    solution:
      "Built a live simulation engine that executes request flow packets through configurable nodes (Load Balancers, Redis, PostgreSQL, Worker Pools), dynamically computing latency accumulation and bottleneck metrics.",
    decisions: [
      "Rust & Axum backend pipeline for high-throughput request propagation simulation.",
      "Tokio async task runtimes for concurrent node latency simulation.",
      "Canvas-based rendering engine in Next.js/TypeScript to prevent DOM thrashing during high-frequency flow animations.",
    ],
    tech: ["Rust", "Axum", "Tokio", "Next.js", "TypeScript", "Node.js"],
    github: "https://github.com/ndk123-web/flowframe",
    live: "https://flowframe.ndkdev.tech/",
  },
  {
    id: "trak",
    title: "Trak CLI",
    category: "Systems & Architecture",
    tag: "LOCAL-FIRST WORKSPACE GENERATOR",
    summary:
      "High-performance, local-first developer learning workspace generator in Go that materializes multi-module coding labs directly onto the local filesystem from a GitOps blueprint registry.",
    problem:
      "Developers learning distributed architectures are trapped in isolated browser sandboxes or forced to copy-paste fragmented code snippets without real project manifests (go.mod, Cargo.toml, Dockerfiles).",
    solution:
      "Engineered a deterministic 6-phase CLI pipeline without background daemons, streaming remote JSON blueprints over HTTPS, recursively materializing AST file trees, and stamping immutable trak.json provenance manifests.",
    decisions: [
      "AST directory generator recursively creating nested directories (0755) and source files (0644) via native Go OS syscalls.",
      "Decoupled GitOps blueprint streaming from trak-registry with animated ANSI terminal spinners.",
      "Deterministic provenance tracking recording author, version tag, source path, and UTC timestamps.",
    ],
    tech: ["Go", "Cobra", "GitOps", "CLI", "AST Materializer", "Unix Filesystem"],
    github: "https://github.com/ndk123-web/trak",
  },
  {
    id: "ndk-rpc-cluster",
    title: "NDK RPC Cluster",
    category: "Systems & Architecture",
    tag: "DISTRIBUTED RPC ENGINE",
    summary:
      "Enterprise-grade RPC cluster published on npm featuring load balancing, automatic replica management, and failure recovery for Node.js microservices.",
    problem:
      "Setting up high-availability RPC communication between services often demands heavy orchestrators or boilerplate-heavy gRPC setups that complicate lightweight internal service coordination.",
    solution:
      "Engineered an enterprise-grade RPC cluster package with client/server abstractions, automated worker pool heartbeat monitoring, round-robin load distribution, and zero-downtime replica restarts on failure.",
    decisions: [
      "Custom framed socket protocol with structured binary headers for request-response multiplexing.",
      "Worker process health heartbeat loop triggering automatic replica regeneration upon SIGSEGV/unhandled crashes.",
      "Built-in round-robin load balancer that excludes unacknowledged or unhealthy replica nodes.",
    ],
    tech: ["Node.js", "Distributed Systems", "RPC", "Sockets", "npm Package"],
    github: "https://github.com/ndk123-web/ndk-rpc-cluster",
    npm: "https://www.npmjs.com/package/ndk-rpc-cluster",
  },
  {
    id: "who-is-running",
    title: "who-is-running",
    category: "Systems & Architecture",
    tag: "GO SYSTEMS CLI",
    summary:
      "Fast OS-level CLI utility written in Go for inspecting active network ports, identifying process ownership, and terminating processes directly from the terminal.",
    problem:
      "Developers constantly run into 'EADDRINUSE: port already in use' errors and struggle with complex, platform-specific lsof, netstat, and kill command chains.",
    solution:
      "Created a standalone, cross-platform CLI tool in Go that queries the operating system socket tables directly, displays active listeners in a formatted terminal table, and provides safe termination flags.",
    decisions: [
      "Native Go standard library and OS syscall wrappers for zero-dependency execution.",
      "Cobra CLI framework for structured flags, subcommands, and automated help documentation.",
      "Lipgloss terminal styling for clean, readable tabular output with PID, user, command, and protocol state.",
    ],
    tech: ["Go", "Cobra", "Lipgloss", "Unix Sockets", "OS Syscalls"],
    github: "https://github.com/ndk123-web/who-is-running",
  },
  {
    id: "taskplexus",
    title: "TaskPlexus",
    category: "Full-Stack Products",
    tag: "OFFLINE-FIRST SAAS",
    summary:
      "Enterprise task management platform with local-first IndexedDB replication, AI-assisted planning, multi-workspace isolation, and Razorpay subscription handling.",
    problem:
      "Web-based productivity applications freeze or lose state during intermittent network drops, and often lack robust multi-tenant workspace isolation for distinct team domains.",
    solution:
      "Engineered a resilient offline-first web client synchronizing against a Go backend service, backed by PostgreSQL for persistence and Redis for fast workspace session resolution.",
    decisions: [
      "IndexedDB client-side database with delta-based synchronization queue to resume updates when reconnected.",
      "Go REST API handling workspace tenancy boundaries and cryptographic session tokens.",
      "Integrated Razorpay webhook lifecycle for subscription states and enterprise workspace quotas.",
    ],
    tech: ["Go", "PostgreSQL", "Redis", "IndexedDB", "React", "Razorpay"],
    github: "https://github.com/ndk123-web/TaskPlexus",
    live: "https://taskplexus.app",
  },
  {
    id: "study-sync-ai",
    title: "Study Sync AI",
    category: "AI & ML Systems",
    tag: "MULTIMODAL RAG PIPELINE",
    summary:
      "AI-powered learning platform with asynchronous ingestion pipelines for YouTube transcripts and PDF textbooks, generating contextual quizzes and summaries.",
    problem:
      "Ingesting long-form video lectures and dense PDFs for generative Q&A causes high latency and request timeouts when handled synchronously in the main web server thread.",
    solution:
      "Built a decoupled processing architecture utilizing Kafka message queues and FastAPI workers to parse, chunk, embed, and query educational content asynchronously.",
    decisions: [
      "Apache Kafka event pipeline decoupling file upload from transcription and vector indexing.",
      "FastAPI microservice executing semantic chunking and Gemini API prompt orchestration.",
      "Vector search caching to eliminate redundant LLM API calls for identical study queries.",
    ],
    tech: ["FastAPI", "Kafka", "Gemini API", "TensorFlow", "React", "Express"],
    github: "https://github.com/ndk123-web/study-sync-ai",
    live: "https://study-sync-ai.vercel.app",
  },
  {
    id: "ai-resume-maker",
    title: "AI Resume Maker",
    category: "AI & ML Systems",
    tag: "ATS PROMPT ORCHESTRATION",
    summary:
      "ATS-compliant resume generator converting natural language engineering achievements into standardized schema-validated resumes.",
    problem:
      "Generic LLM resume prompts output unstructured markdown that fails ATS parsers and requires extensive manual formatting.",
    solution:
      "Engineered a schema-enforced pipeline with structured prompt validation against Gemini API, outputting standardized JSON rendered into pixel-accurate PDF templates.",
    decisions: [
      "Strict JSON schema generation with fallback retry parsing for reliable layout synthesis.",
      "FastAPI backend handling prompt normalization and token budget enforcement.",
      "Firebase authentication and encrypted user profile storage.",
    ],
    tech: ["FastAPI", "Gemini API", "React", "Firebase"],
    github: "https://github.com/ndk123-web/ai-resume-maker",
  },
];

const categories = [
  "All",
  "Systems & Architecture",
  "Full-Stack Products",
  "AI & ML Systems",
];

export default function Projects({ projectsRef }) {
  const { theme, mounted } = useContext(ThemeContext);
  const isDark = mounted ? theme === "dark" : true;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("slider"); // "slider" or "list"

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const total = filteredProjects.length;

  // Reset slide index if category changes
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch swipe support for mobile
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation when slider is focused
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== "slider") return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, nextSlide, prevSlide]);

  const currentProject = filteredProjects[currentIndex] || filteredProjects[0];

  return (
    <section
      ref={projectsRef}
      className={`py-16 sm:py-20 border-t transition-colors duration-200 ${
        isDark
          ? "bg-[#0c0d0e] border-[#22252a] text-neutral-100"
          : "bg-[#f9fafb] border-neutral-300 text-neutral-950"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
              Selected Works
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
              Engineering Projects & Systems
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-400 mt-1 max-w-xl">
              Technical case studies of distributed tools, backend services, and systems-level utilities.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 self-start sm:self-auto p-1 rounded-lg border border-neutral-300 dark:border-[#22252a] bg-white dark:bg-[#131518]">
            <button
              onClick={() => setViewMode("slider")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                viewMode === "slider"
                  ? isDark
                    ? "bg-neutral-100 text-neutral-950 font-bold"
                    : "bg-neutral-950 text-white font-bold"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
              title="Interactive Slidable View"
            >
              <FaSlidersH className="w-3 h-3" />
              <span>Slide View</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                viewMode === "list"
                  ? isDark
                    ? "bg-neutral-100 text-neutral-950 font-bold"
                    : "bg-neutral-950 text-white font-bold"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
              title="Show All Projects as List"
            >
              <FaList className="w-3 h-3" />
              <span>All List</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-xs font-mono px-3 py-1.5 rounded-md border whitespace-nowrap transition-colors focus:outline-none ${
                selectedCategory === cat
                  ? isDark
                    ? "bg-neutral-100 text-neutral-950 border-neutral-100 font-bold"
                    : "bg-neutral-950 text-white border-neutral-950 font-bold"
                  : isDark
                  ? "bg-[#131518] text-neutral-400 border-[#22252a] hover:border-neutral-600 hover:text-neutral-200"
                  : "bg-white text-neutral-800 border-neutral-300 hover:border-neutral-500 hover:text-black shadow-sm font-medium"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ─── 1. SLIDER / SLIDABLE VIEW ─── */}
        {viewMode === "slider" && (
          <div className="space-y-4">
            {/* Quick-Jump Project Navigator Bar (Scrollable on mobile) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
              {filteredProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-md border whitespace-nowrap transition-all ${
                    currentIndex === idx
                      ? isDark
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/40 font-bold shadow-sm"
                        : "bg-blue-50 text-blue-700 border-blue-300 font-bold shadow-sm"
                      : isDark
                      ? "bg-[#131518]/60 text-neutral-400 border-[#22252a] hover:border-neutral-600 hover:text-neutral-200"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:text-black"
                  }`}
                >
                  <span className="text-[10px] text-neutral-500 mr-1.5">0{idx + 1}</span>
                  {p.title}
                </button>
              ))}
            </div>

            {/* Main Active Project Slide Card */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`rounded-2xl border p-5 sm:p-7 md:p-8 transition-all duration-200 ${
                isDark
                  ? "bg-[#131518] border-[#22252a] shadow-lg shadow-black/40"
                  : "bg-white border-neutral-300 shadow-md"
              }`}
            >
              {/* Slide Card Header: Index Counter, Tag & Action Links */}
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-[#22252a]/60">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
                      {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#1f2228] text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-transparent">
                      {currentProject.tag}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
                    {currentProject.title}
                  </h3>
                </div>

                {/* External Links */}
                <div className="flex items-center gap-2 flex-wrap">
                  {currentProject.github && (
                    <a
                      href={currentProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-lg border transition-colors ${
                        isDark
                          ? "border-[#22252a] bg-[#181a1f] text-neutral-200 hover:text-white hover:border-neutral-500"
                          : "border-neutral-300 bg-neutral-50 text-neutral-900 hover:bg-neutral-100 hover:border-neutral-400 font-medium"
                      }`}
                      title="View Source on GitHub"
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}

                  {currentProject.npm && (
                    <a
                      href={currentProject.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-lg border transition-colors ${
                        isDark
                          ? "border-[#22252a] bg-[#181a1f] text-red-400 hover:border-red-500/50"
                          : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 font-medium"
                      }`}
                      title="View on npm registry"
                    >
                      <FaNpm className="w-3.5 h-3.5" />
                      <span>npm</span>
                    </a>
                  )}

                  {currentProject.live && (
                    <a
                      href={currentProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-lg border transition-colors ${
                        isDark
                          ? "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                          : "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
                      }`}
                      title="View Live Demo"
                    >
                      <FaExternalLinkAlt className="w-2.5 h-2.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-200 mt-4 leading-relaxed">
                {currentProject.summary}
              </p>

              {/* Problem vs. What Was Built (Responsive Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-4 sm:my-5 text-xs leading-relaxed">
                <div
                  className={`p-3.5 sm:p-4 rounded-xl border ${
                    isDark
                      ? "bg-[#0f1013] border-[#22252a] text-neutral-300"
                      : "bg-neutral-50 border-neutral-200 text-neutral-800"
                  }`}
                >
                  <span className="font-mono font-bold uppercase text-neutral-950 dark:text-neutral-300 block mb-1">
                    The Problem
                  </span>
                  {currentProject.problem}
                </div>

                <div
                  className={`p-3.5 sm:p-4 rounded-xl border ${
                    isDark
                      ? "bg-[#0f1013] border-[#22252a] text-neutral-300"
                      : "bg-neutral-50 border-neutral-200 text-neutral-800"
                  }`}
                >
                  <span className="font-mono font-bold uppercase text-neutral-950 dark:text-neutral-300 block mb-1">
                    What Was Built
                  </span>
                  {currentProject.solution}
                </div>
              </div>

              {/* Key Engineering Decisions */}
              <div className="mb-4">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-400 mb-2 flex items-center gap-1.5 font-semibold">
                  <FaCodeBranch className="w-3 h-3 text-neutral-500" />
                  Key Engineering Decisions
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-300">
                  {currentProject.decisions.map((decision, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 font-mono mt-0.5">›</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Monospace Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-200 dark:border-[#22252a]/60">
                {currentProject.tech.map((t) => (
                  <span
                    key={t}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                      isDark
                        ? "bg-[#0f1013] border-[#22252a] text-neutral-300"
                        : "bg-neutral-100 border-neutral-300 text-neutral-900 font-semibold"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Slider Navigation Bar: Prev / Next Buttons + Progress Dots */}
            <div className="flex items-center justify-between pt-2 px-1">
              <button
                onClick={prevSlide}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-mono transition-colors ${
                  isDark
                    ? "border-[#22252a] bg-[#131518] text-neutral-200 hover:bg-[#181a1f] hover:border-neutral-600"
                    : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 hover:border-neutral-400 shadow-sm font-semibold"
                }`}
                aria-label="Previous project"
              >
                <FaChevronLeft className="w-3 h-3" />
                <span>Prev Project</span>
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentIndex === idx
                        ? "w-6 bg-blue-600 dark:bg-blue-400"
                        : "w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-mono transition-colors ${
                  isDark
                    ? "border-[#22252a] bg-[#131518] text-neutral-200 hover:bg-[#181a1f] hover:border-neutral-600"
                    : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 hover:border-neutral-400 shadow-sm font-semibold"
                }`}
                aria-label="Next project"
              >
                <span>Next Project</span>
                <FaChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="text-center text-[11px] font-mono text-neutral-500 pt-1">
              Tip: Swipe left/right on mobile or use arrow keys ← →
            </div>
          </div>
        )}

        {/* ─── 2. ALL LIST / GRID VIEW (Alternative for fast scan) ─── */}
        {viewMode === "list" && (
          <div className="space-y-6 sm:space-y-8">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                className={`rounded-2xl border p-5 sm:p-7 transition-colors ${
                  isDark
                    ? "bg-[#131518] border-[#22252a] hover:border-[#2e333b]"
                    : "bg-white border-neutral-300 hover:border-neutral-400 shadow-sm"
                }`}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-[#22252a]/60">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/20">
                        0{idx + 1}
                      </span>
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-neutral-100 dark:bg-[#1f2228] text-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-transparent">
                        {project.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
                      {project.title}
                    </h3>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
                          isDark
                            ? "border-[#22252a] bg-[#181a1f] text-neutral-200 hover:text-white hover:border-neutral-500"
                            : "border-neutral-300 bg-neutral-50 text-neutral-900 hover:bg-neutral-100 hover:border-neutral-400 font-medium"
                        }`}
                      >
                        <FaGithub className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.npm && (
                      <a
                        href={project.npm}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
                          isDark
                            ? "border-[#22252a] bg-[#181a1f] text-red-400 hover:border-red-500/50"
                            : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100 font-medium"
                        }`}
                      >
                        <FaNpm className="w-3.5 h-3.5" />
                        <span>npm</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors ${
                          isDark
                            ? "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                            : "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
                        }`}
                      >
                        <FaExternalLinkAlt className="w-2.5 h-2.5" />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200 mt-4 leading-relaxed">
                  {project.summary}
                </p>

                {/* Problem & Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-4 text-xs leading-relaxed">
                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark
                        ? "bg-[#0f1013] border-[#22252a] text-neutral-300"
                        : "bg-neutral-50 border-neutral-200 text-neutral-800"
                    }`}
                  >
                    <span className="font-mono font-bold uppercase text-neutral-950 dark:text-neutral-300 block mb-1">
                      The Problem
                    </span>
                    {project.problem}
                  </div>
                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark
                        ? "bg-[#0f1013] border-[#22252a] text-neutral-300"
                        : "bg-neutral-50 border-neutral-200 text-neutral-800"
                    }`}
                  >
                    <span className="font-mono font-bold uppercase text-neutral-950 dark:text-neutral-300 block mb-1">
                      What Was Built
                    </span>
                    {project.solution}
                  </div>
                </div>

                {/* Engineering Decisions */}
                <div className="mb-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-400 mb-2 flex items-center gap-1.5 font-semibold">
                    <FaCodeBranch className="w-3 h-3 text-neutral-500" />
                    Key Engineering Decisions
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-800 dark:text-neutral-300">
                    {project.decisions.map((decision, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 font-mono mt-0.5">›</span>
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-200 dark:border-[#22252a]/60">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                        isDark
                          ? "bg-[#0f1013] border-[#22252a] text-neutral-300"
                          : "bg-neutral-100 border-neutral-300 text-neutral-900 font-semibold"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom link to GitHub for more repositories */}
        <div className="mt-8 sm:mt-10 text-center">
          <a
            href="https://github.com/ndk123-web?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-lg border transition-colors ${
              isDark
                ? "border-[#22252a] bg-[#131518] text-neutral-300 hover:text-white hover:border-neutral-600"
                : "border-neutral-300 bg-white text-neutral-800 hover:text-black hover:border-neutral-500 shadow-sm font-semibold"
            }`}
          >
            <FaGithub className="w-3.5 h-3.5" />
            <span>View all 20+ repositories on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
