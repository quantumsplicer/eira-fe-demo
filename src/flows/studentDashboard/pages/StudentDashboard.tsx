import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import EiraLogo from "../../../assets/images/png/eira-logo.png";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import SessionHistoryIcon from "@mui/icons-material/RestoreOutlined";
import MarketingIcon from "@mui/icons-material/CampaignOutlined";
import InvoiceIcon from "@mui/icons-material/ReceiptOutlined";
import { useState } from "react";
import { Stack } from "@mui/material";
import PaymentBannerCard from "../components/PaymentBannerCard";
import PaymentHistoryTable from "../components/PaymentHistoryTable";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const drawerWidth = 220;

const StudentDashboard: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat", // Set the default font family
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "white",
            boxShadow: 0,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: "black" }}
            >
              <img
                src={EiraLogo}
                style={{
                  alignSelf: "flex-start",
                  width: 80,
                  position: "absolute",
                  marginLeft: 20,
                  top: 20,
                }}
              />
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 6, backgroundColor: "#F5F5F5" }}
        >
          <Toolbar />
          <Stack spacing={5} pl={10} pr={10}>
            <h1>Payments History</h1>
            <PaymentBannerCard />
            <PaymentHistoryTable />
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default StudentDashboard;
