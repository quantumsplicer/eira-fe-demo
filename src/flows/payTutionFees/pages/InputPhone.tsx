// src/components/RightPanel.tsx
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { EiraBack1 } from "../../../components/EiraBack1";
import OTPInput from "../../../components/OTPInput";
import OTPInputDialog from "../components/OTPInputDialog";

const InputPhone = () => {
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);

  const handleOpenOtpDialog = () => {
    setOtpDialogOpen(true);
  };

  const handleCloseOtpDialog = () => {
    setOtpDialogOpen(false);
  };

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "50%", p: 2, height: "100vh" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: 40,
            color: "white",
            fontWeight: "bold",
            mb: 2,
            position: "absolute",
            top: 100,
            left: 100,
            width: "25%",
          }}
        >
          Pay your tuition fees using credit card @ just 1%
        </Typography>
        <EiraBack1 />
      </Box>
      <Stack sx={{ width: "50%" }} alignItems={"center"}>
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
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ width: "80%", px: 18 }}
        >
          <Typography
            variant="h5"
            sx={{ fontSize: 20, fontWeight: "bold", mb: 2 }}
          >
            Sign up as a student
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: 16, mb: 4, textAlign: "center" }}
          >
            Enter your phone number
          </Typography>
          <TextField
            fullWidth
            label="Phone number"
            variant="outlined"
            sx={{
              mb: 2,
              "&:MuiInputBase-input": {
                fontSize: 12,
              },
            }}
            InputProps={{
              startAdornment: (
                <Stack direction={"row"} spacing={1} sx={{ mr: 1 }}>
                  <img
                    src="https://flagcdn.com/w320/in.png"
                    alt="India Flag"
                    style={{ width: 24, height: 18, marginRight: 8 }}
                  />
                  <Typography fontSize={14}>+91</Typography>
                </Stack>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: 1.5, borderRadius: 2 }}
            onClick={handleOpenOtpDialog}
          >
            Verify
          </Button>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 4,
              textAlign: "center",
              position: "absolute",
              bottom: 20,
            }}
          >
            <a
              href="https://www.eira.club/privacy-policy"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body2" color="grey">
                privacy policies
              </Typography>
            </a>
            <Typography variant="body2" color="grey">
              |
            </Typography>
            <a
              href="https://www.eira.club/terms-of-use"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body2" color="grey">
                terms of use
              </Typography>
            </a>
          </Stack>
        </Stack>
      </Stack>
      <OTPInputDialog
        open={otpDialogOpen}
        onClose={handleCloseOtpDialog}
        navigateTo="/pay/payment-details"
        phoneNumber="phoneNumber"
        isDrawer={false}
      />
    </Stack>
  );
};

export default InputPhone;
