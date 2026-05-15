import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Search, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  Loader2,
  Check,
  ClipboardCheck,
  RefreshCw,
  Quote
} from 'lucide-react';
import api from '../lib/api';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) return;
    setLoading(true);
    try {
      const response = await api.post('/ai/analyze-resume', {
        resumeText,
        jobDescription
      });
      setResult(response.data.analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
            AI Resume Analyzer
          </h1>
          <p className="text-zinc-500 mt-1">Optimize your resume for specific job descriptions using Gemini 1.5 Pro.</p>
        </div>
        {result && (
          <button 
            onClick={() => {
              setResult(null);
              setResumeText('');
              setJobDescription('');
            }}
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-xl"
          >
            <RefreshCw className="w-4 h-4" />
            New Analysis
          </button>
        )}
      </div>

      {!result ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div className="bento-card p-6 h-full flex flex-col group">
              <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                <FileText className="w-4 h-4 text-indigo-400" />
                Raw Resume Source
              </div>
              <textarea 
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your plain text resume here..."
                className="flex-1 w-full bg-slate-900/50 rounded-xl p-4 text-slate-200 placeholder:text-slate-700 outline-none focus:ring-1 ring-indigo-500/50 border border-slate-800 min-h-[350px] resize-none font-mono text-xs transition-all"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bento-card p-6 h-full flex flex-col group">
              <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                <Search className="w-4 h-4 text-indigo-400" />
                Job Specification (JD)
              </div>
              <textarea 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here..."
                className="flex-1 w-full bg-slate-900/50 rounded-xl p-4 text-slate-200 placeholder:text-slate-700 outline-none focus:ring-1 ring-indigo-500/50 border border-slate-800 min-h-[350px] resize-none font-mono text-xs transition-all"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center pt-4">
             <button
                disabled={loading || !resumeText || !jobDescription}
                onClick={handleAnalyze}
                className={cn(
                  "px-12 py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all",
                  loading ? "bg-slate-800 text-slate-500" : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 active:scale-95"
                )}
             >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing Gemini Nodes...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-white" />
                    Generate AI Intelligence
                  </>
                )}
             </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-card-highlight p-10"
        >
          <div className="overflow-hidden relative">
            <div className="absolute top-0 right-0 p-10 pointer-events-none opacity-5">
              <Sparkles className="w-64 h-64 text-indigo-500" />
            </div>
            
            <div className="prose prose-invert prose-indigo max-w-none prose-sm">
              <ReactMarkdown 
                components={{
                  h1: ({children}) => <h1 className="text-3xl font-black mb-8 text-white uppercase tracking-tight">{children}</h1>,
                  h2: ({children}) => <h2 className="text-lg font-black mt-10 mb-6 flex items-center gap-2 uppercase tracking-widest text-indigo-400 group"><div className="w-1 h-5 bg-indigo-500 rounded-full" /> {children}</h2>,
                  p: ({children}) => <p className="text-slate-400 leading-relaxed mb-6 font-medium">{children}</p>,
                  ul: ({children}) => <ul className="space-y-3 mb-8 list-none pl-0">{children}</ul>,
                  li: ({children}) => (
                    <li className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 font-medium">{children}</span>
                    </li>
                  ),
                  blockquote: ({children}) => (
                    <div className="my-8 p-8 bg-slate-900/60 border-l-2 border-indigo-500 rounded-r-2xl italic text-slate-300 relative font-mono text-[11px] leading-loose">
                       <Quote className="absolute -top-3 -left-3 w-8 h-8 text-indigo-500/10" />
                       {children}
                    </div>
                  )
                }}
              >
                {result}
              </ReactMarkdown>
            </div>

            <div className="mt-12 flex items-center gap-4 pt-10 border-t border-slate-800/50">
               <button className="flex-1 bg-slate-800/40 border border-slate-700/50 text-slate-300 font-bold py-3 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider">
                 <ClipboardCheck className="w-4 h-4" />
                 Copy Stream
               </button>
               <button className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 text-sm uppercase tracking-wider">
                 <FileText className="w-4 h-4" />
                 Save as Artifact
               </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Feature grid when no results */}
      {!result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
          {[
            { icon: Target, title: 'ATS Optimization', desc: 'Real-time scoring based on recruiter algorithms.' },
            { icon: CheckCircle2, title: 'Semantic Sync', desc: 'Automatically extract mission-critical keywords.' },
            { icon: Mail, title: 'Identity Tailoring', desc: 'Letters that sound human, optimized for humans.' },
          ].map((feature, i) => (
            <div key={i} className="bento-card p-6">
              <feature.icon className="w-6 h-6 text-indigo-400 mb-4" />
              <h4 className="font-bold text-sm uppercase tracking-wider mb-2 text-slate-200">{feature.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Target({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
