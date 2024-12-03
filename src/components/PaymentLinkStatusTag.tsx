import React, { useMemo } from "react";
import { Box } from "@mui/material";

interface PaymentLinkStatusTagProps {
  cellValue: string;
}

const PaymentLinkStatusTag = ({ cellValue }: PaymentLinkStatusTagProps) => {
  const status = useMemo(() => {
    return cellValue === "ACTIVE"
      ? "Active"
      : cellValue === "EXPIRED"
      ? "Expired"
      : "Inactive";
  }, [cellValue]);
  return (
    <Box
      component="span"
      sx={() => ({
        backgroundColor:
          status === "Expired"
            ? "#FBE7E8"
            : status === "Inactive"
            ? "#FEF2E5"
            : "#EBF9F1",
        borderRadius: "1rem",
        color:
          status === "Expired"
            ? "#A30D11"
            : status === "Inactive"
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
  );
};
export default PaymentLinkStatusTag;
