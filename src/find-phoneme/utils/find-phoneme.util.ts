// Utils
import { sample } from 'lodash';

// Types
import { Phoneme, PhonemeCollection } from '../../data/types/phoneme.type';
import { FindPhonemeSettings } from '../types/find-phoneme.type';

export const findAvailablePhonemesFromSettings = (
  settings: FindPhonemeSettings,
  collection: PhonemeCollection,
): Phoneme[] => [
  ...(settings.include.consonant ? collection.consonnants : []),
  ...(settings.include.vowel ? collection.vowels : []),
  ...(settings.include.semiVowel ? collection.semiVowels : []),
];

export const getRandomPhonemeInCollectionFromSettings = (
  settings: FindPhonemeSettings,
  collection: PhonemeCollection,
): Phoneme => {
  const phonemes = findAvailablePhonemesFromSettings(settings, collection);

  return sample(phonemes) as Phoneme;
};

export const buildPhonemeQuestion = (phoneme: Phoneme): string => `Quel phoneme est ${phoneme.symbol} ?`;
