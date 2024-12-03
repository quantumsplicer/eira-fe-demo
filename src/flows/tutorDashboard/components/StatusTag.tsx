import React, { useMemo } from "react";
import { Box, Tooltip } from "@mui/material";

interface StatusTagProps {
  cellValue: string;
}

const StatusTag = ({ cellValue }: StatusTagProps) => {
  const status = useMemo(() => {
    return cellValue === "SUCCESS" || cellValue === "BENE_SETTLED"
      ? "Success"
      : cellValue === "PG_SETTLED"
      ? "Settlement pending"
      : cellValue === "REFUNDED"
      ? "Refunded"
      : "Failed";
  }, [cellValue]);
  return (
    <Tooltip
      title={
        status === "Success"
          ? "Payment was successfully settled into tutor's account"
          : status === "Settlement pending"
          ? "Money has been debited and will be settled into tutor's account shortly"
          : status === "Failed"
          ? "Payment failed"
          : "Refunded"
      }
    >
      <Box
        component="span"
        sx={() => ({
          backgroundColor:
            status === "Failed"
              ? "#FBE7E8"
              : status === "Settlement pending"
              ? "#FEF2E5"
              : "#EBF9F1",
          borderRadius: "1rem",
          color:
            status === "Failed"
              ? "#A30D11"
              : status === "Settlement pending"
              ? "#CD6200"
              : "#3BB900",
          p: "0.4rem",
          pl: "0.8rem",
          pr: "0.8rem",
          width: "fullwidth",
          fontWeight: "bold",
        })}
      >
        {status}
      </Box>
    </Tooltip>
  );
};
export default StatusTag;
