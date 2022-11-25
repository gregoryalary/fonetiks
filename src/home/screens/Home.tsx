// React
import React, { FC } from 'react';

// i18n
import { t } from 'i18next';

// MUI
import { Box, Typography } from '@mui/material';

// Components
import ExerciseCard from '../components/ExcerciceCard';

const Home: FC = () => (
  <Box>
    <Box sx={{ mb: 2 }}>
      <Typography variant="h2" sx={{ mb: 1 }}>
        {t('home.introduction.title')}
      </Typography>
      <Typography variant="body1">
        {t('home.introduction.body')}
      </Typography>
    </Box>
    <Box>
      <Typography variant="h2" sx={{ mb: 1 }}>
        {t('home.excercices.title')}
      </Typography>
      <Box>
        <ExerciseCard title={t('home.excercices.find_phoneme.title')} description={t('home.excercices.find_phoneme.description')} route="/excercice/find-phoneme" />
      </Box>
    </Box>
  </Box>
);

export default Home;
