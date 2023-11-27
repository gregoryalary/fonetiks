/* eslint-disable @typescript-eslint/no-shadow */
import React, { FC, useEffect, useState } from 'react';

// MUI
import {
  Alert, Button, Snackbar, Stack, Typography, useTheme,
} from '@mui/material';

// i18n
import { useTranslation } from 'react-i18next';

// Utils
import { getPhonemes } from '../../data/utils/phoneme-data.util';
import { getRandomPhonemeInCollectionFromSettings } from '../utils/find-phoneme.util';
import usePhonemeQuestionBuilder from '../hooks/usePhonemeQuestionBuilder';

// Types
import { Phoneme, PhonemeCollection } from '../../data/types/phoneme.type';
import { FindPhonemeSettings, PlayedRound } from '../types/find-phoneme.type';

// Components
import PhonemeCollectionButtons from './PhonemeCollectionButtons';

type Props = {
  settings: FindPhonemeSettings,
  onGameIsEnded: (rounds: PlayedRound[]) => any
};

enum StateType {
  Guessing,
  Correcting,
  Ended,
}

type BaseState = {
  playedRounds: PlayedRound[],
  phonemeCollection: PhonemeCollection,
  phonemeToGuess: Phoneme,
};

type GuessingState = BaseState & {
  type: StateType.Guessing,
};

type CorrectingState = BaseState & {
  type: StateType.Correcting,
  guessedPhoneme: Phoneme
};

type EndedState = {
  type: StateType.Ended,
};

type State = GuessingState | CorrectingState | EndedState;

const FindPhonemeGame: FC<Props> = ({ settings, onGameIsEnded }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const phonemeQuestionBuilder = usePhonemeQuestionBuilder();

  const [state, setState] = useState<State>({
    type: StateType.Guessing,
    playedRounds: [],
    ...((): {
      phonemeToGuess: Phoneme,
      phonemeCollection: PhonemeCollection } => {
      const phonemeCollection = getPhonemes();
      return {
        phonemeCollection,
        phonemeToGuess: getRandomPhonemeInCollectionFromSettings(settings, phonemeCollection),
      };
    })(),
  });
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

  const goToNextRound = (state: GuessingState | CorrectingState, guessedPhoneme: Phoneme) => {
    const playedRounds: PlayedRound[] = [...state.playedRounds, {
      index: state.playedRounds.length,
      toGuess: state.phonemeToGuess,
      guessed: guessedPhoneme,
    }];

    if (playedRounds.length >= settings.round) {
      onGameIsEnded(playedRounds);
      setState({ type: StateType.Ended });
    } else {
      setState({
        ...state,
        type: StateType.Guessing,
        phonemeToGuess: getRandomPhonemeInCollectionFromSettings(settings, state.phonemeCollection),
        playedRounds,
      });
    }
  };

  const guess = (state: GuessingState, guessedPhoneme: Phoneme) => {
    if (guessedPhoneme.symbol !== state.phonemeToGuess.symbol) {
      setShowSuccessAlert(false);
      setState({
        ...state,
        type: StateType.Correcting,
        guessedPhoneme,
      });
    } else {
      if (showSuccessAlert) {
        setShowSuccessAlert(false);
        setTimeout(() => setShowSuccessAlert(true), 100);
      } else {
        setShowSuccessAlert(true);
      }
      goToNextRound(state, guessedPhoneme);
    }
  };

  useEffect(() => {
    if (showSuccessAlert) {
      setTimeout(() => setShowSuccessAlert(false), 1000);
    }
  }, [showSuccessAlert]);

  if (state.type === StateType.Guessing || state.type === StateType.Correcting) {
    return (
      <>
        <Snackbar
          open={showSuccessAlert}
          autoHideDuration={10000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          disableWindowBlurListener
        >
          <Alert onClose={() => setShowSuccessAlert(false)} severity="success" sx={{ width: '100%' }}>
            {t('find_phoneme.game.right')}
          </Alert>
        </Snackbar>

        <Stack spacing={2}>
          <Stack spacing={1} alignItems="center">
            <Typography color={theme.palette.grey[600]}>
              {t('find_phoneme.game.round', { current: state.playedRounds.length + 1, max: settings.round })}
            </Typography>
            <Typography fontSize={theme.typography.h6.fontSize}>
              {phonemeQuestionBuilder(state.phonemeToGuess)}
            </Typography>
          </Stack>
          {state.type === StateType.Guessing ? (
            <PhonemeCollectionButtons
              settings={settings}
              collection={state.phonemeCollection}
              onClick={(guessedPhoneme) => guess(state, guessedPhoneme)}
            />
          ) : (
            <>
              <Typography color="error">
                {t('find_phoneme.game.correction', { symbol: state.phonemeToGuess.symbol })}
              </Typography>
              <Button
                color="error"
                size="small"
                onClick={() => goToNextRound(state, state.guessedPhoneme)}
              >
                {t('find_phoneme.game.next')}
              </Button>

            </>
          )}
        </Stack>
      </>
    );
  }

  return null;
};

export default FindPhonemeGame;
