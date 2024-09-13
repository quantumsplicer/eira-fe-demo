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
        sx={{ borderWidth: "2", height: "100%" }}
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
            width: "47%",
            backgroundColor: "#EBF1FF",
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            backgroundImage: { Background },
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Stack
            justifyContent="center"
            direction="row"
            alignItems="flex-end"
            height="100%"
          >
            <img
              src={AndroidDevice}
              style={{
                width: "40%",
                height: "70%",
              }}
            />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
export default SharePaymentLinkCard;
