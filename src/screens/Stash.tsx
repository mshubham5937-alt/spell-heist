/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GameScreen } from '../types';
import { User, ShoppingCart, Terminal, Lock, BarChart3, Gem, CreditCard } from 'lucide-react';

export default function Stash({ stats, onNavigate }: any) {
  return (
    <div className="min-h-screen flex flex-col relative pb-32">
       <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-margin-mobile bg-surface/40 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-white/10">
            <User size={18} className="text-primary m-1.5" />
          </div>
          <h1 className="font-display font-bold text-primary tracking-tighter">SPELL_HEIST</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-tertiary">
            <Gem size={14} />
            <span className="font-mono text-xs">{stats.diamonds}</span>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <CreditCard size={14} />
            <span className="font-mono text-xs">{(stats.credits / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </header>

      <main className="pt-24 px-margin-mobile max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="font-display text-4xl text-on-surface mb-1 uppercase">STASH</h2>
          <div className="font-mono text-[10px] text-on-surface-variant flex items-center gap-2 uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#ff525c]" />
            MARKETPLACE_SECURE_LINK_ACTIVE
          </div>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          <button className="px-6 py-2 bg-primary/10 border border-primary text-primary font-mono text-xs rounded uppercase shadow-[0_0_15px_rgba(255,82,92,0.3)]">
            [ HACKER SKINS ]
          </button>
          <button className="px-6 py-2 bg-white/5 border border-white/10 text-on-surface-variant font-mono text-xs rounded uppercase hover:text-white transition-colors">
            [ TOOLBOX ]
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel rounded-xl p-4 border border-white/10 group hover:border-primary/50 transition-colors">
            <div className="w-full aspect-square bg-surface-container-low rounded-lg mb-4 relative overflow-hidden grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
               <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 border border-tertiary rounded">
                 <span className="font-mono text-[8px] text-tertiary">LEGENDARY</span>
               </div>
               <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
                  <User size={64} className="text-on-surface-variant opacity-20" />
               </div>
            </div>
            <h3 className="font-sans font-bold text-lg mb-1 uppercase tracking-tight">PHANTOM_RIG_V2</h3>
            <p className="text-xs text-on-surface-variant mb-4">Elite thermal evasion suit. Invisible to scanners.</p>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
               <div className="flex items-center gap-1 text-tertiary">
                 <Gem size={14} />
                 <span className="font-mono text-sm font-bold">850</span>
               </div>
               <button className="px-4 py-1.5 bg-primary text-on-primary-container font-mono text-[10px] rounded hover:scale-105 transition-transform">
                 ACQUIRE
               </button>
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 w-full h-20 bg-surface-container-lowest/60 backdrop-blur-2xl border-t border-white/10 flex justify-around items-center px-4 pb-safe z-50 md:hidden">
        <NavItem icon={<Terminal size={20} />} label="BREACH" onClick={() => onNavigate(GameScreen.MENU)} />
        <NavItem icon={<Lock size={20} />} label="VAULT" />
        <NavItem active icon={<ShoppingCart size={20} />} label="STASH" />
        <NavItem icon={<BarChart3 size={20} />} label="INTEL" onClick={() => onNavigate(GameScreen.INTEL)} />
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
