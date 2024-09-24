// src/components/OTPDialog.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Stack,
  useMediaQuery,
  SwipeableDrawer,
  Drawer,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TickMark from "../../../assets/images/png/tick-mark.png";
import Link from "@mui/material/Link";

interface ConfirmationDialogProps {
  activeDialog: string;
  setActiveDialog: (dialog: string) => void;
  heading: string;
  subHeading: string;
}

const ConfirmationDialog = ({
  activeDialog,
  setActiveDialog,
  heading,
  subHeading,
}: ConfirmationDialogProps) => {
  const handleOnClose = () => {
    setActiveDialog("None");
  };

  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  return (
    <>
      {!isPhoneScreen ? (
        <Dialog
          open={activeDialog === "ConfirmationDialog" ? true : false}
          onClose={handleOnClose}
          sx={{
            "& .MuiDialog-paper": {
              width: 450,
              maxWidth: "50vw",
              height: 380,
              borderRadius: 3,
            },
            p: 2,
          }}
        >
          <DialogContent dividers>
            <Stack justifyContent="center" spacing={4} alignItems="center">
              <Stack
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ height: "100%", pb: 0, pl: 5, pr: 5, pt: 5 }}
              >
                <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                  {heading}
                </Typography>
                <Typography
                  align="center"
                  sx={{ fontSize: 11.2, fontWeight: 501 }}
                >
                  {subHeading}{" "}
                </Typography>
              </Stack>
              <Box>
                <img
                  src={TickMark}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              </Box>
              <Link href="#" sx={{ color: "grey", fontSize: 18 }}>
                Create another
              </Link>
            </Stack>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          anchor="bottom"
          open={activeDialog === "ConfirmationDialog" ? true : false}
          onClose={handleOnClose}
          PaperProps={{
            sx: {
              height: "40vh", // Full height of the viewport
              borderRadius: 5,
            },
          }}
        >
          <Stack justifyContent="center" spacing={4} alignItems="center">
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ height: "100%", pb: 0, pl: 5, pr: 5, pt: 5 }}
            >
              <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                {heading}
              </Typography>
              <Typography
                align="center"
                sx={{ fontSize: 11.2, fontWeight: 501 }}
              >
                {subHeading}{" "}
              </Typography>
            </Stack>
            <Box>
              <img
                src={TickMark}
                alt="Tick mark"
                style={{
                  width: "80px",
                  height: "80px",
                }}
              />
            </Box>
            <Link href="#" sx={{ color: "grey", fontSize: 18 }}>
              Create another
            </Link>
          </Stack>
        </Drawer>
      )}
    </>
  );
};
export default ConfirmationDialog;
