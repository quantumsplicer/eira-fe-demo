import * as React from "react";
import Box from "@mui/material/Box";
import {
  Divider,
  Stack,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const currentLimit = 5000;

const CurrentLimitCard: React.FC = () => {
  const navigate = useNavigate();
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
              p: 1,
              width: "100%",
              backgroundColor: "white",
              height: 320,
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
                pl: 0,
                height: "100%",
                pb: 4,
                pt: 1,
              }
        }
        spacing={!isPhoneScreen ? 5 : 1}
      >
        <Stack
          spacing={!isPhoneScreen ? 1 : 2}
          direction={!isPhoneScreen ? "column" : "column"}
          sx={
            !isPhoneScreen
              ? {}
              : { justifyContent: "space-between", p: 3, alignItems: "center" }
          }
        >
          <Stack
            sx={
              !isPhoneScreen
                ? {}
                : {
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                  }
            }
            spacing={!isPhoneScreen ? 0 : 0}
            direction={!isPhoneScreen ? "column" : "row"}
          >
            <Stack>
              <Typography
                fontSize={!isPhoneScreen ? 15 : "1.6rem"}
                sx={
                  !isPhoneScreen ? {} : { alignSelf: "left", textAlign: "left" }
                }
                fontWeight={600}
              >
                Current
              </Typography>
              <Typography
                fontSize={!isPhoneScreen ? 15 : "1.6rem"}
                sx={
                  !isPhoneScreen ? {} : { alignSelf: "left", textAlign: "left" }
                }
                fontWeight={600}
              >
                Limit
              </Typography>
            </Stack>
            <Stack
              direction={!isPhoneScreen ? "row" : "column"}
              spacing={!isPhoneScreen ? 1 : 0}
            >
              <Typography
                fontSize={!isPhoneScreen ? 26 : "2.2rem"}
                fontWeight={650}
                sx={!isPhoneScreen ? {} : { pt: 0 }}
                alignSelf="self-end"
              >
                {formatter.format(currentLimit)}
              </Typography>
              <Typography
                fontSize={!isPhoneScreen ? 11 : "0.9rem"}
                fontWeight="bold"
                color="#898989"
                alignSelf="flex-end"
                pb={!isPhoneScreen ? 2 : 0}
                sx={!isPhoneScreen ? {} : { marginTop: -1 }}
              >
                /transaction
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography
              fontSize={!isPhoneScreen ? 12 : "0.9rem"}
              color="#898989"
            >
              Settlement in
            </Typography>
            <Typography
              fontSize={!isPhoneScreen ? 12 : "1rem"}
              fontWeight="bold"
              color="#898989"
            >
              24 hours
            </Typography>
          </Stack>
        </Stack>
        <Stack
          alignItems="center"
          justifyContent={!isPhoneScreen ? "center" : "space-between"}
          spacing={!isPhoneScreen ? 2 : 2}
          direction={!isPhoneScreen ? "column" : "column"}
          sx={!isPhoneScreen ? {} : { pl: 3, pr: 3 }}
        >
          <Typography
            fontSize={12}
            fontWeight={600}
            align="center"
            sx={!isPhoneScreen ? {} : { width: "100%", textAlign: "center" }}
          >
            Complete KYC to increase limit to ₹50,000
          </Typography>
          <Button
            onClick={() => {
              localStorage.setItem("activeFlow", "tutorKyc");
              navigate("/tutor/kyc")
            }}
            variant="contained"
            onClick={() => {
              navigate("/tutor/kyc")
            }}
            sx={
              !isPhoneScreen
                ? {
                    backgroundColor: "#507FFD",
                    borderRadius: 3,
                    fontSize: 11,
                    fontWeight: "bold",
                    width: 150,
                    height: 35,
                    textTransform: "none",
                  }
                : {
                    backgroundColor: "#507FFD",
                    borderRadius: 3,
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    width: 150,
                    height: 35,
                    textTransform: "none",
                  }
            }
          >
            Complete KYC
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
export default CurrentLimitCard;
