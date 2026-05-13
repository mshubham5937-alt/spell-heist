/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  return (
    <div 
      className="h-screen w-full flex flex-col items-center justify-center relative px-margin-mobile overflow-hidden"
      onClick={onComplete}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_2px_2px,rgba(142,15,40,0.2)_1px,transparent_0)] [background-size:32px_32px]"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="absolute w-72 h-72 border border-white/5 rounded-full bg-surface-container/10 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,82,92,0.15)]"></div>
        
        <motion.div
          animate={{ x: ['-20%', '120%'], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-0 w-full h-[1px] bg-primary-container shadow-[0_0_15px_rgba(255,82,92,1)] z-20 -rotate-12"
        />

        <div className="relative z-10 flex flex-col items-center pointer-events-none">
          <Terminal size={64} className="text-primary mb-4 drop-shadow-[0_0_15px_rgba(255,179,178,0.5)]" />
          <h1 className="font-display text-4xl md:text-5xl text-primary font-bold tracking-tighter text-glow-red">
            SPELL_HEIST
          </h1>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-24 z-20 border border-secondary/40 bg-surface-container-lowest/80 backdrop-blur-md px-8 py-4 shadow-[0_0_20px_rgba(255,179,178,0.2)] cursor-pointer active:scale-95 transition-transform"
      >
        <span className="font-mono text-xs text-secondary tracking-[0.2em] uppercase">
          [ TAP TO BREACH ]
        </span>
      </motion.div>
    </div>
  );
}
