/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../hooks/useGame';
import { LetterState } from '../types';
import { AlertTriangle, Delete, ChevronRight, User, Info, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BreachProps {
  onWin: (loot: any) => void;
  onLose: () => void;
}

export default function Breach({ onWin, onLose }: BreachProps) {
  const game = useGame();
  const [showRules, setShowRules] = useState(true);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (game.isGameOver) {
      setShowResult(true);
    }
  }, [game.isGameOver]);

  const handleResultAction = () => {
    if (game.isWin) {
      onWin({
        xp: 500,
        credits: game.payout,
        diamonds: Math.random() > 0.8 ? 5 : 0,
      });
    } else {
      onLose();
    }
  };

  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['BACKSPACE', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'INJECT']
  ];

  return (
    <div className="h-dvh flex flex-col pt-14 pb-safe px-2 sm:px-margin-mobile max-w-2xl mx-auto game-board relative overflow-hidden">
      {/* Header Info */}
      <header className="absolute top-0 left-0 w-full h-14 flex items-center justify-between px-margin-mobile bg-surface/40 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-primary/30 overflow-hidden">
            <User size={18} className="text-primary m-1.5" />
          </div>
          <h1 className="font-display font-bold text-primary tracking-tighter">BREACH_CONSOLE</h1>
        </div>
        <div className="font-mono text-[10px] text-primary bg-primary/10 px-3 py-1.5 rounded border border-primary/20">
          XP: 2.4k
        </div>
      </header>

      {/* Main Gameplay Canvas */}
      <main className="relative z-10 flex-1 flex flex-col pt-1 pb-safe px-2 sm:px-margin-mobile gap-1 sm:gap-2 w-full max-w-2xl mx-auto overflow-hidden">
        {/* Validation Error Toast */}
        <AnimatePresence>
          {game.validationError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full font-mono text-[9px] tracking-widest shadow-[0_0_20px_rgba(255,82,92,0.6)] border border-primary/50"
            >
              {game.validationError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rules Overlay */}
        <AnimatePresence>
          {showRules && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center rounded-xl border border-white/10"
            >
              <Info size={48} className="text-primary mb-4" />
              <h2 className="font-display text-2xl text-primary mb-4">BREACH PROTOCOL</h2>
              <div className="space-y-4 text-sm text-on-surface-variant max-w-sm">
                <p>Guess the <span className="text-primary font-bold">VAULT PASSWORD</span> before the alarm reaches 100%.</p>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-8 h-8 bg-success-container rounded border-b-2 border-success" />
                  <span>Correct Position</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-8 h-8 bg-tertiary rounded border-b-2 border-tertiary" />
                  <span>Wrong Position</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-8 h-8 bg-surface-container-high rounded border-b-2 border-white/10 opacity-40" />
                  <span>Incorrect Letter</span>
                </div>
                <p className="text-xs italic mt-4">Every wrong guess increases the alarm. High alarm levels reduce your final payout.</p>
              </div>
              <button 
                onClick={() => setShowRules(false)}
                className="mt-8 px-12 py-3 bg-primary-container text-on-primary-container font-mono text-xs tracking-widest rounded-lg shadow-[0_0_20px_rgba(255,82,92,0.4)]"
              >
                INITIATE BREACH
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Result Overlay */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[110] glass-panel p-6 sm:p-8 rounded-2xl border-t-2 border-primary/50 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col items-center text-center max-w-sm mx-auto"
            >
              {game.isWin ? (
                <>
                  <CheckCircle2 size={64} className="text-primary mb-4 drop-shadow-[0_0_15px_rgba(255,82,92,0.5)]" />
                  <h2 className="font-display text-3xl text-primary mb-2">VAULT CRACKED</h2>
                  <p className="text-on-surface-variant text-sm mb-6">Security bypassed successfully. Loot is ready for extraction.</p>
                </>
              ) : (
                <>
                  <ShieldAlert size={64} className="text-primary-container mb-4 animate-pulse" />
                  <h2 className="font-display text-3xl text-primary-container mb-2">MISSION FAILED</h2>
                  <p className="text-on-surface-variant text-sm mb-2">The system locked down before you could finish.</p>
                  <div className="bg-surface-dim/80 px-4 py-2 rounded-lg border border-white/5 mb-6">
                    <span className="text-[10px] text-on-surface-variant block mb-1">TARGET KEY WAS:</span>
                    <span className="font-display text-2xl text-primary tracking-widest">{game.targetWord}</span>
                  </div>
                </>
              )}
              
              <button 
                onClick={handleResultAction}
                className="w-full py-4 bg-primary-container text-on-primary-container font-display font-bold rounded-xl shadow-[0_0_20px_rgba(255,82,92,0.3)] hover:scale-105 active:scale-95 transition-transform"
              >
                {game.isWin ? 'SECURE LOOT' : 'ABORT MISSION'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      {/* Alarm & Payout Status */}
      <section className="glass-panel p-1.5 sm:p-2 rounded-lg flex flex-col gap-1 shadow-[0_0_20px_rgba(255,82,92,0.1)] mt-0.5 shrink-0">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className={`font-mono text-[7px] sm:text-[9px] tracking-widest ${game.alarmLevel > 70 ? 'text-primary-container animate-pulse' : 'text-on-surface-variant'}`}>
              {game.alarmLevel > 70 ? 'CRITICAL ALARM STATUS' : 'SECURITY LEVEL'}
            </span>
            <div className="font-mono text-[7px] sm:text-[9px] text-on-surface-variant flex items-center gap-1">
              <AlertTriangle size={8} className={game.alarmLevel > 70 ? 'text-primary-container' : 'text-white/20'} />
              {game.alarmLevel > 70 ? 'SYSTEM LOCKDOWN IMMINENT' : 'SYSTEMS STABLE'}
            </div>
          </div>
          <div className={`font-mono text-[7px] sm:text-[9px] px-1.5 py-0 rounded border ${game.alarmLevel > 70 ? 'text-primary-container border-primary-container/30 bg-primary-container/10' : 'text-on-surface-variant border-white/10 bg-white/5'}`}>
            {game.alarmLevel}%
          </div>
        </div>

        {/* Alarm Segments */}
        <div className="flex gap-0.5 h-1 sm:h-1.5 w-full">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`flex-1 rounded-full border border-white/5 transition-colors duration-500 ${
                i * 10 < game.alarmLevel ? 'bg-primary-container shadow-[0_0_8px_#ff525c]' : 'bg-surface-dim'
              }`}
            />
          ))}
        </div>

        {/* Payout Display */}
        <div className="mt-0 flex flex-col items-center py-0.5 bg-surface-dim/40 rounded-md border border-white/5 relative overflow-hidden">
          <span className="font-mono text-[6px] sm:text-[7px] text-on-surface-variant mb-0">[ POTENTIAL PAYOUT ]</span>
          <div className="font-display text-base sm:text-xl md:text-2xl text-primary tracking-tighter drop-shadow-[0_0_5px_rgba(255,179,178,0.3)]">
            $ {game.payout.toLocaleString()}
          </div>
        </div>
      </section>

      {/* Grid Canvas */}
      <section className="flex-1 flex flex-col items-center justify-center gap-1.5 py-1 overflow-hidden">
        <div className="font-mono text-[8px] sm:text-[10px] text-on-surface-variant bg-surface/80 px-2 py-0.5 border border-white/10 rounded-full">
          TARGET: {game.wordLength}-LETTER ENCRYPTION KEY
        </div>
        
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {/* Past Guesses */}
          {game.guesses.map((guess, i) => (
            <div key={i} className="flex gap-2">
              {guess.split('').map((letter, j) => (
                <Tile key={j} letter={letter} state={game.getLetterState(letter, j, guess)} />
              ))}
            </div>
          ))}
          
          {/* Current Guess */}
          {!game.isGameOver && (
             <div className="flex gap-2">
               {[...Array(game.wordLength)].map((_, i) => {
                 const letter = game.currentGuess[i] || '';
                 const isActive = i === game.currentGuess.length;
                 return <Tile key={i} letter={letter} active={isActive} />;
               })}
             </div>
          )}

          {/* Empty Rows */}
          {[...Array(Math.max(0, game.maxAttempts - game.guesses.length - (game.isGameOver ? 0 : 1)))].map((_, i) => (
            <div key={i} className="flex gap-1.5 sm:gap-2">
              {[...Array(game.wordLength)].map((_, j) => (
                <Tile key={j} letter="" />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Hacking Keyboard */}
      <footer className="w-full max-w-lg mx-auto bg-surface-container-lowest/80 backdrop-blur-3xl p-1 sm:p-2 rounded-t-xl border-t border-primary/20 pb-1 sm:pb-4 shrink-0 z-10">
        <div className="flex flex-col gap-1 sm:gap-2">
          {keys.map((row, i) => (
            <div key={i} className="flex justify-center gap-1 sm:gap-1.5">
              {row.map(key => {
                const state = game.keyboardLetterStates[key];
                const getKeyState = () => {
                  if (state === LetterState.CORRECT) return 'bg-success text-on-success border-success shadow-[0_0_8px_rgba(74,222,128,0.5)]';
                  if (state === LetterState.PRESENT) return 'bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.5)]';
                  if (state === LetterState.ABSENT) return 'bg-surface-dim text-white/10 border-white/5 opacity-50';
                  if (key === 'INJECT') return 'bg-primary-container/80 text-on-primary-container shadow-[0_0_10px_rgba(255,82,92,0.4)] border-primary/50';
                  if (key === 'BACKSPACE') return 'bg-surface-dim border-white/5';
                  // Initially red keyboard as requested
                  return 'bg-primary-container/10 text-primary-fixed/70 border-primary/10';
                };

                return (
                  <button
                    key={key}
                    onClick={() => game.onKeyPress(key)}
                    className={`
                      ${key === 'INJECT' ? 'w-14 sm:w-20' : key === 'BACKSPACE' ? 'w-8 sm:w-12' : 'flex-1'}
                      flex items-center justify-center h-8 sm:h-10 rounded border
                      font-mono text-[9px] sm:text-xs
                      hover:brightness-110
                      active:scale-95 transition-all
                      ${getKeyState()}
                    `}
                  >
                    {key === 'BACKSPACE' ? <Delete size={16} /> : key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </footer>
      </main>
    </div>
  );
}

interface TileProps {
  letter: string;
  state?: LetterState;
  active?: boolean;
  key?: any;
}

function Tile({ letter, state, active }: TileProps) {
  const getStyles = () => {
    if (state === LetterState.CORRECT) return 'bg-success text-on-success border-success shadow-[0_0_15px_rgba(74,222,128,0.6)]';
    if (state === LetterState.PRESENT) return 'bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.6)]';
    if (state === LetterState.ABSENT) return 'bg-surface-container-high text-on-surface-variant opacity-40';
    if (active) return 'bg-primary/20 border-primary-container shadow-[0_0_20px_rgba(255,82,92,0.5)] animate-pulse';
    return 'bg-surface-dim/60 border-white/10';
  };

  return (
    <motion.div
      initial={state ? { rotateY: 90 } : false}
      animate={state ? { rotateY: 0 } : false}
      className={`w-8 h-10 sm:w-10 sm:h-14 md:w-14 md:h-18 flex items-center justify-center rounded-t-sm border-b-2 font-display text-lg sm:text-xl md:text-3xl transition-all ${getStyles()}`}
    >
      {letter}
    </motion.div>
  );
}
