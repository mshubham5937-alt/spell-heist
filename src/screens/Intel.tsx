/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GameScreen } from '../types';
import { Terminal, Lock, ShoppingCart, BarChart3, User, Activity, Trophy } from 'lucide-react';

export default function Intel({ stats, onNavigate }: any) {
  const leaderboard = [
    { rank: '01', name: 'ZERO_DAY', lvl: 99, val: '88.5M' },
    { rank: '02', name: 'NIGHT_OWL', lvl: 89, val: '42.1M' },
    { rank: '03', name: 'GHOST_IN_M', lvl: 85, val: '39.8M' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative pb-32">
      <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-margin-mobile bg-surface/40 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-surface-container border border-white/10 flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
          <h1 className="font-display font-bold text-primary tracking-tighter">SPELL_HEIST</h1>
        </div>
        <div className="font-mono text-[10px] text-primary bg-primary/10 px-3 py-1.5 rounded border border-primary/20">
          XP: {(stats.xp / 1000).toFixed(1)}k
        </div>
      </header>

      <main className="pt-24 px-margin-mobile max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="font-display text-4xl text-on-surface mb-1 uppercase">GLOBAL INTEL</h2>
          <div className="font-mono text-[10px] text-on-surface-variant flex items-center gap-2 uppercase tracking-widest">
            <Activity size={12} />
            LIVE DATA FEED // ENCRYPTED
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {leaderboard.map((player, i) => (
             <div key={i} className={`glass-panel p-4 rounded-xl flex items-center gap-4 relative overflow-hidden ${i === 0 ? 'border-tertiary/50' : ''}`}>
               {i === 0 && <div className="absolute top-0 left-0 w-full h-1 bg-tertiary" />}
               <span className={`font-display text-2xl w-8 text-center ${i === 0 ? 'text-tertiary' : 'text-on-surface-variant'}`}>{player.rank}</span>
               <div className="w-12 h-12 rounded-full bg-surface-container border border-white/10 flex items-center justify-center">
                 <User size={24} className={i === 0 ? 'text-tertiary' : 'text-on-surface-variant'} />
               </div>
               <div className="flex-1">
                 <h3 className="font-sans font-bold uppercase">{player.name}</h3>
                 <span className="font-mono text-[10px] text-on-surface-variant">LVL {player.lvl}</span>
               </div>
               <div className="text-right">
                 <span className="block font-mono text-[8px] text-primary">TOTAL_HEIST</span>
                 <span className="font-sans font-bold text-on-surface">{player.val} CR</span>
               </div>
             </div>
           ))}

           <div className="py-4 text-center">
             <span className="text-on-surface-variant opacity-50">...</span>
           </div>

           <div className="glass-panel p-6 rounded-xl border-primary bg-secondary-container/20 flex items-center gap-4 shadow-[0_0_20px_rgba(255,82,92,0.3)] sticky bottom-24">
              <span className="font-display text-2xl text-primary text-glow-red">42</span>
              <div className="w-14 h-14 rounded-full border-2 border-primary bg-surface overflow-hidden flex items-center justify-center">
                 <User size={28} className="text-primary" />
              </div>
              <div className="flex-1">
                 <span className="font-mono text-[10px] text-primary tracking-widest uppercase">[ YOU ]</span>
                 <h3 className="font-sans font-bold text-lg uppercase">AGENT_X</h3>
              </div>
              <div className="text-right">
                 <span className="inline-flex items-center gap-1 font-mono text-[10px] text-primary bg-primary/10 px-2 py-1 rounded mb-1">
                   <Trophy size={10} /> +2 RANKS
                 </span>
                 <span className="block font-display text-xl text-on-surface">12.8M CR</span>
              </div>
           </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full h-20 bg-surface-container-lowest/60 backdrop-blur-2xl border-t border-white/10 flex justify-around items-center px-4 pb-safe z-50 md:hidden">
        <NavItem icon={<Terminal size={20} />} label="BREACH" onClick={() => onNavigate(GameScreen.MENU)} />
        <NavItem icon={<Lock size={20} />} label="VAULT" />
        <NavItem icon={<ShoppingCart size={20} />} label="STASH" onClick={() => onNavigate(GameScreen.STASH)} />
        <NavItem active icon={<BarChart3 size={20} />} label="INTEL" />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-16 gap-1 transition-all ${active ? 'text-primary drop-shadow-[0_0_10px_rgba(255,179,178,0.6)]' : 'text-on-surface-variant opacity-50'}`}>
      <div className={`p-1 ${active ? 'bg-primary/10 rounded-md' : ''}`}>{icon}</div>
      <span className="font-mono text-[8px] font-bold tracking-widest">{label}</span>
    </button>
  );
}
