// src/components/OTPDialog.tsx
import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TickMark from "../../../assets/images/png/tick-mark.png";
import Link from "@mui/material/Link";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";
import { useForm, SubmitHandler } from "react-hook-form";

interface AddBankAccountDialogProps {
  activeDialog: string;
  setActiveDialog: (dialog: string) => void;
}
type Inputs = {
  accountNumber: string;
  reEnteredAccountNumber: string;
  ifscCode: string;
};

const AddBankAccountDialog = ({
  activeDialog,
  setActiveDialog,
}: AddBankAccountDialogProps) => {
  const handleOnClose = () => {
    setActiveDialog("None");
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [reEnteredAccountNumber, setReEneteredAccountNumber] =
    useState<string>("");
  const [ifscCode, setIfscCode] = useState<string>("");

  const isValidAccountNumber = (): boolean => {
    const accountNumberRegex = /^[0-9]{8,16}$/;
    return accountNumberRegex.test(accountNumber);
  };
  const areAccountNumbersSame = (): boolean => {
    return accountNumber === reEnteredAccountNumber ? true : false;
  };

  const isValidIfscCode = (): boolean => {
    const ifscCodeRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscCodeRegex.test(ifscCode);
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumber(event.target.value);
  };

  const handleRenteredAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReEneteredAccountNumber(event.target.value);
  };

  const handleIfscCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIfscCode(event.target.value);
  };

  return (
    <Dialog
      open={activeDialog === "AddBankAccountDialog" ? true : false}
      onClose={handleOnClose}
      sx={{
        "& .MuiDialog-paper": {
          width: 470,
          maxWidth: "50vw",
          height: 570,
          borderRadius: 3,
        },
        p: 2,
      }}
    >
      <DialogContent dividers>
        <IconButton
          aria-label="close"
          onClick={handleOnClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Stack sx={{ pl: 4, pr: 4, pt: 5 }} spacing={8}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ pt: 1 }}
            spacing={1}
          >
            <Typography sx={{ fontSize: 23 }} fontWeight={600}>
              Add Bank Account
            </Typography>
            <Typography
              textAlign="center"
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: "#989898",
              }}
            >
              Please ensure that account holder's name is same as the name
              entered before.
            </Typography>
          </Stack>
          <Stack spacing={4} sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Account Number"
              variant="outlined"
              // value={accountNumber}
              size="small"
              {...register("accountNumber", { required: true })}
              // onChange={handleAccountNumberChange}
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
              label="Re-enter Account Number"
              variant="outlined"
              type="password"
              {...register("reEnteredAccountNumber", { required: true })}
              // value={reEnteredAccountNumber}
              // onChange={handleRenteredAccountNumberChange}
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
              label="IFSC"
              variant="outlined"
              size="small"
              {...register("ifscCode", { required: true })}
              // value={ifscCode}
              // onChange={handleIfscCodeChange}
              sx={{
                mb: 0,
                "&:MuiInputBase-input": {
                  fontSize: 10,
                },
              }}
              InputProps={{
                startAdornment: (
                  <Typography fontSize={14} sx={{ mr: 1 }}></Typography>
                ),
              }}
            />
          </Stack>
          <Box sx={{ pt: 1 }}>
            <Stack spacing={1}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#507FFD",
                  borderRadius: 7,
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingLeft: 3,
                  paddingRight: 3,
                  textTransform: "none",
                }}
              >
                Verify
              </Button>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default AddBankAccountDialog;
