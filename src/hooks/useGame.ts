/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo } from 'react';
import { DIFFICULTY_CONFIGS } from '../constants';
import { LetterState, Difficulty } from '../types';
import { DICTIONARY } from '../data/dictionary';
import { EASY_WORDS, MEDIUM_WORDS, HARD_WORDS } from '../data/words';
import { Haptics } from '../lib/haptics';

export function useGame(difficulty: Difficulty = Difficulty.MEDIUM) {
  const config = DIFFICULTY_CONFIGS[difficulty];
  
  const [targetWord, setTargetWord] = useState(() => {
    if (difficulty === Difficulty.TUTORIAL) return 'CODE';
    let wordList = MEDIUM_WORDS;
    if (difficulty === Difficulty.EASY) wordList = EASY_WORDS;
    if (difficulty === Difficulty.HARD) wordList = HARD_WORDS;
    
    if (wordList.length === 0) wordList = ["HACK"]; // Fallback
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex].toUpperCase();
  });

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [alarmLevel, setAlarmLevel] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Powerup state
  const [scanUses, setScanUses] = useState(1);
  const [removeUses, setRemoveUses] = useState(1);
  const [hints, setHints] = useState<Record<number, string>>({});
  const [removedFakeLetters, setRemovedFakeLetters] = useState<Set<string>>(new Set());

  const addScanUse = useCallback(() => setScanUses(prev => prev + 1), []);
  const addRemoveUse = useCallback(() => setRemoveUses(prev => prev + 1), []);

  const wordLength = targetWord.length;
  const maxAttempts = config.maxAttempts;

  const getLetterState = useCallback((letter: string, index: number, guessWord: string): LetterState => {
    if (guessWord[index] === targetWord[index]) return LetterState.CORRECT;
    if (targetWord.includes(letter)) return LetterState.PRESENT;
    return LetterState.ABSENT;
  }, [targetWord]);

  const keyboardLetterStates = useMemo(() => {
    const states: Record<string, LetterState> = {};
    // Apply powerup removals
    removedFakeLetters.forEach(l => states[l] = LetterState.ABSENT);
    
    guesses.forEach(guess => {
      guess.split('').forEach((letter, i) => {
        const currentState = getLetterState(letter, i, guess);
        if (!states[letter] || 
            (currentState === LetterState.CORRECT) || 
            (currentState === LetterState.PRESENT && states[letter] !== LetterState.CORRECT)) {
          states[letter] = currentState;
        }
      });
    });
    return states;
  }, [guesses, getLetterState, removedFakeLetters]);

  const useScanPowerup = useCallback(() => {
    if (scanUses <= 0 || isGameOver) return;
    const correctIndices = new Set<number>();
    guesses.forEach(guess => {
       guess.split('').forEach((l, i) => {
         if (l === targetWord[i]) correctIndices.add(i);
       });
    });
    const available = [];
    for (let i = 0; i < wordLength; i++) {
       if (!correctIndices.has(i) && !hints[i]) available.push(i);
    }
    if (available.length > 0) {
      const idx = available[Math.floor(Math.random() * available.length)];
      setHints(prev => ({...prev, [idx]: targetWord[idx]}));
      setScanUses(prev => prev - 1);
    }
  }, [scanUses, isGameOver, guesses, hints, targetWord, wordLength]);

  const useRemoveFakePowerup = useCallback(() => {
    if (removeUses <= 0 || isGameOver) return;
    const availableToRemove: string[] = [];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    alphabet.forEach(letter => {
      if (!targetWord.includes(letter) && !removedFakeLetters.has(letter) && keyboardLetterStates[letter] !== LetterState.ABSENT) {
         availableToRemove.push(letter);
      }
    });
    if (availableToRemove.length > 0) {
      const toRemove = [];
      const numToRemove = Math.min(3, availableToRemove.length); // Remove up to 3 letters
      for(let i=0; i<numToRemove; i++) {
        const rIndex = Math.floor(Math.random() * availableToRemove.length);
        toRemove.push(availableToRemove.splice(rIndex, 1)[0]);
      }
      setRemovedFakeLetters(prev => new Set([...prev, ...toRemove]));
      setRemoveUses(prev => prev - 1);
    }
  }, [removeUses, isGameOver, targetWord, removedFakeLetters, keyboardLetterStates]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== wordLength || guesses.length >= maxAttempts || isGameOver) return;

    // Validate word
    if (!DICTIONARY.has(currentGuess.toUpperCase())) {
      Haptics.error();
      setValidationError('NOT A WORD');
      setTimeout(() => setValidationError(null), 1500);
      return;
    }

    Haptics.submit();
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    
    if (currentGuess === targetWord) {
      setTimeout(Haptics.success, 300); // delay for reveal
      setIsWin(true);
      setIsGameOver(true);
    } else if (newGuesses.length >= maxAttempts) {
      setTimeout(Haptics.error, 300);
      setIsGameOver(true);
    } else {
      setTimeout(Haptics.alarm, 300);
      setAlarmLevel(prev => Math.min(100, prev + config.alarmIncrement));
    }
    
    setCurrentGuess('');
  }, [currentGuess, guesses, targetWord, wordLength, maxAttempts, isGameOver]);

  const onKeyPress = useCallback((key: string) => {
    if (isGameOver) return;

    if (key === 'ENTER' || key === 'INJECT') {
      submitGuess();
    } else if (key === 'BACKSPACE') {
      Haptics.tap();
      setCurrentGuess(prev => prev.slice(0, -1));
      setValidationError(null);
    } else if (key.length === 1 && /^[A-Z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        Haptics.tap();
        setCurrentGuess(prev => (prev + key).toUpperCase());
        setValidationError(null);
      }
    }
  }, [currentGuess, isGameOver, submitGuess, wordLength]);

  const payout = useMemo(() => {
    return config.basePayout;
  }, [config.basePayout]);

  return {
    targetWord,
    guesses,
    currentGuess,
    isGameOver,
    isWin,
    alarmLevel,
    validationError,
    payout,
    onKeyPress,
    getLetterState,
    keyboardLetterStates,
    wordLength,
    maxAttempts,
    scanUses,
    removeUses,
    useScanPowerup,
    useRemoveFakePowerup,
    addScanUse,
    addRemoveUse,
    hints,
    difficulty,
    config,
  };
}
