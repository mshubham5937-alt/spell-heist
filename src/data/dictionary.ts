/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ALL_WORDS_JSON from './dictionary.json';

// Comprehensive 5-letter English word list (14,000+ words)
export const ALL_WORDS = ALL_WORDS_JSON;
export const DICTIONARY = new Set(ALL_WORDS);

// Ensure ADIEU is included as requested
if (!DICTIONARY.has('ADIEU')) {
  DICTIONARY.add('ADIEU');
}
