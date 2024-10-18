import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import {
  Stack,
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Avatar,
  useMediaQuery,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import MarketingIcon from "@mui/icons-material/CampaignOutlined";
import InvoiceIcon from "@mui/icons-material/ReceiptOutlined";
import SortSharpIcon from "@mui/icons-material/SortSharp";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import PaymentHistory from "../subpages/PaymentHistory";
import SessionHistoryIcon from "@mui/icons-material/RestoreOutlined";
import SessionHistory from "../subpages/SessionHistory";
import PaymentLinkPage from "../subpages/PaymentLinkPage";
import ProfilePage from "../subpages/ProfilePage";
import { isAssertEntry } from "typescript";
import PaymentLinkDialog from "../dialogs/PaymentLinkDialog";
import { useLocation, useNavigate } from "react-router-dom";
import StatusDialog from "../../../dialogs/StatusDialog";
import StatusDrawer from "../../../components/StatusDrawer";
import { useGetUserDetailsQuery } from "../../../APIs/definitions/user";
import { useDispatch } from "react-redux";
import { useOnboarding } from "../../../customHooks/useOnboarding";
import { setOnboardingStep } from "../../../stores/slices/onboardingInfoSlice";

const PAYMENT_HISTORY_PAGE = "Payment History Page";
const SESSION_HISTORY_PAGE = "Session History Page";
const PAYMENT_LINK_PAGE = "Payment Link Page";
const PROFILE_PAGE = "Profile Page";
const CREATE_PAYMENT_LINK_MOBILE_DIALOG = "Create Payment Link Mobile";
const drawerWidth = 220;
const TutorDashboard: React.FC = () => {
  const subpageMap = useMemo(() => {
    return;
  }, []);
  const iconsArray = useMemo(() => {
    return [
      <HomeIcon key="home" />,
      <InsertLinkOutlinedIcon key="link" />,
      <SessionHistoryIcon key="history" />,
      <InvoiceIcon key="invoice" />,
      <MarketingIcon key="marketing" />,
    ];
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat",
    },
  });
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [subpage, setSubpage] = useState<string>(PAYMENT_HISTORY_PAGE);
  const [mobileOpen, setMobileOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const previousUrl = location.state?.previousUrl;
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const { data: userDetails, isLoading, error } = useGetUserDetailsQuery();
  
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
  const { determineOnboardingStep } = useOnboarding();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleSubpageChange = (subpage: string) => {
    setSubpage(subpage);
    handleDrawerClose();
  };
  const displaySubpage = () => {
    if (subpage === PAYMENT_HISTORY_PAGE) {
      return <PaymentHistory />;
    } else if (subpage === SESSION_HISTORY_PAGE) {
      return <SessionHistory />;
    } else if (subpage === PAYMENT_LINK_PAGE) {
      return <PaymentLinkPage />;
    } else if (subpage === PROFILE_PAGE) {
      return <ProfilePage />;
    }
  };

  useEffect(() => {
    const showAlert = localStorage.getItem("showDialog") === "true";

    if (showAlert && previousUrl?.endsWith("/tutor/aadhar-verification")) {
      setShowDialog(true);
      localStorage.removeItem("showDialog");
    }
  }, [previousUrl]);

  const ScheduleClassButton: React.FC = () => {
    return (
      <>
        <Typography
          onClick={() => setShowDialog(false)}
          sx={{
            borderBottom: "1px solid #757575",
            cursor: "pointer",
            color: (theme) => theme.palette.grey[600],
          }}
        >
          Schedule a class now
        </Typography>
      </>
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      setIsSessionExpired(true);
      return;
    }

    const handleOnboarding = async () => {
      const { navigateTo, onboardingStep } = await determineOnboardingStep();
      dispatch(setOnboardingStep(onboardingStep));
      if (onboardingStep !== 0) {
        navigate(navigateTo);
      }
    };

    handleOnboarding();
  }, []);

  const LoginButton = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        sx={{
          padding: 1.5,
          borderRadius: 20,
          height: 45,
          mt: 5,
          width: "100%",
          minWidth: "320px",
          maxWidth: "400px",
        }}
        onClick={() => navigate("/tutor/login")}
      >
        Login
      </Button>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {isSessionExpired ? (
        isPhoneScreen ? (
          <StatusDrawer
            open={true}
            type="info"
            headingMessage="Session Expired!"
            subHeadingMessage1="Please login again"
            preventDrawerClose={true}
            CustomDrawerButton={LoginButton}
          />
        ) : (
          <StatusDialog
            open={true}
            onClose={() => {}}
            type="info"
            headingMessage="Session Expired!"
            subHeadingMessage="Please login again"
            preventDialogClose={true}
            CustomDialogButton={LoginButton}
          />
        )
      ) : (
        <Box
          sx={{
            display: "flex",
          }}
        >
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
                    height: "70px",
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
                    style={
                      !isPhoneScreen
                        ? {
                            alignSelf: "flex-start",
                            width: 50,
                            position: "absolute",
                            marginLeft: 20,
                            top: 20,
                          }
                        : {
                            alignSelf: "flex-start",
                            width: 100,
                            position: "absolute",
                            marginLeft: 20,
                            top: 20,
                          }
                    }
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

          {!isPhoneScreen ? (
            <Drawer
              variant="permanent"
              sx={{
                width: "18%",
                minWidth: "200px",
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  minWidth: "200px",
                  width: "18%",
                  boxSizing: "border-box",
                  backgroundColor: "white",
                },
              }}
            >
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                <List>
                  {[
                    { title: "Payments", subpage: PAYMENT_HISTORY_PAGE },
                    { title: "Your Payment Link", subpage: PAYMENT_LINK_PAGE },
                    { title: "Session History", subpage: SESSION_HISTORY_PAGE },
                    { title: "Invoices", subpage: "disabled" },
                    { title: "Marketing", subpage: "disabled" },
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
                        <Typography
                          color="black"
                          fontSize={14}
                          pt={1.4}
                          fontWeight={600}
                        >
                          Maanav
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </Box>
            </Drawer>
          ) : (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
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
                  <Typography fontSize={16} fontWeight={600}>
                    {userDetails?.first_name}
                  </Typography>
                </Stack>
              </Stack>
            </Drawer>
          )}

          <Box
            component="main"
            sx={
              !isPhoneScreen
                ? {
                    flexGrow: 1,
                    backgroundColor: "#F5F5F5",
                    p: 5,
                    minHeight: 1000,
                  }
                : {
                    flexGrow: 1,
                    pt: 2,
                    backgroundColor: "#F5F5F5",
                    minHeight: 1000,
                  }
            }
          >
            <Toolbar />
            {!isPhoneScreen ? <Toolbar /> : <></>}
            {displaySubpage()}
          </Box>
          {isPhoneScreen && showDialog ? (
            <StatusDrawer
              open={showDialog}
              type="success"
              headingMessage="Congratulations!!"
              subHeadingMessage1="You are ready to accept payments on Eira!"
              preventDrawerClose={true}
              CustomDrawerButton={ScheduleClassButton}
            />
          ) : (
            <StatusDialog
              open={showDialog}
              onClose={() => setShowDialog(false)}
              type="success"
              headingMessage="Congratulations!!"
              subHeadingMessage="You are ready to accept payments on Eira!"
              preventDialogClose={false}
              CustomDialogButton={ScheduleClassButton}
            />
          )}
        </Box>
      )}

      {isPhoneScreen ? (
        // <StatusDrawer
        //     open={showDialog}
        //     type="success"
        //     headingMessage="Congratulations!!"
        //     subHeadingMessage1="You are ready to accept payments on Eira!"
        //     preventDrawerClose={true}
        //     CustomDrawerButton={ScheduleClassButton}
        //   />
        <></>
      ) : (
        <StatusDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          type="success"
          headingMessage="Congratulations!!"
          subHeadingMessage="You are ready to accept payments on Eira!"
          preventDialogClose={false}
          CustomDialogButton={ScheduleClassButton}
        />
      )}
    </ThemeProvider>
  );
};
export default TutorDashboard;
