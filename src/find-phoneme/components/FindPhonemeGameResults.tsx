import React, { FC, useMemo } from 'react';

// MUI
import {
  Box, Button, Stack, Typography, useTheme,
} from '@mui/material';

// i18n
import { useTranslation } from 'react-i18next';

// Routing
import { PlayedRound } from '../types/find-phoneme.type';

// Utils
import usePhonemeQuestionBuilder from '../hooks/usePhonemeQuestionBuilder';

type Props = {
  playedRounds: PlayedRound[],
  onReplay: () => any
};

const FindPhonemeResults: FC<Props> = ({ playedRounds, onReplay }) => {
  const { t } = useTranslation();
  const phonemeQuestionBuilder = usePhonemeQuestionBuilder();
  const theme = useTheme();

  const wrongAnswers = useMemo(
    () => playedRounds.filter(
      (playedRound) => playedRound.guessed.symbol !== playedRound.toGuess.symbol,
    ),
    [playedRounds],
  );

  return (
    <Stack spacing={2}>
      <Typography>
        {t('find_phoneme.result.title')}
      </Typography>
      <Typography>
        {t('find_phoneme.result.score', { score: playedRounds.length - wrongAnswers.length, max: playedRounds.length })}
      </Typography>
      {wrongAnswers.length > 0 && (
        <Stack spacing={1}>
          <Typography>
            {t('find_phoneme.result.bad_answers.title', { count: wrongAnswers.length })}
          </Typography>
          <Stack spacing={1}>
            {wrongAnswers.map((wrongAnswer) => (
              <Box sx={{
                border: 1,
                backgroundColor: theme.palette.grey[100],
                borderColor: theme.palette.grey[200],
                borderRadius: 1,
                padding: 1,
              }}
              >
                <Typography>
                  {phonemeQuestionBuilder(wrongAnswer.toGuess)}
                </Typography>
                <Typography color="error">
                  {t('find_phoneme.result.bad_answers.guessed', { symbol: wrongAnswer.guessed.symbol })}
                </Typography>
                <Typography color="green">
                  {t('find_phoneme.result.bad_answers.to_guess', { symbol: wrongAnswer.toGuess.symbol })}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      )}
      <Button onClick={onReplay}>
        {t('find_phoneme.result.replay')}
      </Button>
    </Stack>
  );
};

export default FindPhonemeResults;
