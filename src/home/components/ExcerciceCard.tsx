import React, { FC } from 'react';

// MUI
import {
  Box, Button, Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// i18n
import { t } from 'i18next';
import { Link } from 'react-router-dom';

type Props = {
  title: string;
  description: string;
  route: string;
};

const ExerciseCard: FC<Props> = ({ title, description, route }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      border: 1,
      backgroundColor: theme.palette.grey[100],
      borderColor: theme.palette.grey[200],
      borderRadius: 1,
    }}
    >
      <Box sx={{
        padding: 1,
      }}
      >
        <Typography sx={{ mb: 1 }} variant="h3">{title}</Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </Box>
      <Box sx={{
        padding: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: 1,
        borderColor: theme.palette.grey[200],
      }}
      >
        <Link to={route}>
          <Button variant="contained" endIcon={<ArrowForwardIcon />}>{t('home.excercices.open')}</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ExerciseCard;
