/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const WORD_LISTS = {
  technology: ['MODEM', 'CACHE', 'DEBUG', 'LOGIC', 'PROXY', 'ARRAY', 'SHIFT', 'INPUT', 'VOICE', 'IMAGE'],
  crime: ['HEIST', 'CRACK', 'THIEF', 'CRIME', 'AGENT', 'GHOST', 'BREAK', 'ALERT', 'GUARD', 'STORM'],
  money: ['VAULT', 'MONEY', 'STOCK', 'PRICE', 'BONUS', 'FUNDS', 'BANKS', 'ASSET', 'TRADE', 'COINS'],
  hacking: ['PHISH', 'PATCH', 'VIRUS', 'PROXY', 'SHELL', 'SHARK', 'STEAL', 'FLINT', 'BREAK', 'ENTER'],
  luxury: ['ELITE', 'PRIME', 'GRAND', 'SHINY', 'PEARL', 'CROWN', 'ROYAL', 'JEWEL', 'METAL', 'EXTRA'],
};

// Ensure all are exactly 5 letters and uppercase
Object.keys(WORD_LISTS).forEach(cat => {
  (WORD_LISTS as any)[cat] = (WORD_LISTS as any)[cat].map((w: string) => {
    const clean = w.toUpperCase().replace(/[^A-Z]/g, '');
    if (clean.length > 5) return clean.slice(0, 5);
    if (clean.length < 5) return clean.padEnd(5, 'S'); // Fallback padding
    return clean;
  });
});

export const INITIAL_STATE = {
  maxAttempts: 6,
  initialPayout: 10000,
  alarmIncrement: 15,
};
