import { User, Shield, Bell, Zap, Database, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-black">System Preferences</h1>
        <p className="text-zinc-500 mt-1">Manage your identity and automation protocols.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bento-card p-8 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
                <User className="w-5 h-5 text-indigo-400" />
             </div>
             <h3 className="font-bold text-white uppercase tracking-widest text-sm">Profile Configuration</h3>
          </div>
          <div className="space-y-4">
             <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Display Name</label>
                <input type="text" defaultValue={user?.name} className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 outline-none text-sm text-zinc-300" />
             </div>
             <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Network ID</label>
                <input type="email" readOnly defaultValue={user?.email} className="w-full bg-black/20 border border-white/5 rounded-xl py-3 px-4 outline-none text-sm text-zinc-600 cursor-not-allowed" />
             </div>
          </div>
        </div>

        <div className="bento-card p-8 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                <Zap className="w-5 h-5 text-emerald-400" />
             </div>
             <h3 className="font-bold text-white uppercase tracking-widest text-sm">AI Core Settings</h3>
          </div>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                <div>
                   <p className="text-xs font-bold text-zinc-300">Auto-Apply Mode</p>
                   <p className="text-[10px] text-zinc-600">Let Gemini suggest applications.</p>
                </div>
                <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                   <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
             </div>
             <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                <div>
                   <p className="text-xs font-bold text-zinc-300">Recruiter Sync</p>
                   <p className="text-[10px] text-zinc-600">Daily LinkedIn network scan.</p>
                </div>
                <div className="w-10 h-5 bg-slate-800 rounded-full relative">
                   <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-600 rounded-full" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
