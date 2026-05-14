import { motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  Briefcase, 
  Eye, 
  MessageSquare, 
  TrendingUp,
  Target,
  Mail,
  Zap,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const pipelineData = [
  { name: 'Applied', value: 142, color: '#6366f1', height: '85%' },
  { name: 'Viewed', value: 64, color: '#818cf8', height: '45%' },
  { name: 'Interview', value: 28, color: '#a5b4fc', height: '20%' },
  { name: 'Offers', value: 3, color: '#10b981', height: '8%' },
];

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 auto-rows-min">
      
      {/* Row 1: Application Pipeline Flow (Bento Large) */}
      <div className="col-span-12 lg:col-span-8 p-6 bento-card flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            Application Pipeline Flow
          </h2>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-bold">THIS MONTH</span>
          </div>
        </div>
        
        <div className="flex-1 flex items-end justify-between px-2 gap-4 min-h-[200px] mb-2">
          {pipelineData.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full bg-slate-800 rounded-t-lg h-32 relative overflow-hidden group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: item.height }}
                  transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                  className="absolute bottom-0 w-full"
                  style={{ backgroundColor: item.color }}
                >
                  <div className="pt-2 text-[11px] font-black text-center text-slate-900 filter drop-shadow-sm">
                    {item.value}
                  </div>
                </motion.div>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 1: Resume Score (Bento Highlight) */}
      <div className="col-span-12 lg:col-span-4 p-6 bento-card-highlight flex flex-col justify-between group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-600/20 blur-3xl group-hover:bg-indigo-600/40 transition-all duration-700"></div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest mb-1">AI HEALTH CHECK</p>
            <h2 className="text-xl font-black text-white leading-tight">Resume<br/>Index Score</h2>
          </div>
          <div className="text-4xl font-black text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            92<span className="text-sm text-slate-500 font-normal">/100</span>
          </div>
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="flex justify-between text-[11px] font-bold">
            <span className="text-slate-400 uppercase">ATS Optimization</span>
            <span className="text-emerald-400 uppercase">Excellent</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.3)]"
            />
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed italic border-l-2 border-indigo-500/30 pl-3 py-1">
            "3 new keywords detected in 'Senior Frontend' roles. Recommendation: Add 'System Design' to intro."
          </p>
        </div>
      </div>

      {/* Row 2: Automated Actions */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4 p-6 bento-card">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Automated Actions</h3>
        <div className="space-y-3">
          {[
            { label: 'Email Campaign', sub: '12 follow-ups pending', icon: Mail, color: 'bg-amber-500/10 text-amber-500', status: 'RUNNING' },
            { label: 'Job Scraper', sub: 'Synced with LinkedIn', icon: Globe, color: 'bg-indigo-500/10 text-indigo-400', status: 'READY', statusColor: 'text-emerald-500' },
            { label: 'Cover Letter AI', sub: 'Customized for Google L4', icon: Zap, color: 'bg-rose-500/10 text-rose-500', status: 'DRAFT', statusColor: 'text-indigo-400' },
          ].map((action, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800/60 transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110", action.color)}>
                  <action.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-200">{action.label}</p>
                  <p className="text-[10px] text-slate-500">{action.sub}</p>
                </div>
              </div>
              <div className={cn("text-[10px] font-black tracking-wider", action.statusColor || "text-slate-400")}>{action.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Recent Interactions (CRM Style) */}
      <div className="col-span-12 md:col-span-6 lg:col-span-5 p-6 bento-card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recent CRM Activity</h3>
          <span className="text-[10px] font-bold text-indigo-400 hover:underline cursor-pointer">VIEW ALL</span>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Sarah Jenkins', time: '2h ago', role: 'Meta Recruiter', activity: 'Replied to follow-up', color: 'indigo' },
            { name: 'Michael Chen', time: '5h ago', role: 'Stripe EM', activity: 'Scheduled Interview', color: 'emerald', highlight: true },
            { name: 'Alex Rivera', time: '1d ago', role: 'Airbnb Lead', activity: 'Opened Email x3', color: 'slate' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-white group-hover:border-indigo-500/50 transition-all">
                {item.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-xs font-bold truncate">{item.name}</span>
                  <span className="text-[10px] text-slate-600 font-medium">{item.time}</span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  {item.role} • <span className={cn(
                    "italic font-medium",
                    item.color === 'indigo' ? "text-indigo-400" :
                    item.color === 'emerald' ? "text-emerald-400" : "text-slate-500"
                  )}>{item.activity}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Infrastructure Status */}
      <div className="col-span-12 lg:col-span-3 p-6 bento-card bg-slate-900/60 flex flex-col justify-between">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Cluster Node Infrastructure</h3>
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-white/5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">API Latency</span>
              <span className="text-xs font-black text-emerald-400 tracking-tighter">12ms <span className="text-[8px] text-emerald-400/50">AVG</span></span>
            </div>
            <div className="flex gap-1 h-8 items-end">
              {[20, 40, 20, 30, 20, 40, 60, 20, 40, 30, 50, 40].map((h, i) => (
                <div key={i} className="flex-1 bg-emerald-500/30 rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
             <div className="p-3 bg-slate-900/80 border border-white/5 rounded-xl flex flex-col items-center justify-center">
               <span className="text-[9px] text-slate-500 uppercase font-black">Pod Status</span>
               <span className="text-sm font-black text-emerald-500">8/8 UP</span>
             </div>
             <div className="p-3 bg-slate-900/80 border border-white/5 rounded-xl flex flex-col items-center justify-center">
               <span className="text-[9px] text-slate-500 uppercase font-black">DB Load</span>
               <span className="text-sm font-black text-white">14%</span>
             </div>
          </div>
        </div>
      </div>

      {/* Row 3: Heatmap (Bento Full Width Wide) */}
      <div className="col-span-12 p-6 bento-card min-h-[160px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Active Job Hunt Heatmap</h3>
          <div className="flex gap-4">
             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase">DevOps Roles</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase">Backend Roles</span>
             </div>
          </div>
        </div>
        <div className="grid grid-cols-12 md:grid-cols-24 lg:grid-cols-48 gap-1.5">
          {Array.from({ length: 48 }).map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-4 rounded-sm transition-colors cursor-pointer",
                i % 7 === 0 ? "bg-indigo-600" :
                i % 13 === 0 ? "bg-emerald-600" :
                i % 5 === 0 ? "bg-indigo-900" :
                i % 9 === 0 ? "bg-indigo-400" : "bg-slate-800/40 hover:bg-slate-700/60"
              )} 
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <p className="text-[10px] text-slate-500 font-medium">Tracking 1,242 real-time aggregate signals across all active recruitment cycles.</p>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-slate-800/40 rounded-sm"></div>
            <div className="w-3 h-3 bg-indigo-900 rounded-sm"></div>
            <div className="w-3 h-3 bg-indigo-700 rounded-sm"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
          </div>
        </div>
      </div>

    </div>
  );
}
