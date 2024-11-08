import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import PaymentLinkBannerArt from "../../../assets/images/svg/PaymentLinkBannerArt.svg";
import { TutorDetails } from "../interfaces";
import PaymentFlow from "./PaymentFlow";

const PromoBannerComponent: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  return (
    <Stack spacing={10} direction="row" width="100%" pb={10}>
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: "white",
          background: "linear-gradient(to right, #47bdff, #507FFD)",
          boxShadow: 6,
          width: "20vw",
          height: "10vw",
          minHeight: 200,
        }}
      ></Box>
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: "white",
          background: "linear-gradient(to right, #47bdff, #507FFD)",
          boxShadow: 6,
          width: "20vw",
          height: "10vw",
          minHeight: 200,
        }}
      ></Box>
    </Stack>
  );
};

export default PromoBannerComponent;
