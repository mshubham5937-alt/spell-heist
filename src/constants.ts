/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Difficulty, DifficultyConfig } from './types';

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  [Difficulty.TUTORIAL]: {
    name: "TUTORIAL",
    maxAttempts: 6,
    alarmIncrement: 0,
    basePayout: 1000,
    baseXp: 500,
    wordLengths: [4],
    scanCost: 0,
    removeCost: 0,
  },
  [Difficulty.EASY]: {
    name: "EASY",
    maxAttempts: 6,
    alarmIncrement: 8,
    basePayout: 5000,
    baseXp: 1000,
    wordLengths: [5],
    scanCost: 500,
    removeCost: 300,
  },
  [Difficulty.MEDIUM]: {
    name: "MEDIUM",
    maxAttempts: 6,
    alarmIncrement: 15,
    basePayout: 12000,
    baseXp: 2500,
    wordLengths: [5],
    scanCost: 1200,
    removeCost: 750,
  },
  [Difficulty.HARD]: {
    name: "HARD",
    maxAttempts: 6,
    alarmIncrement: 25,
    basePayout: 30000,
    baseXp: 6000,
    wordLengths: [5],
    scanCost: 3000,
    removeCost: 1800,
  }
};

export const INITIAL_STATE = {
  maxAttempts: 6,
  initialPayout: 10000,
  alarmIncrement: 15,
};
