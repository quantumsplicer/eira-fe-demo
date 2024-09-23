import * as React from "react";
import Box from "@mui/material/Box";
import {
  Divider,
  Stack,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";

const currentLimit = 5000;

const CurrentLimitCard: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  return (
    <Box
      sx={
        !isPhoneScreen
          ? {
              p: 2,
              borderRadius: 2,
              width: "50%",
              backgroundColor: "white",
              boxShadow: 6,
            }
          : {
              p: 2,
              width: "100%",
              backgroundColor: "white",
              height: 350,
            }
      }
    >
      <Stack
        direction={!isPhoneScreen ? "row" : "column"}
        sx={
          !isPhoneScreen
            ? { justifyContent: "space-between", pl: 3, pr: 2, pt: 2 }
            : {
                justifyContent: "space-between",
                pr: 0,
                height: "100%",
                pb: 6,
                pt: 3,
              }
        }
        spacing={5}
      >
        <Stack
          spacing={1}
          direction={!isPhoneScreen ? "column" : "row"}
          sx={
            !isPhoneScreen
              ? {}
              : { justifyContent: "space-between", p: 3, alignItems: "center" }
          }
        >
          <Stack sx={!isPhoneScreen ? {} : {}}>
            <Typography fontSize={!isPhoneScreen ? 15 : 19} fontWeight={600}>
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
        <Stack
          alignItems="center"
          justifyContent={!isPhoneScreen ? "center" : "space-between"}
          spacing={!isPhoneScreen ? 2 : 0}
          direction={!isPhoneScreen ? "column" : "row"}
          sx={!isPhoneScreen ? {} : { pl: 3, pr: 3 }}
        >
          <Typography
            fontSize={12}
            fontWeight={600}
            align="center"
            sx={!isPhoneScreen ? {} : { width: "40%", textAlign: "center" }}
          >
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
