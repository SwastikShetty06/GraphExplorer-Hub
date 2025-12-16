"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Github, ArrowRight, Activity, GitGraph, Database } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading" || session) {
    return null; // Or a nice full-screen loader
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col relative overflow-hidden font-sans selection:bg-blue-500/30">

      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">

        {/* Hero Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          v1.0 is now live
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Explore the GitHub Graph <br className="hidden md:block" />
          with <span className="text-blue-500">Expert Speed.</span>
        </h1>

        {/* Hero Description */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          GraphExplorer Hub gives you a high-performance, deep-dive interface into the GitHub ecosystem.
          Advanced search, infinite issue scrolling, and instant analytics.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => signIn("github")}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
        >
          <Github className="w-6 h-6" />
          <span>Login with GitHub</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Feature Grid (for visual weight) */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-left opacity-80">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400">
              <Database size={20} />
            </div>
            <h3 className="font-bold text-lg mb-2">GraphQL Power</h3>
            <p className="text-sm text-gray-400">Fetch exactly what you need with optimized queries.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 text-purple-400">
              <Activity size={20} />
            </div>
            <h3 className="font-bold text-lg mb-2">Instant Stats</h3>
            <p className="text-sm text-gray-400">Real-time repository statistics and user data.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 text-green-400">
              <GitGraph size={20} />
            </div>
            <h3 className="font-bold text-lg mb-2">Deep Insights</h3>
            <p className="text-sm text-gray-400">Traverse organizations, members, and issues seamlessly.</p>
          </div>
        </div>

      </main>

      <footer className="p-6 text-center text-gray-500 text-sm relative z-10">
        © {new Date().getFullYear()} GraphExplorer Hub. Built with Next.js & Apollo.
      </footer>
    </div>
  );
}
