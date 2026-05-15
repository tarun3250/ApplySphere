import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Mail, 
  Send, 
  Plus, 
  MoreVertical, 
  Zap, 
  Loader2, 
  Copy, 
  Check,
  Building2,
  User,
  Search
} from 'lucide-react';
import api from '../lib/api';
import { cn } from '../lib/utils';

interface Recruiter {
  id: number;
  name: string;
  company: string;
  role: string;
  email: string;
  status: string;
}

export default function RecruiterCRM() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([
    { id: 1, name: 'Sarah Jenkins', company: 'Google', role: 'Technical Recruiter', email: 'sarah.j@google.com', status: 'Contacted' },
    { id: 2, name: 'Michael Chen', company: 'Meta', role: 'Engineering Manager', email: 'mchen@meta.com', status: 'New' },
  ]);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newRecruiter, setNewRecruiter] = useState({ name: '', company: '', role: '', email: '' });

  const handleGenerateEmail = async (recruiter: Recruiter) => {
    setLoading(true);
    setGeneratedEmail('');
    setSelectedRecruiter(recruiter);
    try {
      const response = await api.post('/ai/generate-email', {
        recruiterName: recruiter.name,
        role: 'Software Engineer',
        companyName: recruiter.company
      });
      setGeneratedEmail(response.data.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddRecruiter = () => {
    const id = recruiters.length + 1;
    setRecruiters([...recruiters, { id, ...newRecruiter, status: 'New' }]);
    setShowModal(false);
    setNewRecruiter({ name: '', company: '', role: '', email: '' });
  };

  return (
    <div className="grid grid-cols-12 gap-8 h-full">
      {/* List Column */}
      <div className="col-span-12 lg:col-span-5 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black flex items-center gap-3">
            <Users className="w-6 h-6 text-indigo-400" />
            Recruiter CRM
          </h1>
          <button 
            onClick={() => setShowModal(true)}
            className="p-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input 
            type="text" 
            placeholder="Search network..." 
            className="w-full bg-[#0f0f13] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:border-indigo-500/50"
          />
        </div>

        <div className="space-y-3">
          {recruiters.map((r) => (
            <div 
              key={r.id}
              onClick={() => handleGenerateEmail(r)}
              className={cn(
                "p-4 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between",
                selectedRecruiter?.id === r.id 
                  ? "bg-indigo-500/10 border-indigo-500/50" 
                  : "bg-[#0f0f13] border-white/5 hover:border-white/10"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white group-hover:scale-105 transition-transform">
                  {r.name[0]}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{r.name}</h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{r.role} @ {r.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className={cn("w-4 h-4", selectedRecruiter?.id === r.id ? "text-indigo-400" : "text-zinc-700")} />
                <MoreVertical className="w-4 h-4 text-zinc-700" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail/Email Column */}
      <div className="col-span-12 lg:col-span-7">
        <AnimatePresence mode="wait">
          {!selectedRecruiter ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-12 bento-card bg-slate-900/20 border-dashed border-2 border-white/5"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-zinc-700" />
              </div>
              <h3 className="text-xl font-bold text-zinc-300">No Recruiter Selected</h3>
              <p className="text-sm text-zinc-500 mt-2 max-w-xs">Select a recruiter from your CRM to generate a personalized AI outreach email.</p>
            </motion.div>
          ) : (
            <motion.div 
              key={selectedRecruiter.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full flex flex-col bento-card p-8"
            >
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
                    <User className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">{selectedRecruiter.name}</h2>
                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">{selectedRecruiter.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 text-zinc-400 transition-all">
                     <Mail className="w-5 h-5" />
                   </button>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">AI Generated Outreach</span>
                  {generatedEmail && (
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'COPIED' : 'COPY EMAIL'}
                    </button>
                  )}
                </div>

                <div className="bg-black/40 rounded-2xl p-6 border border-white/5 min-h-[300px] relative">
                  {loading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest animate-pulse">Consulting Gemini Logic...</p>
                    </div>
                  ) : generatedEmail ? (
                    <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">
                      {generatedEmail}
                    </pre>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                       <Zap className="w-12 h-12 text-zinc-800" />
                       <button 
                        onClick={() => handleGenerateEmail(selectedRecruiter)}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 transition-all"
                       >
                         Generate Personalized Script
                       </button>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/5 flex gap-4">
                   <button className="flex-1 bg-white/5 border border-white/5 text-zinc-400 font-bold py-4 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                     <Send className="w-4 h-4" />
                     Send via Platform
                   </button>
                   <button className="px-8 bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
                     Draft LinkedIN Message
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Recruiter Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f0f13] border border-white/10 rounded-3xl p-8 w-full max-w-lg shadow-2xl shadow-indigo-500/10"
          >
            <h2 className="text-2xl font-bold mb-6">Add Network Contact</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Recruiter Name</label>
                <input 
                  type="text" 
                  value={newRecruiter.name}
                  onChange={(e) => setNewRecruiter({ ...newRecruiter, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-indigo-500/50" 
                  placeholder="Sarah Jenkins"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input 
                    type="text" 
                    value={newRecruiter.company}
                    onChange={(e) => setNewRecruiter({ ...newRecruiter, company: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-indigo-500/50" 
                    placeholder="Google"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Role</label>
                  <input 
                    type="text" 
                    value={newRecruiter.role}
                    onChange={(e) => setNewRecruiter({ ...newRecruiter, role: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-indigo-500/50" 
                    placeholder="Tech Recruiter"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Email (Optional)</label>
                  <input 
                    type="email" 
                    value={newRecruiter.email}
                    onChange={(e) => setNewRecruiter({ ...newRecruiter, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-indigo-500/50" 
                    placeholder="sarah@google.com"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-8">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 bg-white/5 border border-white/10 text-zinc-400 font-bold py-3 rounded-2xl hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddRecruiter}
                className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
              >
                Sync with Hub
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
