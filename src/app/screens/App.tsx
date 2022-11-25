// React
import React from 'react';

// Mui
import {
  Box, createTheme, responsiveFontSizes, ThemeProvider,
} from '@mui/material';

// Routing
import { Outlet } from 'react-router-dom';

// Styling
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBar from '../components/AppBar';

function App() {
  const theme = responsiveFontSizes(createTheme({
    typography: {
      h2: {
        fontSize: 40,
        lineHeight: 1.5,
      },
      h3: {
        fontSize: 30,
        lineHeight: 1.3,
      },
    },
    // todo?
  }));

  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Box padding={1}>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
}

export default App;
