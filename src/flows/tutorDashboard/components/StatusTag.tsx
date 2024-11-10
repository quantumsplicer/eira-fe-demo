import React from "react";
import { Box } from "@mui/material";

interface StatusTagProps {
  cellValue: string;
}
const failureStatusMap = new Map([
  ["Cancelled", "FAILED"],
  ["Failed", "FAILED"],
  ["No", "FAILED"],
  ["FAILED", "FAILED"],
  ["USER_DROPPED", "PENDING"],
  ["Pending", "PENDING"],
  ["Scheduled", "PENDING"],
  ["PENDING", "PENDING"],
]);

const StatusTag = ({ cellValue }: StatusTagProps) => {
  return (
    <Box
      component="span"
      sx={() => ({
        backgroundColor:
          failureStatusMap.get(cellValue) === "FAILED" || !cellValue
            ? "#FBE7E8"
            : failureStatusMap.get(cellValue) === "PENDING"
            ? "#FEF2E5"
            : "#EBF9F1",
        borderRadius: "1rem",
        color:
          failureStatusMap.get(cellValue) === "FAILED" || !cellValue
            ? "#A30D11"
            : failureStatusMap.get(cellValue) === "PENDING"
            ? "#CD6200"
            : "#3BB900",
        p: "0.4rem",
        pl: "0.8rem",
        pr: "0.8rem",
        width: "fullwidth",
        fontWeight: "bold",
      })}
    >
      {cellValue ? cellValue : "N/A"}
    </Box>
  );
};
export default StatusTag;
