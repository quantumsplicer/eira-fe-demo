import React from "react";
import { Box } from "@mui/material";

interface StatusTagProps {
  cellValue: string;
}
const StatusTag = ({ cellValue }: StatusTagProps) => {
  return (
    <Box
      component="span"
      sx={() => ({
        backgroundColor:
          cellValue === "Cancelled" || cellValue === "Failed"
            ? "#FBE7E8"
            : cellValue === "Scheduled" || cellValue === "Pending"
            ? "#FEF2E5"
            : "#EBF9F1",
        borderRadius: "1rem",
        color:
          cellValue === "Cancelled" || cellValue === "Failed"
            ? "#A30D11"
            : cellValue === "Scheduled" || cellValue === "Pending"
            ? "#CD6200"
            : "#3BB900",
        p: "0.5rem",
        width: "fullwidth",
      })}
    >
      {cellValue}
    </Box>
  );
};
export default StatusTag;
