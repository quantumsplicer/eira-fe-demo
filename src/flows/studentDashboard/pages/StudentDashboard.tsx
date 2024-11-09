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
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Stack,
  useMediaQuery,
  Fab,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PaymentHistoryPage from "../subpages/PaymentHistoryPage";
import MakePaymentPage from "../subpages/HomePage";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SortSharpIcon from "@mui/icons-material/SortSharp";
import { useGetUserDetailsQuery } from "../../../APIs/definitions/user";
import { useLogout } from "../../../utils/logout";
import PaymentBannerCard from "../components/PaymentBannerCard";
import PaymentHistoryTable from "../components/PaymentHistoryTable";
import PaymentFlow from "../components/PaymentFlow";
import HomePage from "../subpages/HomePage";
import { useNavigate } from "react-router-dom";
import { useInstallPWA } from "../../../hooks/useInstallPWA";
import PWAInstallDrawer from "../../../components/PWAInstallDrawer";

const PAYMENT_HISTORY_PAGE = "payment-history-page";
const HOME_PAGE = "home-page";
const PROFILE_PAGE = "profile-page";

const drawerWidth = 240;
const iconsArray = [
  <HomeIcon />,
  <SessionHistoryIcon />,
  <MarketingIcon />,
  <InvoiceIcon />,
];

