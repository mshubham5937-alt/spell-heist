/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameScreen, Difficulty } from './types';
import Splash from './screens/Splash';
import Menu from './screens/Menu';
import Breach from './screens/Breach';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>(GameScreen.SPLASH);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [stats, setStats] = useState({
    xp: 2400,
    credits: 15200,
    diamonds: 1240,
    streak: 0,
    hasCompletedTutorial: false,
    wins: {
      EASY: 0,
      MEDIUM: 0,
      HARD: 0,
      TUTORIAL: 0
    }
  });

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('spell_heist_stats');
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      if (!parsed.wins) {
        parsed.wins = { EASY: 0, MEDIUM: 0, HARD: 0, TUTORIAL: 0 };
      }
      setStats({
        hasCompletedTutorial: false, // Default if missing
        ...parsed
      });
    }
  }, []);

  // Save stats to localStorage when they change
  useEffect(() => {
    localStorage.setItem('spell_heist_stats', JSON.stringify(stats));
  }, [stats]);

  const navigate = (screen: GameScreen) => {
    setCurrentScreen(screen);
  };

  const updateStats = (delta: Partial<typeof stats>) => {
    setStats(prev => ({ ...prev, ...delta }));
  };

  const handleStartHeist = (diff: Difficulty) => {
    setCurrentDifficulty(diff);
    navigate(GameScreen.BREACH);
  };

  return (
    <div className="min-h-screen w-full bg-background text-on-surface flex flex-col font-sans overflow-x-hidden scrollbar-hide scanline">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 w-full"
        >
          {currentScreen === GameScreen.SPLASH && (
            <Splash onComplete={() => navigate(GameScreen.MENU)} />
          )}
          {currentScreen === GameScreen.MENU && (
            <Menu 
              stats={stats} 
              onSelectHeist={handleStartHeist}
            />
          )}
          {currentScreen === GameScreen.BREACH && (
            <Breach 
              stats={stats}
              difficulty={currentDifficulty}
              onBuyPowerup={(cost: number) => {
                if (stats.credits >= cost) {
                  updateStats({ credits: stats.credits - cost });
                  return true;
                }
                return false;
              }}
              onWin={(loot) => {
                const newWins = { ...stats.wins };
                newWins[currentDifficulty] += 1;
                
                const updates: Partial<typeof stats> = {
                  xp: stats.xp + loot.xp,
                  credits: stats.credits + loot.credits,
                  diamonds: stats.diamonds + loot.diamonds,
                  wins: newWins
                };
                
                if (currentDifficulty === Difficulty.TUTORIAL) {
                  updates.hasCompletedTutorial = true;
                }
                
                updateStats(updates);
                navigate(GameScreen.MENU);
              }}
              onLose={() => navigate(GameScreen.MENU)}
              onBack={() => navigate(GameScreen.MENU)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
