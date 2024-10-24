import { Box, Typography } from "@mui/material";
import React from "react";

export const PageNotFound = () => {
  return (
    <Box sx={{
        textAlign: "center",
        padding: "20px",
        margin: "auto",
        marginTop: '35vh',
        maxWidth: "500px",
    }}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Page Not Found</Typography>

      <p>Sorry, the page you are looking for does not exist.</p>
    </Box>
  );
};
