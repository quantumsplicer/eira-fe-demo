import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, Typography } from "@mui/material";

interface AmountBreakupCardProps {
  amount: number;
}

const AmountBreakupCard = ({ amount }: AmountBreakupCardProps) => {
  return (
    <Stack
      sx={{
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
        alignItems: "center",
        justifyContent: "center",
        width: "360px",
      }}
      p={3}
      spacing={3}
    >
      <Stack pt={2}>
        <Typography fontSize={17} fontWeight="bold">
          Amount Breakup
        </Typography>
      </Stack>
      <Stack width="100%" spacing={1.5}>
        <Stack spacing={1}>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography fontSize={15} color="#7E7E7E">
              Payment Amount:
            </Typography>
            <Typography fontSize={15} fontWeight={550}>
              ₹ {amount}
            </Typography>
          </Stack>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography fontSize={15} color="#7E7E7E">
              Platform Fees(1%)
            </Typography>
            <Typography fontSize={15} fontWeight={550}>
              ₹ {amount * 0.01}
            </Typography>
          </Stack>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography fontSize={15} color="#7E7E7E">
              GST (18% of Platform fees):
            </Typography>
            <Typography fontSize={15} fontWeight={550}>
              ₹ {(amount * 0.01 * 0.18).toFixed(2)}
            </Typography>
          </Stack>
        </Stack>

        <Divider />
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Typography fontWeight="bold">Total Payable</Typography>
          <Typography fontSize={20} color="#2AC426" fontWeight={600}>
            ₹ {(amount * 1.0118).toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography>Settlement on 7th January at 5pm</Typography>
      </Stack>
    </Stack>
  );
};
export default AmountBreakupCard;
