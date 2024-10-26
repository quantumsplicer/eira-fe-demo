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
import { Fab, Stack, useMediaQuery } from "@mui/material";
import PaymentBannerCard from "../components/PaymentBannerCard";
import PaymentHistoryTable from "../components/PaymentHistoryTable";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PaymentFlow from "../components/PaymentFlow";

const drawerWidth = 220;

const StudentDashboard: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat", // Set the default font family
    },
  });

  const [isPaymentFlowActive, setIsPaymentFlowActive] = useState(false);
  const isPhoneScreen = useMediaQuery("(max-width:600px)");

  const handleClosePaymentFlow = () => {
    setIsPaymentFlowActive(false);
  };

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
                alt="logo"
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
          sx={
            !isPhoneScreen
              ? { flexGrow: 1, p: 6, backgroundColor: "#F5F5F5" }
              : { flexGrow: 1, pt: 4, backgroundColor: "#F5F5F5" }
          }
        >
          <Toolbar />
          <Stack
            spacing={!isPhoneScreen ? 5 : 1}
            pl={!isPhoneScreen ? 10 : 0}
            pr={!isPhoneScreen ? 10 : 0}
          >
            {!isPhoneScreen ? <h1>Payments History</h1> : <></>}
            <PaymentBannerCard />
            <PaymentHistoryTable />
          </Stack>
        </Box>
      </Box>

      {isPhoneScreen && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            bottom: 20,
            width: "100%",
          }}
        >
          <Fab
            aria-label="make-payment"
            sx={{
              width: 300,
              borderRadius: 50,
              backgroundColor: "#507FFD",
              color: "white",
            }}
            onClick={() => setIsPaymentFlowActive(true)}
          >
            Make a Payment
          </Fab>
        </Box>
      )}
       {isPaymentFlowActive && (
        <PaymentFlow
          open={isPaymentFlowActive}
          onClose={handleClosePaymentFlow}
          tutorDetailsProp={{
            firstName: "",
            lastName: "",
            panNumber: "",
            phoneNumber: "",
          }}
        />
      )}
    </ThemeProvider>
  );
};
export default StudentDashboard;
