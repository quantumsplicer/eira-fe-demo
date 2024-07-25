// src/App.tsx
import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppRoutes />
    </Box>
  );
};

export default App;