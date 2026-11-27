"use client";

import { useContext, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaNpm,
  FaCopy,
  FaCheck,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import { SiPeerlist, SiProducthunt } from "react-icons/si";

export default function Contact({ contactRef }) {
  const { theme, mounted } = useContext(ThemeContext);
  const isDark = mounted ? theme === "dark" : true;

  const [copied, setCopied] = useState(false);
  const emailAddress = "navnathkadam284@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const channels = [
    {
      label: "GitHub",
      handle: "@ndk123-web",
      url: "https://github.com/ndk123-web",
      icon: FaGithub,
      description: "Source code for CLI tools, RPC engines & simulators",
    },
    {
      label: "LinkedIn",
      handle: "Navnath Kadam",
      url: "https://www.linkedin.com/in/navnath-kadam-883a57288/",
      icon: FaLinkedin,
      description: "Professional updates, career history & connections",
    },
    {
      label: "Peerlist",
      handle: "ndk18",
      url: "https://peerlist.io/ndk18",
      icon: SiPeerlist,
      description: "Verified developer profile & project showcases",
    },
    {
      label: "npm Registry",
      handle: "~ndk18",
      url: "https://www.npmjs.com/~ndk18",
      icon: FaNpm,
      description: "Published Node.js packages (ndk-rpc-cluster, dev-preview)",
    },
    {
      label: "X (Twitter)",
      handle: "@Navnath12652374",
      url: "https://x.com/Navnath12652374",
      icon: FaArrowUpRightFromSquare,
      description: "Technical observations & development notes",
    },
    {
      label: "Product Hunt",
      handle: "@navnath_kadam",
      url: "https://www.producthunt.com/@navnath_kadam",
      icon: SiProducthunt,
      description: "Launched tools & community feedback",
    },
  ];

  return (
    <section
      ref={contactRef}
      className={`py-20 border-t transition-colors duration-200 ${
        isDark ? "bg-[#0c0d0e] border-[#22252a] text-neutral-100" : "bg-[#f9fafb] border-neutral-300 text-neutral-950"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1">
            Communication
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
            Get in Touch
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-400 mt-1 max-w-xl">
            Direct channels to reach me for engineering roles, technical collaboration, or architecture inquiries.
          </p>
        </div>

        {/* Primary Email Card */}
        <div
          className={`rounded-xl border p-6 mb-8 transition-colors ${
            isDark
              ? "bg-[#131518] border-[#22252a]"
              : "bg-white border-neutral-300 shadow-sm"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 block mb-1 font-semibold">
                Direct Email
              </span>
              <a
                href={`mailto:${emailAddress}`}
                className="text-lg sm:text-xl font-bold font-mono text-neutral-950 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {emailAddress}
              </a>
              <div className="flex items-center gap-2 mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Inbox monitored regularly · Typical response within 24h</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={copyEmail}
                className={`inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? "border-[#22252a] bg-[#181a1f] text-neutral-200 hover:text-white hover:border-neutral-500"
                    : "border-neutral-300 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 hover:border-neutral-400 font-medium"
                }`}
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <FaCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <FaCopy className="w-3 h-3" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${emailAddress}`}
                className={`inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-2 rounded-lg border transition-colors ${
                  isDark
                    ? "bg-neutral-100 text-neutral-950 border-neutral-100 hover:bg-white font-semibold"
                    : "bg-neutral-950 text-white border-neutral-950 hover:bg-neutral-800 font-semibold"
                }`}
              >
                <FaEnvelope className="w-3 h-3" />
                <span>Write Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Directory of Verified Developer Channels */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <a
                key={ch.label}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-xl border flex flex-col justify-between transition-colors group ${
                  isDark
                    ? "bg-[#131518] border-[#22252a] hover:border-[#2e333b]"
                    : "bg-white border-neutral-300 hover:border-neutral-400 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {ch.label}
                    </span>
                    <Icon className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors" />
                  </div>
                  <div className="text-sm font-bold text-neutral-950 dark:text-neutral-100 font-mono">
                    {ch.handle}
                  </div>
                </div>
                <p className="text-[11px] text-neutral-700 dark:text-neutral-400 mt-2.5 leading-tight font-normal">
                  {ch.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
