import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import LinkIcon from "@mui/icons-material/LinkOutlined";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopyOutlined";
import Button from "@mui/material/Button";
import AndroidDevice from "../../../assets/images/svg/AndroidDevice.svg";
import Background from "../../../assets/images/svg/MobilePaymentBackground.svg";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const SharePaymentLinkCard: React.FC = () => {
  const [tutorPaymentLink, setTutorPaymentLink] =
    useState<string>("pay.eira.club"); // Text to be copied

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(tutorPaymentLink)
      .then(() => {
        alert("Payment Link copied");
      })
      .catch((err: Error) => {
        console.error("Failed to copy payment link: ", err);
      });
  };
  return (
    <Box
      sx={{
        borderRadius: 2,
        width: "100%",
        backgroundColor: "white",
        boxShadow: 6,
        alignContent: "center",
        height: 330,
      }}
    >
      <Stack
        sx={{ borderWidth: "2" }}
        direction="row"
        justifyContent="space-between"
      >
        <Stack
          justifyContent="space-evenly"
          alignItems="center"
          width="50%"
          p={2}
        >
          <Stack width="70%" pt={1}>
            <Typography fontSize={24} fontWeight={590} align="center">
              Share your eira.club link to collect payment directly
            </Typography>
          </Stack>

          <TextField
            sx={{ width: "60%" }}
            size="small"
            disabled
            id="outlined-disabled"
            defaultValue="payment.eira.club"
          ></TextField>

          <Button
            variant="contained"
            onClick={copyToClipboard}
            sx={{
              backgroundColor: "#507FFD",
              borderRadius: 3,
              fontSize: 13,
              fontWeight: "bold",
              height: 55,
              width: "35%",
              paddingLeft: 3,
              paddingRight: 3,

              textTransform: "none",
            }}
          >
            <Stack direction="row" spacing={2} pt={1} pb={1}>
              <ShareOutlinedIcon />
              <Typography fontWeight={550}>Share Link</Typography>
            </Stack>
          </Button>
        </Stack>
        <Box
          sx={{
            width: "46.5%",
            backgroundColor: "#EBF1FF",
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
          }}
          p={0}
        >
          <img src={Background} style={{ width: "100%", height: "100%" }} />
          <Box
            sx={{
              position: "absolute", // Position child box absolutely relative to the parent
              top: "58.7%",
              left: "80%",
              transform: "translate(-50%, -50%)", // Center child box
              padding: 2, // Padding inside the child box
              borderRadius: 1, // Rounded corners for the child box
            }}
          >
            <img src={AndroidDevice} style={{ width: "90%", height: "90%" }} />
          </Box>
          {/* <Box>
            <img src={AndroidDevice} style={{ width: "20%", height: "20%" }} />
          </Box> */}
        </Box>
      </Stack>
    </Box>
  );
};
export default SharePaymentLinkCard;
