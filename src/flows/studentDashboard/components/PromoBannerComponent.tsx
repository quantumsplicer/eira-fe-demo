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
import DashboardBannerArt1 from "../../../assets/images/png/student-dashboard-banner-1.png";
import DashboardBannerArt2 from "../../../assets/images/png/student-dashboard-banner-2.png";
import { WHATSAPP_LINK } from "../../../components/GetHelp";

const PromoBannerComponent: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  return (
    <Stack spacing={6} direction="column" width="100%" pb={10}>
      <Box
        component="img"
        src={DashboardBannerArt1}
        width="95%"
        onClick={() => window.open(WHATSAPP_LINK, "_blank")}
        sx={{ cursor: "pointer" }}
      />
      <Box
        component="img"
        src={DashboardBannerArt2}
        width="95%"
        onClick={() => window.open(WHATSAPP_LINK, "_blank")}
        sx={{ cursor: "pointer" }}
      />
    </Stack>
  );
};

export default PromoBannerComponent;
