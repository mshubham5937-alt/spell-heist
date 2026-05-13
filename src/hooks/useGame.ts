/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo } from 'react';
import { WORD_LISTS, INITIAL_STATE } from '../constants';
import { LetterState } from '../types';
import { DICTIONARY, ALL_WORDS } from '../data/dictionary';

export function useGame() {
  const [targetWord, setTargetWord] = useState(() => {
    // Pick a random word from the comprehensive dictionary
    const randomIndex = Math.floor(Math.random() * ALL_WORDS.length);
    return ALL_WORDS[randomIndex].toUpperCase();
  });

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [alarmLevel, setAlarmLevel] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  const wordLength = targetWord.length;
  const maxAttempts = INITIAL_STATE.maxAttempts;

  const getLetterState = useCallback((letter: string, index: number, guessWord: string): LetterState => {
    if (guessWord[index] === targetWord[index]) return LetterState.CORRECT;
    if (targetWord.includes(letter)) return LetterState.PRESENT;
    return LetterState.ABSENT;
  }, [targetWord]);

  const keyboardLetterStates = useMemo(() => {
    const states: Record<string, LetterState> = {};
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
  }, [guesses, getLetterState]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length !== wordLength || guesses.length >= maxAttempts || isGameOver) return;

    // Validate word
    if (!DICTIONARY.has(currentGuess.toUpperCase())) {
      setValidationError('NOT A WORD');
      setTimeout(() => setValidationError(null), 1500);
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    
    if (currentGuess === targetWord) {
      setIsWin(true);
      setIsGameOver(true);
    } else if (newGuesses.length >= maxAttempts) {
      setIsGameOver(true);
    } else {
      setAlarmLevel(prev => Math.min(100, prev + INITIAL_STATE.alarmIncrement));
    }
    
    setCurrentGuess('');
  }, [currentGuess, guesses, targetWord, wordLength, maxAttempts, isGameOver]);

  const onKeyPress = useCallback((key: string) => {
    if (isGameOver) return;

    if (key === 'ENTER' || key === 'INJECT') {
      submitGuess();
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      setValidationError(null);
    } else if (key.length === 1 && /^[A-Z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        setCurrentGuess(prev => (prev + key).toUpperCase());
        setValidationError(null);
      }
    }
  }, [currentGuess, isGameOver, submitGuess, wordLength]);

  const payout = useMemo(() => {
    return Math.max(0, INITIAL_STATE.initialPayout - (guesses.length * 1500) - (alarmLevel * 50));
  }, [guesses.length, alarmLevel]);

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
  };
}