const StudentDashboard: React.FC = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat", // Set the default font family
    },
  });
  const [prompt, promptToInstall] = useInstallPWA();
  console.log("prompt", !!prompt);

  const [isPaymentFlowActive, setIsPaymentFlowActive] = useState(false);
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [subpage, setSubpage] = useState(HOME_PAGE);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPWAInstallPromptOpen, setIsPWAInstallPromptOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { data: userDetails, isLoading, error } = useGetUserDetailsQuery();
  const navigate = useNavigate();

  const displaySubpage = (subpage: string) => {
    if (subpage === PAYMENT_HISTORY_PAGE) {
      return <PaymentHistoryPage />;
    } else if (subpage === HOME_PAGE) {
      return <HomePage />;
    } else if (subpage === PROFILE_PAGE) {
      return <HomePage />;
    }
  };
  const handleLogout = useLogout();
  const handleSubpageChange = (subpage: string) => {
    setSubpage(subpage);
    handleDrawerClose();
  };
  const handleDrawerClose = () => {
    setIsClosing(true);
    setIsDrawerOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setIsDrawerOpen(!isDrawerOpen);
    }
  };

  const handleClosePaymentFlow = () => {
    setIsPaymentFlowActive(false);
  };

  useEffect(() => {
    setIsPWAInstallPromptOpen(!!prompt);
  }, [prompt]);

  useEffect(() => {
    if (!localStorage.getItem("access-token")) {
      navigate("/student/login");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={
            !isPhoneScreen
              ? {
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                  backgroundColor: "white",
                  boxShadow: 0,
                }
              : {
                  backgroundColor: "white",
                  boxShadow: 0,
                }
          }
        >
          <Toolbar>
            <Stack direction="row" justifyContent="space-between">
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
              <Box
                sx={{
                  position: "fixed",
                  right: 0,
                  top: 0,
                }}
              >
                {!isPhoneScreen ? (
                  <Stack direction="row" spacing={1} p={2}>
                    <Typography
                      color="black"
                      fontSize={14}
                      pt={1.4}
                      fontWeight={600}
                    >
                      {userDetails?.first_name}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        handleSubpageChange(PROFILE_PAGE);
                      }}
                    >
                      <PersonOutlineOutlinedIcon />
                    </IconButton>
                  </Stack>
                ) : (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                  >
                    <SortSharpIcon
                      sx={{
                        color: "black",
                        fontSize: "50px",
                        transform: "scaleX(-1)",
                      }}
                    />
                  </IconButton>
                )}
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>

        {isPhoneScreen ? (
          <Drawer
            variant="temporary"
            anchor="right"
            open={isDrawerOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth + 100,
                backgroundColor: "white",
              },
            }}
          >
            <Toolbar />

            <Stack justifyContent="space-between" height="100%">
              <Stack>
                <Stack spacing={2}>
                  <Stack
                    pl={2.5}
                    spacing={2}
                    onClick={() => {
                      handleSubpageChange(PROFILE_PAGE);
                    }}
                  >
                    <Avatar
                      alt="Profile Photo"
                      src={undefined}
                      sx={{
                        width: 60,
                        height: 60,
                        marginBottom: 1,
                        boxShadow: 5,
                      }}
                    />
                    <Typography fontSize={20} fontWeight={600}>
                      {userDetails?.first_name} {userDetails?.last_name}
                    </Typography>
                  </Stack>
                </Stack>
                <Box sx={{ overflow: "auto", mt: 4 }}>
                  <List>
                    {[
                      {
                        title: "Home Page",
                        subpage: HOME_PAGE,
                      },
                      {
                        title: "Payment History",
                        subpage: PAYMENT_HISTORY_PAGE,
                      },
                    ].map((entry, index) => (
                      <ListItem key={entry.title} sx={{ width: "100%", p: 0 }}>
                        <ListItemButton
                          onClick={() => {
                            handleSubpageChange(entry.subpage);
                          }}
                          disabled={index === 3 || index === 4 ? true : false}
                          sx={{
                            backgroundColor:
                              subpage === entry.subpage ? "#EBF1FF" : "white",
                            color:
                              subpage === entry.subpage ? "#507FFD" : "black",
                            pl: 3,
                            "& *":
                              subpage === entry.subpage
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
                          <Typography fontSize={18} py={1.4} fontWeight={600}>
                            {entry.title}
                          </Typography>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                </Box>
              </Stack>
            </Stack>

            <Stack justifyContent="center" py={4}>
              <Button
                variant="contained"
                onClick={() => {
                  handleLogout();
                }}
                sx={{
                  backgroundColor: "white",
                  width: "50%",
                  boxShadow: 0,
                  "&:hover": {
                    backgroundColor: "white",
                  },
                  "&:active": {
                    backgroundColor: "white",
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <LogoutIcon color="error" fontSize="small" />
                  <Typography
                    fontSize={18}
                    fontWeight={600}
                    color="error"
                    textTransform="none"
                    pl={1}
                  >
                    Logout
                  </Typography>
                </Stack>
              </Button>
            </Stack>
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              width: "13%",
              minWidth: "200px",
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                minWidth: "200px",
                width: "13%",
                boxSizing: "border-box",
                backgroundColor: "white",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }} height="100%">
              <List>
                {[
                  { title: "Home Page", subpage: HOME_PAGE },
                  { title: "Payment History", subpage: PAYMENT_HISTORY_PAGE },
                ].map((entry, index) => (
                  <ListItem
                    key={entry.title}
                    sx={{ width: "100%", pl: "0", pr: "0" }}
                  >
                    <ListItemButton
                      onClick={() => {
                        handleSubpageChange(entry.subpage);
                      }}
                      disabled={index === 3 || index === 4 ? true : false}
                      sx={{
                        backgroundColor:
                          subpage === entry.subpage ? "#EBF1FF" : "white",
                        color: subpage === entry.subpage ? "#507FFD" : "black",
                        pl: 3,
                        "& *":
                          subpage === entry.subpage
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
                        color="black"
                        fontSize={14}
                        pt={1.4}
                        fontWeight={600}
                      >
                        {entry.title}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Stack
                justifyContent="center"
                py={4}
                width="100%"
                position="absolute"
                bottom={0}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    handleLogout();
                  }}
                  sx={{
                    backgroundColor: "white",
                    width: "100%",
                    boxShadow: 0,
                    borderRadius: 0,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                    "&:active": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LogoutIcon color="error" fontSize="small" />
                    <Typography
                      fontSize={18}
                      fontWeight={600}
                      color="error"
                      textTransform="none"
                      pl={1}
                    >
                      Logout
                    </Typography>
                  </Stack>
                </Button>
              </Stack>
            </Box>
          </Drawer>
        )}

        <Box
          component="main"
          sx={
            !isPhoneScreen
              ? { flexGrow: 1, p: 6, backgroundColor: "#F5F5F5" }
              : { flexGrow: 1, pt: 4, backgroundColor: "#F5F5F5" }
          }
        >
          <Toolbar />
          {displaySubpage(subpage)}
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
      
      {isPWAInstallPromptOpen && (
        <PWAInstallDrawer
          open={isPWAInstallPromptOpen}
          onClose={() => setIsPWAInstallPromptOpen(false)}
          CustomDrawerButton={
            <Button
              onClick={() => promptToInstall()}
              variant="contained"
              sx={{
                width: "320px",
                height: 45,
                borderRadius: 20,
              }}
            >
              Save Eira
            </Button>
          }
        />
      )}
    </ThemeProvider>
  );
};
export default StudentDashboard;
