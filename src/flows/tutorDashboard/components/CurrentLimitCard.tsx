import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, Typography, Button } from "@mui/material";

const currentLimit = 5000;

const CurrentLimitCard: React.FC = () => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        width: 500,
        backgroundColor: "white",
        boxShadow: 6,
      }}
    >
      {/* <Stack direction="row" spacing={2}>
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
      </Stack> */}
      <Stack
        direction="row"
        justifyContent="space-between"
        display="flex"
        pl={3}
        pr={2}
        pt={2}
        spacing={5}
      >
        <Stack spacing={1}>
          <Typography fontSize={15} fontWeight={600}>
            Current Limit
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography fontSize={26} fontWeight={650}>
              {formatter.format(currentLimit)}
            </Typography>
            <Typography
              fontSize={11}
              fontWeight="bold"
              color="#898989"
              pt={1.5}
            >
              /transaction
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography fontSize={12} color="#898989">
              Settlement in
            </Typography>
            <Typography fontSize={12} fontWeight="bold" color="#898989">
              24 hours
            </Typography>
          </Stack>
        </Stack>
        <Stack alignItems="center" justifyContent="center" spacing={2}>
          <Typography fontSize={12} fontWeight={600} align="center">
            Complete KYC to increase limit to ₹50,000
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#507FFD",
              borderRadius: 3,
              fontSize: 11,
              fontWeight: "bold",
              width: 150,
              height: 35,
              textTransform: "none",
            }}
          >
            Complete KYC
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
export default CurrentLimitCard;
