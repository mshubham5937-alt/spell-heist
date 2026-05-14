/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum GameScreen {
  SPLASH = 'SPLASH',
  MENU = 'MENU',
  BREACH = 'BREACH',
}

export enum Difficulty {
  TUTORIAL = 'TUTORIAL',
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface DifficultyConfig {
  name: string;
  maxAttempts: number;
  alarmIncrement: number;
  basePayout: number;
  baseXp: number;
  wordLengths: number[];
  scanCost: number;
  removeCost: number;
}

export enum LetterState {
  INITIAL = 'INITIAL',
  CORRECT = 'CORRECT',
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

export interface GuessResult {
  letter: string;
  state: LetterState;
}

export interface GameState {
  targetWord: string;
  guesses: string[];
  maxAttempts: number;
  alarmLevel: number; // 0 to 100
  payout: number;
  xp: number;
  credits: number;
  diamonds: number;
  streak: number;
}
