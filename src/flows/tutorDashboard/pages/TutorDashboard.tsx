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

import PaymentHistory from "./PaymentHistory";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import SessionHistoryIcon from "@mui/icons-material/RestoreOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import MarketingIcon from "@mui/icons-material/CampaignOutlined";
import InvoiceIcon from "@mui/icons-material/ReceiptOutlined";
import { useState } from "react";
import SessionHistory from "./SessionHistory";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PaymentLinkDialog from "../dialogs/PaymentLinkDialog";
import PaymentLinkPage from "./PaymentLinkPage";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ProfilePage from "./ProfilePage";

const drawerWidth = 220;

const iconsArray = [
  <HomeIcon key="home" />,
  <InsertLinkOutlinedIcon key="link" />,
  <SessionHistoryIcon key="history" />,
  <InvoiceIcon key="invoice" />,
  <MarketingIcon key="marketing" />,
];

const TutorDashboard: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat", // Set the default font family
    },
  });

  const [subpage, setSubpage] = useState<string>("Payments");

  const handleSubpageChange = (subpageValue: string) => {
    setSubpage(subpageValue);
  };
  const displaySubpage = () => {
    if (subpage === "Payments") {
      return <PaymentHistory />;
    } else if (subpage === "Session History") {
      return <SessionHistory />;
    } else if (subpage === "Your Payment Link") {
      return <PaymentLinkPage />;
    } else if (subpage === "Profile Page") {
      return <ProfilePage />;
    }
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
            <Stack
              direction="row"
              display="flex"
              justifyContent="space-between"
              spacing={130}
            >
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
              <Box
                sx={{
                  position: "fixed",
                  right: 0,
                  top: 0,
                }}
              >
                <Stack direction="row" spacing={1} p={2}>
                  <Typography
                    color="black"
                    fontSize={14}
                    pt={1.4}
                    fontWeight={600}
                  >
                    Maanav Seth
                  </Typography>
                  <IconButton
                    onClick={() => {
                      handleSubpageChange("Profile Page");
                    }}
                  >
                    <PersonOutlineOutlinedIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "white",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {[
                "Payments",
                "Your Payment Link",
                "Session History",
                "Invoices",
                "Marketing",
              ].map((text, index) => (
                <ListItem key={text} sx={{ width: "100%", pl: "0", pr: "0" }}>
                  <ListItemButton
                    onClick={() => {
                      handleSubpageChange(text);
                    }}
                    disabled={index === 3 || index === 4 ? true : false}
                    sx={{
                      backgroundColor: subpage === text ? "#EBF1FF" : "white",
                      color: subpage === text ? "#507FFD" : "black",
                      pl: 3,
                      "& *":
                        subpage === text
                          ? {
                              color: "#507FFD",
                              fontWeight: "bold",
                            }
                          : { color: "black" },

                      "&:hover": {
                        backgroundColor: "#EBF1FF",
                        "& *": {
                          color: "#507FFD",
                          fontWeight: "bold",
                        },
                      },
                    }}
                  >
                    <ListItemIcon>{iconsArray[index]}</ListItemIcon>
                    <Typography
                      sx={{ fontSize: 15 }}
                      fontWeight={subpage === text ? "bold" : "normal"}
                    >
                      {text}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 6, backgroundColor: "#F5F5F5" }}
        >
          <Toolbar />
          {displaySubpage()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default TutorDashboard;
