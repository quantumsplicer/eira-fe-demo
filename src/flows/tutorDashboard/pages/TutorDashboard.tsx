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
import ListItemText from "@mui/material/ListItemText";
import PaymentHistory from "./PaymentHistory";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import SessionHistoryIcon from "@mui/icons-material/RestoreOutlined";
import MarketingIcon from "@mui/icons-material/CampaignOutlined";
import InvoiceIcon from "@mui/icons-material/ReceiptOutlined";
import { Stack } from "@mui/material";
import { useState } from "react";
import { MouseEvent } from "react";
import SessionHistory from "./SessionHistory";
const drawerWidth = 220;

const TutorDashboard: React.FC = () => {
  const [subpage, setSubpage] = useState<string>("Payments");

  const handleSubpageChange = (subpageValue: string) => {
    setSubpage(subpageValue);
  };
  const displaySubpage = () => {
    if (subpage === "Payments") {
      return <PaymentHistory />;
    } else if (subpage === "Session History") {
      return <SessionHistory />;
    }
  };
  return (
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
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            borderWidth: 0,
            backgroundColor: "#EBF1FF",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Payments", "Session History", "Invoices", "Marketing"].map(
              (text, index) => (
                <ListItem key={text}>
                  <ListItemButton
                    onClick={() => {
                      handleSubpageChange(text);
                    }}
                    disabled={index === 2 || index === 3 ? true : false}
                    sx={{
                      "&:hover": { backgroundColor: "#507FFD", color: "white" },
                      width: 50,
                      borderRadius: 3,
                    }}
                  >
                    <ListItemIcon sx={{ p: 0, m: 0 }}>
                      {index % 2 === 0 ? <HomeIcon /> : <SessionHistoryIcon />}
                    </ListItemIcon>
                    <Typography sx={{ fontSize: 14 }}>{text}</Typography>
                  </ListItemButton>
                </ListItem>
              )
            )}
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
  );
};
export default TutorDashboard;
