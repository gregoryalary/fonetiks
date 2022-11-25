import * as React from 'react';

// Components
import {
  AppBar as MuiAppBar, Box, Toolbar, Typography,
} from '@mui/material';

// i18n
import { t } from 'i18next';
import { Link } from 'react-router-dom';

function AppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t('title')}
            </Typography>
          </Link>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}

export default AppBar;
