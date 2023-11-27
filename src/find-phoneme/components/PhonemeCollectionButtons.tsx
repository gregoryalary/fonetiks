import React, { FC } from 'react';

// MUI
import {
  Button, Grid, Typography, Stack,
} from '@mui/material';

// Types
import { Phoneme, PhonemeCollection } from '../../data/types/phoneme.type';
import { FindPhonemeSettings } from '../types/find-phoneme.type';

type PhonemeCollectionCategoryProps = {
  phonemes: Phoneme[],
  title: string,
  highlightedPhoneme?: Phoneme,
  onClick: (phoneme: Phoneme) => any
};

const PhonemeCollectionCategory: FC<PhonemeCollectionCategoryProps> = ({
  phonemes,
  title,
  highlightedPhoneme = undefined,
  onClick,
}) => {
  const getButtonColor = (phoneme: Phoneme) => {
    if (highlightedPhoneme) {
      return highlightedPhoneme.symbol === phoneme.symbol ? 'success' : 'error';
    }
    return 'info';
  };

  const getButtonVariant = (
    phoneme: Phoneme,
  ) => (highlightedPhoneme && highlightedPhoneme.symbol === phoneme.symbol
    ? 'contained'
    : 'outlined');

  return (
    <Stack>
      <Typography>{title}</Typography>
      <Grid container spacing={1}>
        {phonemes.map((phoneme, index) => (
          <Grid item xs={3} key={`${index}${phoneme.symbol}`}>
            <Button
              sx={{ textTransform: 'none' }}
              onClick={() => onClick(phoneme)}
              fullWidth
              size="medium"
              variant={getButtonVariant(phoneme)}
              color={getButtonColor(phoneme)}
            >
              {phoneme.symbol}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

type Props = {
  settings: FindPhonemeSettings,
  collection: PhonemeCollection,
  highlightedPhoneme?: Phoneme,
  onClick: (phoneme: Phoneme) => any
};

const PhonemeCollectionButtons: FC<Props> = ({
  settings, collection, highlightedPhoneme = undefined, onClick,
}) => (
  <Stack spacing={2}>
    {settings.include.consonant && (
    <PhonemeCollectionCategory
      phonemes={collection.consonnants}
      title="Consonnes"
      onClick={onClick}
      highlightedPhoneme={highlightedPhoneme}
    />
    )}
    {settings.include.vowel && (
    <PhonemeCollectionCategory
      phonemes={collection.vowels}
      title="Voyelles"
      onClick={onClick}
      highlightedPhoneme={highlightedPhoneme}
    />
    )}
    {/* settings.include.semiVowel && (
    <PhonemeCollectionCategory
      phonemes={collection.semiVowels}
      title="Semi-voyelles"
      onClick={onClick}
      highlightedPhoneme={highlightedPhoneme}
    />
    ) */}
  </Stack>
);

export default PhonemeCollectionButtons;
