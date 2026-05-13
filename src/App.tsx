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
import { GameScreen } from './types';
import Splash from './screens/Splash';
import Menu from './screens/Menu';
import Breach from './screens/Breach';
import Loot from './screens/Loot';
import Stash from './screens/Stash';
import Intel from './screens/Intel';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>(GameScreen.SPLASH);
  const [stats, setStats] = useState({
    xp: 2400,
    credits: 15200,
    diamonds: 1240,
    streak: 0,
  });

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('spell_heist_stats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
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
              onSelectHeist={() => navigate(GameScreen.BREACH)} 
              onNavigate={navigate}
            />
          )}
          {currentScreen === GameScreen.BREACH && (
            <Breach 
              onWin={(loot) => {
                updateStats({
                  xp: stats.xp + loot.xp,
                  credits: stats.credits + loot.credits,
                  diamonds: stats.diamonds + loot.diamonds,
                });
                navigate(GameScreen.LOOT);
              }}
              onLose={() => navigate(GameScreen.MENU)}
            />
          )}
          {currentScreen === GameScreen.LOOT && (
            <Loot onCollect={() => navigate(GameScreen.MENU)} />
          )}
          {currentScreen === GameScreen.STASH && (
            <Stash stats={stats} onNavigate={navigate} />
          )}
          {currentScreen === GameScreen.INTEL && (
            <Intel stats={stats} onNavigate={navigate} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
