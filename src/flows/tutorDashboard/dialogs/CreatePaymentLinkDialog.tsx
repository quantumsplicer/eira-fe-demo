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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TickMark from "../../../assets/images/png/tick-mark.png";
import Link from "@mui/material/Link";

interface CreatePaymentLinkDialogProps {
  openForm: boolean;
  openConfirmation: boolean;
  closeForm: () => void;
  closeConfirmation: () => void;
  openConfirmationPage: () => void;
}

const CreatePaymentLinkDialog = ({
  openForm,
  openConfirmation,
  closeForm,
  closeConfirmation,
  openConfirmationPage,
}: CreatePaymentLinkDialogProps) => {
  const handleSubmit = () => {
    closeForm();
    openConfirmationPage();
  };

  return (
    <>
      <Dialog
        open={openForm}
        onClose={closeForm}
        sx={{
          "& .MuiDialog-paper": {
            width: 470,
            maxWidth: "50vw",
            height: 540,
            borderRadius: 3,
          },
          p: 2,
        }}
      >
        <DialogContent dividers>
          <IconButton
            aria-label="close"
            onClick={closeForm}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Stack sx={{ pl: 4, pr: 4, pt: 3 }} spacing={2}>
            <Stack justifyContent="center" alignItems="center" sx={{ pt: 1 }}>
              <Typography sx={{ fontSize: 23, fontWeight: "bold" }}>
                Create a payment Link
              </Typography>
              <Typography
                sx={{ fontSize: 12, fontWeight: 550, lineHeight: 1.2 }}
              >
                create Link to share with your students
              </Typography>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 550,
                  color: "#989898",
                  lineHeight: 1.2,
                }}
              >
                Link will be sent to them through whatsapp and text sms
              </Typography>
            </Stack>
            <Stack spacing={2.3} sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Name of the student"
                variant="outlined"
                size="small"
                sx={{
                  mb: 0,
                  "&:MuiInputBase-input": {
                    fontSize: 7,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Typography fontSize={10} sx={{ mr: 1 }}></Typography>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Phone number"
                variant="outlined"
                size="small"
                sx={{
                  mb: 0,
                  "&:MuiInputBase-input": {
                    fontSize: 12,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Typography fontSize={14} sx={{ mr: 1 }}></Typography>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Email (optional)"
                variant="outlined"
                size="small"
                sx={{
                  mb: 0,
                  "&:MuiInputBase-input": {
                    fontSize: 12,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Typography fontSize={14} sx={{ mr: 1 }}></Typography>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Amount to pay"
                variant="outlined"
                size="small"
                sx={{
                  mb: 0,
                  "&:MuiInputBase-input": {
                    fontSize: 10,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Typography fontSize={14} sx={{ mr: 1 }}>
                      ₹
                    </Typography>
                  ),
                }}
              />
            </Stack>
            <Box sx={{ pt: 1 }}>
              <Stack spacing={1}>
                <FormGroup sx={{ fontSize: 10 }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography sx={{ fontSize: 10, lineHeight: 1.2 }}>
                        I confirm that all these sessions were conducted through
                        Eira and the payment link generated here is for those
                        sessions only
                      </Typography>
                    }
                  />
                </FormGroup>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  fullWidth
                  sx={{
                    backgroundColor: "#507FFD",
                    borderRadius: 7,
                    fontSize: 15,
                    fontWeight: "bold",
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}
                >
                  Send Payment Link
                </Button>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openConfirmation}
        onClose={closeConfirmation}
        sx={{
          "& .MuiDialog-paper": {
            width: 400,
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
                Link Successfully Created
              </Typography>
              <Typography
                align="center"
                sx={{ fontSize: 11.2, fontWeight: 501 }}
              >
                your payment link is created and sent to the student on their
                whatsapp and SMS{" "}
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
    </>
  );
};

export default CreatePaymentLinkDialog;
