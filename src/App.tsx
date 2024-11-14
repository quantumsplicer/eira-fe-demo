// src/App.tsx
import React from "react";
import { CssBaseline, Box } from "@mui/material";
import AppRoutes from "./routes";
import { Provider } from "react-redux";
import store from "./stores/configuration";

const App: React.FC = () => {
  return (
    <Box>
      <Provider store={store}>
        <CssBaseline />
        <AppRoutes />
      </Provider>
    </Box>
  );
};

export default App;
