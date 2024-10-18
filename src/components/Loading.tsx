import { CircularProgress, Typography } from "@mui/material";
import { text } from "node:stream/consumers";
import React from "react";

interface LoadingProps {
  text?: string;
  height?: string;
}

export const Loading = ({ text, height = "100vh" }: LoadingProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: height,
      }}
    >
      <CircularProgress />
      {text && (
        <Typography variant="h6" sx={{ ml: 2 }}>
          {text}
        </Typography>
      )}
    </div>
  );
};
