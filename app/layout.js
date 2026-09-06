import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext.js";

export const metadata = {
  title: "Navnath Kadam | Backend & Distributed Systems Engineer",
  description:
    "Navnath Kadam — Backend-focused Software Engineer building distributed systems, developer tools, and AI-integrated applications. Creator of FlowFrame, NDK RPC Cluster, and who-is-running CLI.",
  keywords: [
    "Navnath Kadam",
    "Software Engineer",
    "Backend Engineer",
    "Distributed Systems",
    "Go",
    "Rust",
    "Node.js",
    "NDK RPC Cluster",
    "who-is-running",
    "FlowFrame",
    "Developer Tools"
  ],
  authors: [{ name: "Navnath Kadam" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased selection:bg-blue-500/20 selection:text-blue-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
