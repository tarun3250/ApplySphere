import { motion } from 'motion/react';
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  FileSearch, 
  BarChart3, 
  Mail, 
  CheckCircle2,
  Bot,
  Globe,
  Terminal,
  Layers
} from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[700px] h-[700px] bg-indigo-500/10 blur-[120px] rounded-full opacity-50" />
        <div className="absolute top-[20%] -right-[15%] w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full opacity-30" />
        <div className="absolute -bottom-[20%] left-[20%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full opacity-20" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            APEX <span className="text-indigo-400">ApplyAI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-zinc-100 transition-colors">Features</a>
          <a href="#" className="hover:text-zinc-100 transition-colors">DevOps</a>
          <a href="#" className="hover:text-zinc-100 transition-colors">Pricing</a>
          <a href="#" className="hover:text-zinc-100 transition-colors">Docs</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-zinc-100 text-zinc-950 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-8"
        >
          <Zap className="w-3 h-3 fill-indigo-400" />
          <span>The Future of Job Applications</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
        >
          Automate Your <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
            Career Growth.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 sm:px-12 leading-relaxed"
        >
          APEX ApplyAI leverages advanced Gemini logic to optimize resumes, 
          automate recruiter outreach, and track applications with enterprise precision.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
        >
          <button 
            onClick={onStart}
            className="w-full sm:w-auto bg-indigo-600 border border-indigo-400/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-500 transition-all hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] flex items-center justify-center gap-2"
          >
            Get Early Access
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-zinc-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
            View GitHub Project
          </button>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-24 relative p-2 bg-gradient-to-b from-white/10 to-transparent rounded-[2.5rem] border border-white/15 overflow-hidden shadow-2xl xl:-mx-20"
        >
          <div className="bg-[#0f0f13] rounded-[2rem] overflow-hidden aspect-video border border-white/5 shadow-inner flex flex-col">
            <div className="h-12 border-b border-white/5 px-6 flex items-center gap-2">
               <div className="flex gap-1.5 leading-none">
                 <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                 <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                 <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
               </div>
               <div className="ml-4 h-6 w-1/3 bg-white/5 rounded-md flex items-center px-3">
                 <Globe className="w-3 h-3 text-zinc-600 mr-2" />
                 <span className="text-[10px] text-zinc-600 font-mono">apex-apply.ai/dashboard</span>
               </div>
            </div>
            <div className="flex-1 bg-[#050507] p-8 grid grid-cols-12 gap-6">
              <div className="col-span-3 space-y-4">
                <div className="h-24 bg-white/5 rounded-2xl border border-white/5 animate-pulse" />
                <div className="h-24 bg-white/5 rounded-2xl border border-white/5 animate-pulse delay-75" />
                <div className="h-24 bg-white/5 rounded-2xl border border-white/5 animate-pulse delay-150" />
              </div>
              <div className="col-span-9 space-y-6">
                 <div className="h-64 bg-indigo-500/[0.03] rounded-3xl border border-indigo-500/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent" />
                    <BarChart3 className="w-20 h-20 text-indigo-500/20" />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                   <div className="h-32 bg-white/5 rounded-3xl border border-white/5" />
                   <div className="h-32 bg-white/5 rounded-3xl border border-white/5" />
                 </div>
              </div>
            </div>
          </div>
          {/* Accent Glow */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-indigo-500/10 blur-[100px]" />
        </motion.div>
      </section>

      {/* Tech Stack/DevOps Section */}
      <section className="py-32 px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Enterprise Architecture</h2>
          <p className="text-zinc-400 text-lg">Built for scale using modern DevOps principles.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Terminal, 
              title: "Dockerized & Orchestrated", 
              desc: "Full containerization with Docker Compose and Kubernetes deployment support." 
            },
            { 
              icon: Bot, 
              title: "AI Core Engine", 
              desc: "Powered by Gemini for intelligent resume parsing and automated recruiter outreach." 
            },
            { 
              icon: Layers, 
              title: "CI/CD Pipeline", 
              desc: "Integrated Jenkins workflows for automated testing and deployment." 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-10 bg-[#0f0f13] border border-white/5 rounded-[2rem] hover:border-indigo-500/30 transition-all group"
            >
              <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <item.icon className="w-7 h-7 text-indigo-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center mt-20">
        <p className="text-zinc-600 text-sm">
          © 2026 APEX ApplyAI. Built by Tarun Singh for the Modern Engineer.
        </p>
      </footer>
    </div>
  );
}
