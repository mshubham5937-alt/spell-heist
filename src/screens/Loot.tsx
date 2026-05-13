/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, Coins, Award, Gem, Download } from 'lucide-react';

interface LootProps {
  onCollect: () => void;
}

export default function Loot({ onCollect }: LootProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-margin-mobile py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-tertiary/10 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mb-16">
        <div className="inline-flex items-center gap-2 border border-primary/30 bg-surface-container-lowest/50 backdrop-blur-md px-4 py-2 mb-6">
          <ShieldCheck size={16} className="text-primary" />
          <span className="font-mono text-[10px] text-primary tracking-widest">[ BREACH SUCCESSFUL ]</span>
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl text-white text-glow-red uppercase tracking-tighter mb-4">
          LOOT SECURED
        </h1>
        <p className="text-on-surface-variant text-sm opacity-80">
          The vault defenses have been bypassed. The payload has been extracted to your secure stash.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16">
        <RewardCard title="5,000" label="Credits" icon={<Coins className="text-tertiary" />} color="tertiary" />
        <RewardCard title="20" label="Diamonds" icon={<Gem className="text-white" />} color="neutral" />
        <RewardCard title="Legendary" label="Neon Trail" icon={<Award className="text-primary" />} color="primary" />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCollect}
        className="relative z-10 flex items-center gap-3 px-12 py-5 bg-primary-container text-on-primary-container rounded font-mono text-xs uppercase tracking-widest neon-glow-red"
      >
        <span>COLLECT ALL</span>
        <Download size={18} />
      </motion.button>
    </div>
  );
}

function RewardCard({ title, label, icon, color }: any) {
  const colorMap: any = {
    tertiary: 'border-tertiary/30 text-tertiary shadow-[0_0_15px_rgba(233,196,0,0.2)]',
    primary: 'border-primary/30 text-primary shadow-[0_0_15px_rgba(255,82,92,0.2)]',
    neutral: 'border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]',
  };

  return (
    <div className="relative bg-surface/40 backdrop-blur-2xl rounded-xl border border-white/10 p-8 flex flex-col items-center justify-center gap-6 shadow-2xl">
      <div className={`w-16 h-16 rounded-full bg-surface-container-lowest border flex items-center justify-center ${colorMap[color]}`}>
        {icon}
      </div>
      <div className="text-center">
        <h3 className={`font-display text-2xl ${colorMap[color].split(' ')[1]}`}>{title}</h3>
        <p className="font-mono text-[10px] text-on-surface-variant mt-2 uppercase">{label}</p>
      </div>
    </div>
  );
}
