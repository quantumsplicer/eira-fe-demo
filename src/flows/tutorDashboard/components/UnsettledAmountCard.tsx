import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, Typography } from "@mui/material";

const amount = 20000;
const UnsettledAmountCard: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        width: 480,
        backgroundColor: "white",
        boxShadow: 6,
      }}
    >
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            backgroundColor: "#EBF9F1",
            width: 190,
            alignContent: "center",
            borderRadius: 2,
            p: 2,
          }}
        >
          <Stack spacing={0.5} sx={{ alignContent: "center" }}>
            <Typography sx={{ fontSize: 15, fontWeight: "bold" }}>
              Unsettled Amounts
            </Typography>
            <Typography
              sx={{ color: "#3BB900", fontSize: 27, fontWeight: "bold" }}
            >
              {amount}
            </Typography>
            <Typography sx={{ fontSize: 10 }}>
              Next settlement in 13 hours
            </Typography>
          </Stack>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box pt={2}>
          <Stack spacing={4}>
            <Stack direction="row" spacing={2}>
              <Typography sx={{ fontSize: 14 }}>12</Typography>
              <Typography sx={{ fontSize: 12 }}>
                Transactions since last settlement
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography sx={{ fontSize: 14 }}>2000</Typography>
              <Typography sx={{ fontSize: 12 }}>
                Average transaction amount
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
export default UnsettledAmountCard;
