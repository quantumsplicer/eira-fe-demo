import { Box, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import React, { useMemo } from "react";
import { getNextWorkingDay } from "../utils/helperFunctions";
import { useGetPlatformFeeQuery } from "../APIs/definitions/pg";

interface AmountBreakupCardProps {
  amount?: number;
  settlementDate?: string;
  settlementTime?: string;
}

const AmountBreakupCard = ({ amount }: AmountBreakupCardProps) => {
  const settlementDate = getNextWorkingDay();
  const settlementTime = "5:00 pm";
  const activePaymentAmount =
    Number(amount) ?? Number(localStorage.getItem("activePaymentAmount"));
  const activePaymentTutorId = localStorage.getItem("activePaymentTutorId");

  const baseRate = Number(localStorage.getItem("baseRate")) ?? 1;
  const platformTxnRate = Number(localStorage.getItem("platformTxnRate")) ?? 19.41;

  const formatAmount = (amount: number | undefined): string => {
    if (amount) {
      const amtStr = amount.toFixed(2).toString();
      const [whole, decimal] = amtStr.split(".");
      const lastThreeDigits = whole.slice(-3);
      let otherDigits = whole.slice(0, -3);

      if (otherDigits.length > 0) {
        otherDigits = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + ",";
      }
      let formattedAmount = otherDigits + lastThreeDigits;

      if (decimal !== undefined) {
        formattedAmount += "." + decimal;
      }

      return "₹" + formattedAmount;
    }
    return "-";
  };

  const getPlatformFees = (): string => {
    if (activePaymentAmount) {
      const fees = (activePaymentAmount * baseRate) / 100;
      return formatAmount(fees);
    }
    return "-";
  };

  const getGst = (): string => {
    if (activePaymentAmount) {
      const fees = (activePaymentAmount * baseRate) / 100;
      const gst = parseFloat(((platformTxnRate * fees) / 100).toFixed(2));
      return formatAmount(gst);
    }
    return "-";
  };

  const getTotalAmount = (): string => {
    if (activePaymentAmount) {
      const fees = (activePaymentAmount * baseRate) / 100;
      const gst = (platformTxnRate * fees) / 100;
      const activePaymentTotalAmt = formatAmount(parseFloat((fees + gst + activePaymentAmount).toFixed(2)));
      localStorage.setItem("activePaymentTotalAmount", parseFloat((fees + gst + activePaymentAmount).toFixed(2)).toString())
      return activePaymentTotalAmt;
    }
    return "-";
  };

  return (
    <Stack alignItems={"center"}>
      <Typography fontWeight={"bold"} mb={5} fontSize={18}>
        Amount Breakup
      </Typography>
      <Stack width={"90%"}>
        <Stack direction={"row"} justifyContent={"space-between"} mb={1}>
          <Typography color={"#7e7e7e"}>Payment Amount:</Typography>
          <Typography>{formatAmount(activePaymentAmount)}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} mb={1}>
          <Typography color={"#7e7e7e"}>
            Platform fees ({baseRate}
            %):
          </Typography>
          <Typography>{getPlatformFees()}</Typography>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} mb={1}>
          <Typography color={"#7e7e7e"}>Government and other charges:</Typography>
          <Typography>{getGst()}</Typography>
        </Stack>
        <Divider
          variant="fullWidth"
          sx={{
            borderStyle: "dashed",
            borderWidth: 0.5,
            borderColor: "#7e7e7e",
            opacity: 1,
          }}
        />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={1}
        >
          <Typography fontWeight={"bold"}>Total payable</Typography>
          <Typography color={"green"} fontWeight={"bold"} fontSize={20}>
            {getTotalAmount()}
          </Typography>
        </Stack>
      </Stack>
      <Stack justifyContent={"center"} mt={5}>
        <Typography textAlign={"center"} color={"#7e7e7e"} component={"span"} fontWeight={"bold"}>
          Settlement on 
          <Typography color="#000" component={"span"} fontWeight={"bold"}>
            {` ${settlementDate}`}
          </Typography>
          {` at`}
          <Typography color="#000" component={"span"} fontWeight={"bold"}>
            {` ${settlementTime}`}
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AmountBreakupCard;
