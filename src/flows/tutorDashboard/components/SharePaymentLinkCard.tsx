import * as React from "react";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import {
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import LinkIcon from "@mui/icons-material/LinkOutlined";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopyOutlined";
import Button from "@mui/material/Button";
import AndroidDevice from "../../../assets/images/svg/AndroidDevice.svg";
import Background from "../../../assets/images/svg/MobilePaymentBackground.svg";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useGetUserDetailsQuery } from "../../../APIs/definitions/user";
import { trackEvent } from "../../../utils/amplitude";
const SharePaymentLinkCard: React.FC = () => {
  const { data: tutorDetails } = useGetUserDetailsQuery(undefined, { skip: !localStorage.getItem("access-token") });
  const paymentLink = useMemo(() => {
    return `https://app.eira.club/${tutorDetails?.username}`;
  }, [tutorDetails?.username]);
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const copyToClipboard = () => {
    trackEvent("Copied static payment link");
    navigator.clipboard
      .writeText(paymentLink)
      .then(() => {
        alert("Payment Link copied");
      })
      .catch((err: Error) => {
        console.error("Failed to copy payment link: ", err);
      });
  };
  return (
    <Box
      sx={
        !isPhoneScreen
          ? {
              borderRadius: 2,
              width: "100%",
              backgroundColor: "white",
              boxShadow: 6,
              alignContent: "center",
              height: 330,
            }
          : {
              width: "100%",
              backgroundColor: "white",
              alignContent: "center",
              height: "80vh",
              marginTop: "1.5rem",
            }
      }
    >
      <Stack
        sx={{ borderWidth: "2", height: "100%" }}
        direction={!isPhoneScreen ? "row" : "column-reverse"}
        justifyContent="space-between"
      >
        <Stack
          justifyContent="space-evenly"
          alignItems="center"
          width={!isPhoneScreen ? "50%" : "100%"}
          p={2}
          pb={4}
          spacing={!isPhoneScreen ? 0 : 3}
        >
          <Stack
            width={!isPhoneScreen ? "70%" : "90%"}
            pt={!isPhoneScreen ? 1 : 4}
          >
            <Typography
              fontSize={!isPhoneScreen ? 24 : 26}
              fontWeight={!isPhoneScreen ? 590 : 500}
              align="center"
            >
              Share your eira.club link to collect payment directly
            </Typography>
          </Stack>

          <TextField
            sx={!isPhoneScreen ? { width: "60%" } : { width: "80%" }}
            size={!isPhoneScreen ? "small" : "medium"}
            disabled
            id="outlined-disabled"
            defaultValue={paymentLink}
          ></TextField>

          <Button
            variant="contained"
            onClick={copyToClipboard}
            sx={
              !isPhoneScreen
                ? {
                    backgroundColor: "#507FFD",
                    borderRadius: 3,
                    fontSize: 13,
                    fontWeight: "bold",
                    height: 55,
                    width: "35%",
                    paddingLeft: 3,
                    paddingRight: 3,

                    textTransform: "none",
                  }
                : {
                    backgroundColor: "#507FFD",
                    borderRadius: 3,
                    fontSize: 14,
                    fontWeight: "bold",
                    height: 65,
                    width: "50%",
                    paddingLeft: 3,
                    paddingRight: 3,

                    textTransform: "none",
                  }
            }
          >
            <Stack
              direction="row"
              spacing={!isPhoneScreen ? 2 : 1}
              alignItems="center"
            >
              <ShareOutlinedIcon />
              <Typography fontWeight={550}>Share Link</Typography>
            </Stack>
          </Button>
        </Stack>
        <Box
          sx={
            !isPhoneScreen
              ? {
                  width: "47%",
                  backgroundColor: "#EBF1FF",
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                  backgroundImage: { Background },
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
              : {
                  width: "100%",
                  backgroundColor: "#EBF1FF",
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                  backgroundImage: { Background },
                  // backgroundSize: "cover",
                  // backgroundPosition: "center",
                  // backgroundRepeat: "no-repeat",
                }
          }
        >
          <Stack
            justifyContent="center"
            direction="row"
            alignItems="flex-end"
            height="100%"
          >
            <img
              src={AndroidDevice}
              alt="Android Phone"
              style={
                !isPhoneScreen
                  ? {
                      height: "35vh",
                    }
                  : {
                      height: "35vh",
                    }
              }
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
export default SharePaymentLinkCard;
