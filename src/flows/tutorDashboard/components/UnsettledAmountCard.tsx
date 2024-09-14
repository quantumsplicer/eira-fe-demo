import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, Typography } from "@mui/material";

const amount = 20000;

const UnsettledAmountCard: React.FC = () => {
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
            <Typography fontWeight={600} sx={{ fontSize: 15 }}>
              Unsettled Amount
            </Typography>
            <Typography
              fontWeight={650}
              sx={{ color: "#3BB900", fontSize: 27 }}
            >
              {formatter.format(amount)}
            </Typography>
            <Stack>
              <Typography sx={{ fontSize: 10 }} color="#898989">
                Next settlement on
              </Typography>
              <Typography
                sx={{ fontSize: 10 }}
                fontWeight="bold"
                color="#898989"
              >
                13th May 20234 at 5:00pm
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box pt={4}>
          <Stack spacing={4}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              display="flex"
            >
              <Typography sx={{ fontSize: 13 }} fontWeight="bold">
                12
              </Typography>
              <Typography sx={{ fontSize: 11 }}>
                Transactions since last settlement
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="space-between"
              display="flex"
            >
              <Typography sx={{ fontSize: 13 }} fontWeight="bold">
                {formatter.format(amount)}
              </Typography>
              <Typography sx={{ fontSize: 11 }}>
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
