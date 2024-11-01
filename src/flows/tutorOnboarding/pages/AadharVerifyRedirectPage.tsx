import {
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StatusDialog from "../../../dialogs/StatusDialog";
import StatusDrawer from "../../../components/StatusDrawer";
import { useOnboarding } from "../../../customHooks/useOnboarding";

const AadharVerifyRedirectPage = () => {
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
  const { determineOnboardingStep } = useOnboarding();
  const notPhoneScreen = useMediaQuery("(min-width:850px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      setIsSessionExpired(true);
      return;
    }
    handleOnboarding();
  }, []);
  
  const handleOnboarding = async () => {
      const { navigateTo, onboardingStep } = await determineOnboardingStep();
      localStorage.setItem("tutorOnboardingStep", onboardingStep.toString());
      if (navigateTo === "/tutor-id/dashboard") {
          localStorage.setItem("showDialog", "true");
          navigate('/tutor-id/dashboard', { state: { previousUrl: location.pathname } });
          return;
      }
      navigate(navigateTo);
  };

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
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", width: "100vw" }}
    >
      {!isSessionExpired && (
        <>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Verifying your aadhaar details...
          </Typography>
        </>
      )}
      {isSessionExpired ? (
        notPhoneScreen ? (
          <StatusDialog
            open={true}
            onClose={() => {}}
            type="info"
            headingMessage="Session Expired!"
            subHeadingMessage="Please login again"
            preventDialogClose={true}
            CustomDialogButton={LoginButton}
          />
        ) : (
          <StatusDrawer
            open={true}
            type="info"
            headingMessage="Session Expired!"
            subHeadingMessage1="Please login again"
            preventDrawerClose={true}
            CustomDrawerButton={LoginButton}
          />
        )
      ) : null}
    </Stack>
  );
};

export default AadharVerifyRedirectPage;
