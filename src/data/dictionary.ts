/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import englishWords from 'an-array-of-english-words';

export const ALL_WORDS = englishWords.map(w => w.toUpperCase());
export const DICTIONARY = new Set(ALL_WORDS);

// Ensure ADIEU is included as requested
if (!DICTIONARY.has('ADIEU')) {
  DICTIONARY.add('ADIEU');
}

