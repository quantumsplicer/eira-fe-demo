// src/App.tsx
import React, { useEffect } from "react";
import { CssBaseline, Box } from "@mui/material";
import AppRoutes from "./routes";
import { Provider } from "react-redux";
import store from "./stores/configuration";
import { initializeAmplitude } from "./utils/amplitude";

const App: React.FC = () => {

  useEffect(() => {
    if(localStorage.getItem("phoneNumber")) {
      initializeAmplitude();
    }
  }, [])

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
