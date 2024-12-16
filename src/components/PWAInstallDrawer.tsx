import React, { ReactElement } from "react";
import {
  Typography,
  Stack,
  Drawer,
  Box,
  IconButton,
  Dialog,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EiraLogo from "../assets/images/png/eira-logo-graphic.png";
import Close from "@mui/icons-material/Close";
import { trackEvent } from "../utils/amplitude";

interface PWAInstallDrawerProps {
  open: boolean;
  onClose: () => void; // Add a close callback function
  CustomDrawerButton: ReactElement;
}

export const PWAInstallDrawer = ({
  open,
  onClose,
  CustomDrawerButton,
}: PWAInstallDrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const Content = (
    <Stack
      p={5}
      justifyContent={"center"}
      alignItems={"center"}
      position="relative"
      sx={{
        width: isMobile ? "100%" : "400px",
        margin: isMobile ? "0" : "auto",
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={() => {
          trackEvent("Closed Save Eira to homescreen dialog")
          onClose()
        }}
        sx={{
          alignSelf: "flex-end",
          position: "absolute",
          top: 5,
          right: 10,
        }}
      >
        <Close />
      </IconButton>

      <Typography variant="h5" mb={3} textAlign={"center"}>
        Save Eira to homescreen
      </Typography>
      <Typography variant="subtitle2" textAlign={"center"}>
        Make payment easier and add Eira to your homescreen
      </Typography>
      <img
        src={EiraLogo}
        style={{
          marginTop: "30px",
          marginBottom: "30px",
          width: 80,
        }}
        alt="Eira Logo"
      />

      {CustomDrawerButton}
    </Stack>
  );

  return isMobile ? (
    <>
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust opacity as needed
            zIndex: 1300, // Higher than most background elements
          }}
          aria-hidden="true"
        />
      )}
      <Drawer
        open={open}
        sx={{
          width: "100%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            zIndex: 10000,
            pt: 2,
            opacity: 1,
            borderRadius: 5,
            width: "100%",
            boxSizing: "border-box",
            transition: "transform 0.3s ease-in-out",
          },
        }}
        variant={"persistent"}
        anchor="bottom"
      >
        {Content}
      </Drawer>
    </>
  ) : (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 5,
          p: 2,
        },
      }}
    >
      {Content}
    </Dialog>
  );
};

export default PWAInstallDrawer;
