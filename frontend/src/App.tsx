/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  FileSearch, 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Plus,
  Search,
  Bell,
  Cpu,
  Mail,
  Linkedin,
  Github,
  ChevronRight,
  ShieldCheck,
  Zap,
  Star,
  CheckCircle2
} from 'lucide-react';
import { cn } from './lib/utils';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import JobTracker from './pages/JobTracker';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Simple routing logic
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'analyzer': return <ResumeAnalyzer />;
      case 'jobs': return <JobTracker />;
      case 'landing': return <LandingPage onStart={() => setCurrentPage('dashboard')} />;
      default: return <LandingPage onStart={() => setCurrentPage('dashboard')} />;
    }
  };

  if (currentPage === 'landing') {
    return <LandingPage onStart={() => setCurrentPage('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 flex font-sans selection:bg-indigo-500/30">
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0c0c0e] border-r border-slate-800 transition-transform duration-300 transform flex flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-white leading-none">
              APEX <span className="text-indigo-400">ApplyAI</span>
            </span>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'analyzer', icon: FileSearch, label: 'Resume Parser' },
              { id: 'jobs', icon: Briefcase, label: 'Recruiter CRM' },
              { id: 'analytics', icon: BarChart3, label: 'Analytics' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                  currentPage === item.id 
                    ? "bg-indigo-500/10 text-indigo-400" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 font-medium text-xs">TS</div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Tarun Singh</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate">DevOps Engineer</p>
            </div>
          </div>
          <button 
            onClick={() => setCurrentPage('landing')}
            className="w-full mt-2 flex items-center gap-3 px-3 py-2 rounded-md text-slate-500 hover:text-red-400 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-slate-800 px-8 flex items-center justify-between bg-[#0a0a0c] sticky top-0 z-40">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <span className="text-slate-500 capitalize">{currentPage}</span>
              <span className="text-slate-700">/</span>
              <span className="text-white font-medium">Command Center</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-4 items-center">
              <span className="hidden md:flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-500">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> K8s Cluster Healthy
              </span>
              <span className="hidden md:block h-4 w-px bg-slate-800"></span>
              <button 
                onClick={() => setCurrentPage('jobs')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md text-xs font-semibold transition-all shadow-lg shadow-indigo-500/10"
              >
                + New Application
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <div className="flex-1 overflow-y-auto p-6 relative">
           <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="max-w-7xl mx-auto h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
