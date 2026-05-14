import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Building2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

interface Job {
  id: number;
  company: string;
  role: string;
  location: string;
  status: string;
  createdAt: string;
  salary?: string;
}

export default function JobTracker() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({ company: '', role: '', location: '', salary: '' });

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/api/jobs');
      setJobs(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchJobs();
    // Pre-populate with some mock data if empty
    if (jobs.length === 0) {
       setJobs([
         { id: 1, company: 'Tesla', role: 'SRE Intern', location: 'Austin, TX', status: 'Applied', createdAt: new Date().toISOString(), salary: '$45/hr' },
         { id: 2, company: 'Amazon', role: 'Backend Engineer', location: 'Remote', status: 'Interview', createdAt: new Date().toISOString(), salary: '$160k' },
         { id: 3, company: 'Meta', role: 'Production Engineer', location: 'Menlo Park, CA', status: 'Rejected', createdAt: new Date().toISOString() },
       ]);
    }
  }, []);

  const handleAddJob = async () => {
    try {
      const res = await axios.post('/api/jobs', newJob);
      setJobs([res.data, ...jobs]);
      setShowModal(false);
      setNewJob({ company: '', role: '', location: '', salary: '' });
    } catch (e) { console.error(e); }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Active Applications</h1>
          <p className="text-zinc-500 mt-1">Manage and track your recruitment pipeline in real-time.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-5 h-5" />
          Add Application
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-[#0f0f13] border border-white/5 rounded-3xl">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input 
            type="text" 
            placeholder="Search company or role..." 
            className="w-full bg-white/5 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none focus:border-indigo-500/50"
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
          <Filter className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-400">All Status</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
          <Calendar className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-400">Sort: Date</span>
        </div>
      </div>

      {/* Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div 
            key={job.id}
            className="group bento-card p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 group-hover:border-indigo-500/30 transition-all group-hover:scale-105">
                  <Building2 className="w-6 h-6 text-indigo-400" />
                </div>
                <div className={cn(
                  "px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5",
                  job.status === 'Applied' ? "bg-blue-500/10 text-blue-400" :
                  job.status === 'Interview' ? "bg-emerald-500/10 text-emerald-400" :
                  job.status === 'Rejected' ? "bg-red-500/10 text-red-400" : "bg-purple-500/10 text-purple-400"
                )}>
                  <div className={cn("w-1 h-1 rounded-full", 
                    job.status === 'Applied' ? "bg-blue-400" :
                    job.status === 'Interview' ? "bg-emerald-400" :
                    job.status === 'Rejected' ? "bg-red-400" : "bg-purple-400"
                  )} />
                  {job.status}
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <h3 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{job.role}</h3>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">{job.company}</p>
              </div>

              <div className="space-y-3 mb-8 pt-6 border-t border-slate-800/50">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-600" />
                  {job.location}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                  {format(new Date(job.createdAt), 'MMM dd, yyyy')}
                </div>
                {job.salary && (
                  <div className="flex items-center gap-3 text-xs text-emerald-500 font-bold">
                    <span className="w-4 flex justify-center">$</span>
                    {job.salary}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 bg-slate-800/40 border border-slate-700/50 text-[10px] font-black uppercase tracking-widest py-2 rounded-lg hover:bg-slate-800 transition-all text-slate-300">
                Details
              </button>
              <button className="p-2 bg-slate-800/40 border border-slate-700/50 rounded-lg hover:text-indigo-400 transition-all">
                <ExternalLink className="w-4 h-4" />
              </button>
              <button className="p-2 bg-slate-800/40 border border-slate-700/50 rounded-lg hover:text-red-400 transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="flex items-center gap-8 relative z-10">
          <div className="flex flex-col">
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Active Pipeline</span>
            <span className="text-2xl font-black text-white">12 / 30</span>
          </div>
          <div className="hidden sm:block w-px h-10 bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Global Success</span>
            <span className="text-2xl font-black text-emerald-400">14.2%</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest relative z-10">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          Last synced: 14m ago
        </div>
      </div>

      {/* Add Job Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0f0f13] border border-white/10 rounded-3xl p-8 w-full max-w-lg shadow-2xl shadow-indigo-500/10"
          >
            <h2 className="text-2xl font-bold mb-6">New Application</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Company Name</label>
                <input 
                  type="text" 
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-indigo-500/50" 
                  placeholder="e.g. OpenAI"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Role Title</label>
                <input 
                  type="text" 
                  value={newJob.role}
                  onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-indigo-500/50" 
                  placeholder="e.g. Backend Engineer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Location</label>
                  <input 
                    type="text" 
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-indigo-500/50" 
                    placeholder="e.g. Remote"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 mb-1.5 uppercase tracking-wider">Salary Range</label>
                  <input 
                    type="text" 
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 outline-none focus:border-indigo-500/50" 
                    placeholder="e.g. $140k"
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
                onClick={handleAddJob}
                className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20"
              >
                Create Entry
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
