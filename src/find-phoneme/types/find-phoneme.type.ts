import { Phoneme } from '../../data/types/phoneme.type';

export type FindPhonemeSettings = {
  round: number,
  include: {
    vowel: boolean,
    consonant: boolean,
    semiVowel: boolean
  }
};

export type PlayedRound = {
  index: number,
  toGuess: Phoneme,
  guessed: Phoneme
};
