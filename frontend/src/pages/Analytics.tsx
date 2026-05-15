import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Activity, 
  PieChart as PieIcon, 
  Target,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { cn } from '../lib/utils';

const data = [
  { name: 'Mon', apps: 4, interviews: 1 },
  { name: 'Tue', apps: 7, interviews: 2 },
  { name: 'Wed', apps: 5, interviews: 1 },
  { name: 'Thu', apps: 8, interviews: 3 },
  { name: 'Fri', apps: 12, interviews: 4 },
  { name: 'Sat', apps: 3, interviews: 1 },
  { name: 'Sun', apps: 2, interviews: 0 },
];

const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b'];

const stats = [
  { label: 'Weekly Velocity', value: '42.5%', icon: TrendingUp, trend: '+12%', up: true },
  { label: 'Response Rate', value: '18.2%', icon: Activity, trend: '+2.4%', up: true },
  { label: 'Interview Conversion', value: '8.4%', icon: Target, trend: '-1.2%', up: false },
];

export default function Analytics() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Performance Intelligence</h1>
          <p className="text-zinc-500 mt-1">Deep-dive metrics on your recruitment pipeline efficiency.</p>
        </div>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-[10px] font-black uppercase tracking-widest">LIVE SYNC</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bento-card p-6 flex flex-col justify-between group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-indigo-600 transition-colors">
                   <s.icon className="w-5 h-5 text-indigo-400 group-hover:text-white" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black",
                  s.up ? "text-emerald-500" : "text-rose-500"
                )}>
                  {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {s.trend}
                </div>
             </div>
             <div>
                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em] mb-1">{s.label}</p>
                <p className="text-3xl font-black text-white">{s.value}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bento-card p-8">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Application Velocity</h3>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Applications</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Interviews</span>
                 </div>
              </div>
           </div>
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#52525b', fontSize: 10, fontWeight: 700}}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#52525b', fontSize: 10, fontWeight: 700}}
                  />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#0f0f13', border: '1px solid #ffffff10', borderRadius: '12px'}}
                    itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                  />
                  <Area type="monotone" dataKey="apps" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                  <Area type="monotone" dataKey="interviews" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorInt)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bento-card p-8 flex flex-col">
           <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400 mb-8">Role Distribution</h3>
           <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'DevOps', value: 45 },
                      { name: 'Backend', value: 30 },
                      { name: 'Frontend', value: 15 },
                      { name: 'SRE', value: 10 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="space-y-3 mt-4">
              {[
                { label: 'DevOps Engineering', value: '45%', color: 'bg-indigo-500' },
                { label: 'Backend Engineering', value: '30%', color: 'bg-emerald-500' },
                { label: 'Frontend Engineering', value: '15%', color: 'bg-rose-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", item.color)} />
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">{item.label}</span>
                   </div>
                   <span className="text-[10px] font-black text-white">{item.value}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
