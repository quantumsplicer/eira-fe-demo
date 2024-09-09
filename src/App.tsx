// src/App.tsx
import React from "react";
import { CssBaseline, Box } from "@mui/material";
import AppRoutes from "./routes";
import { PushNotification } from "./components/PushNotification";

const App: React.FC = () => {
  return (
    <Box sx={{marginTop: -3}}>
      <CssBaseline />
      <AppRoutes />
      <PushNotification />
    </Box>
  );
};

export default App;
