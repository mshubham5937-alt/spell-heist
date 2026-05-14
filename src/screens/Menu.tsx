/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Difficulty, GameScreen } from '../types';
import { 
  User, 
  Coins, 
  Award,
  Terminal,
  ShieldAlert,
  ShieldCheck,
  ShieldHalf
} from 'lucide-react';

interface MenuProps {
  stats: {
    xp: number;
    credits: number;
    diamonds: number;
    streak: number;
    hasCompletedTutorial: boolean;
    wins?: Record<Difficulty, number>;
  };
  onSelectHeist: (diff: Difficulty) => void;
}

export default function Menu({ stats, onSelectHeist }: MenuProps) {
  const getWins = (diff: Difficulty) => {
    return stats.wins?.[diff] || 0;
  };

  return (
    <div className="min-h-screen flex flex-col relative pb-10">
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
      <main className="flex-1 pt-24 pb-8 px-margin-mobile max-w-5xl mx-auto w-full flex flex-col items-center">
        {!stats.hasCompletedTutorial && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-primary/10 border border-primary/30 rounded-xl p-8 mb-12 text-center"
          >
            <ShieldAlert size={48} className="text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-primary mb-2">NEW OPERATIVE DETECTED</h2>
            <p className="text-on-surface-variant mb-6">You must complete the training simulation to learn how to bypass vault security and use your tools.</p>
            <button
              onClick={() => onSelectHeist(Difficulty.TUTORIAL)}
              className="bg-primary text-on-primary font-bold px-8 py-3 rounded-lg shadow-[0_0_20px_rgba(255,82,92,0.3)] hover:scale-105 active:scale-95 transition-all w-full md:w-auto font-display tracking-wider"
            >
              START TRAINING HEIST
            </button>
          </motion.div>
        )}

        <div className="w-full flex flex-col items-center text-center mt-4 mb-4">
          <div className="font-mono text-[10px] text-on-surface-variant tracking-widest border border-white/10 px-4 py-1 rounded bg-surface/50 backdrop-blur-md mb-8">
            [ SELECT THREAT LEVEL ]
          </div>
        </div>

        {/* Difficulty Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-4">
          <DifficultyCard 
            title="EASY" 
            desc="Common words, beginner friendly. Generous attempts and relaxed security."
            reward="LOW PAYOUT"
            wins={getWins(Difficulty.EASY)}
            icon={<ShieldCheck size={32} className="text-[#39FF14]" />} // Neon Green
            colorClass="border-[#39FF14]/50 shadow-[0_0_15px_rgba(57,255,20,0.2)] hover:shadow-[0_0_25px_rgba(57,255,20,0.4)]"
            titleColor="text-[#39FF14]"
            onClick={() => onSelectHeist(Difficulty.EASY)}
          />
          <DifficultyCard 
            title="MEDIUM" 
            desc="Uncommon words, balanced challenge. Moderate security alarm."
            reward="STANDARD PAYOUT"
            wins={getWins(Difficulty.MEDIUM)}
            icon={<ShieldHalf size={32} className="text-[#FF8C00]" />} // Neon Orange
            colorClass="border-[#FF8C00]/50 shadow-[0_0_15px_rgba(255,140,0,0.2)] hover:shadow-[0_0_25px_rgba(255,140,0,0.4)]"
            titleColor="text-[#FF8C00]"
            onClick={() => onSelectHeist(Difficulty.MEDIUM)}
          />
          <DifficultyCard 
            title="HARD" 
            desc="Advanced vocabulary, high pressure. Aggressive security response."
            reward="MAXIMUM PAYOUT"
            wins={getWins(Difficulty.HARD)}
            icon={<ShieldAlert size={32} className="text-[#FF003F]" />} // Neon Crimson
            colorClass="border-[#FF003F]/50 shadow-[0_0_15px_rgba(255,0,63,0.2)] hover:shadow-[0_0_25px_rgba(255,0,63,0.4)]"
            titleColor="text-[#FF003F]"
            onClick={() => onSelectHeist(Difficulty.HARD)}
          />
        </div>
      </main>
    </div>
  );
}

function DifficultyCard({ title, desc, reward, wins, icon, colorClass, titleColor, onClick }: any) {
  return (
    <motion.button
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative flex flex-col items-center text-center p-8 rounded-xl bg-surface-container border transition-all ${colorClass} overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
      
      <div className="mb-6 relative">
        <div className="absolute inset-0 blur-xl opacity-50 transition-opacity group-hover:opacity-100" />
        {icon}
      </div>
      
      <h3 className={`font-display text-4xl tracking-tight mb-4 ${titleColor}`}>{title}</h3>
      <p className="font-sans text-sm text-on-surface-variant mb-8 opacity-90 leading-relaxed max-w-[200px]">{desc}</p>
      
      <div className="w-full flex justify-between items-center border-t border-white/5 pt-6 mt-auto">
        <span className={`font-mono text-[10px] uppercase tracking-widest ${titleColor} opacity-80`}>{reward}</span>
        <span className={`font-mono text-[10px] uppercase tracking-widest text-on-surface-variant`}>{wins} WINS</span>
      </div>
    </motion.button>
  );
}
