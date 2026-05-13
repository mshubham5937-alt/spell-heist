/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { GameScreen } from '../types';
import { 
  User, 
  Coins, 
  Award, 
  Timer, 
  Infinity as InfinityIcon, 
  Map as MapIcon,
  Lock,
  ShoppingCart,
  BarChart3,
  Terminal
} from 'lucide-react';

interface MenuProps {
  stats: {
    xp: number;
    credits: number;
    diamonds: number;
  };
  onSelectHeist: () => void;
  onNavigate: (screen: GameScreen) => void;
}

export default function Menu({ stats, onSelectHeist, onNavigate }: MenuProps) {
  return (
    <div className="min-h-screen flex flex-col relative pb-32">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-margin-mobile bg-surface/40 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-surface-container border border-white/10 flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
          <h1 className="font-display font-bold text-primary tracking-tighter">SPELL_HEIST</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-tertiary">
            <Coins size={14} />
            <span className="font-mono text-xs">{(stats.credits / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <Award size={14} />
            <span className="font-mono text-xs">XP: {(stats.xp / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 px-margin-mobile max-w-5xl mx-auto w-full flex flex-col items-center">
        <div className="w-full flex flex-col items-center text-center mt-8 mb-12">
          <div className="font-mono text-[10px] text-on-surface-variant tracking-widest border border-white/10 px-4 py-1 rounded bg-surface/50 backdrop-blur-md mb-8">
            [ SYSTEM STATUS: READY ]
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelectHeist}
            className="group relative"
          >
            <div className="absolute inset-0 bg-primary-container rounded-lg opacity-40 blur-xl group-hover:opacity-60 transition-opacity"></div>
            <div className="relative bg-primary-container text-on-primary-container px-12 py-6 rounded-lg font-display text-2xl font-bold tracking-tight border border-primary/50 shadow-[0_0_20px_rgba(255,82,92,0.5)] overflow-hidden">
              SELECT HEIST
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/50 opacity-0 group-hover:opacity-100 group-hover:translate-y-[60px] transition-all duration-1000 ease-linear" />
            </div>
          </motion.button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
          <HeistCard 
            title="Daily Challenge" 
            desc="Infiltrate the automated vault. Limited attempts remaining."
            reward="REWARD: HIGH"
            icon={<Timer size={24} className="text-secondary" />}
            accent="primary"
            onClick={onSelectHeist}
          />
          <HeistCard 
            title="Endless Mode" 
            desc="Descend through infinite security layers. How deep can you go?"
            reward="CURRENT TIER: 12"
            icon={<InfinityIcon size={24} className="text-tertiary" />}
            accent="tertiary"
            onClick={onSelectHeist}
          />
          <HeistCard 
            title="Campaign" 
            desc="Follow the primary intel trail. Uncover the syndicate's secrets."
            reward="PROGRESS: 34%"
            icon={<MapIcon size={24} className="text-on-surface" />}
            accent="neutral"
            onClick={onSelectHeist}
          />
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full h-20 bg-surface-container-lowest/60 backdrop-blur-2xl border-t border-white/10 flex justify-around items-center px-4 pb-safe z-50 md:hidden">
        <NavItem active icon={<Terminal size={20} />} label="BREACH" />
        <NavItem icon={<Lock size={20} />} label="VAULT" />
        <NavItem icon={<ShoppingCart size={20} />} label="STASH" onClick={() => onNavigate(GameScreen.STASH)} />
        <NavItem icon={<BarChart3 size={20} />} label="INTEL" onClick={() => onNavigate(GameScreen.INTEL)} />
      </nav>
    </div>
  );
}

function HeistCard({ title, desc, reward, icon, accent, onClick }: any) {
  const accentColor = accent === 'primary' ? 'group-hover:border-primary/50' : accent === 'tertiary' ? 'group-hover:border-tertiary/50' : 'group-hover:border-white/30';
  
  return (
    <motion.button
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`group relative flex flex-col items-start p-6 rounded-xl glass-panel text-left overflow-hidden transition-all ${accentColor}`}
    >
      <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center border border-white/5 mb-4 group-hover:bg-surface-container transition-colors">
        {icon}
      </div>
      <h3 className="font-display text-xl text-on-surface mb-2">{title}</h3>
      <p className="font-sans text-sm text-on-surface-variant mb-6 opacity-80">{desc}</p>
      <div className="w-full flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
        <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">{reward}</span>
        <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-on-surface transition-colors">
          <Terminal size={12} className="opacity-40 group-hover:opacity-100" />
        </div>
      </div>
    </motion.button>
  );
}

function NavItem({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 gap-1 transition-all ${
        active ? 'text-primary drop-shadow-[0_0_10px_rgba(255,179,178,0.6)]' : 'text-on-surface-variant opacity-50'
      }`}
    >
      <div className={`p-1 ${active ? 'bg-primary/10 rounded-md' : ''}`}>{icon}</div>
      <span className="font-mono text-[8px] font-bold tracking-widest">{label}</span>
    </button>
  );
}
