import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import StatusDrawer from "./StatusDrawer";
import { useAddAccountMutation } from "../APIs/definitions/bankAccounts";
import GetHelp from "./GetHelp";

interface BankAccountDetailsProps {
  onSuccess: () => void;
}

const BankAccountDetails = ({ onSuccess }: BankAccountDetailsProps) => {
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [verifyAccountNumber, setVerifyAccountNumber] = useState<string>("");
  const [ifsc, setIfsc] = useState<string>("");
  const [showAccountVerificationStatus, setShowAccountVerificationStatus] =
    useState<boolean>(false);
  const [isAccountVerified, setIsAccountVerified] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [verificationFailureMessage, setVerificationFailureMessage] =
    useState<string>("");
  const notPhoneScreen = useMediaQuery("(min-width:850px)");

  const [addAccount, { isLoading: addAccountIsLoading }] =
    useAddAccountMutation();

  const handleAccountNumberInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setAccountNumber: (accNum: string) => void
  ) => {
    const invalidRegex = /[^0-9]/;
    const inputValue = event.target.value;
    if (inputValue === "" || !invalidRegex.test(inputValue)) {
      const inputAccNumber: string = inputValue.slice(0, 18);
      setAccountNumber(inputAccNumber);
    }
  };

  const handleIfscInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const invalidRegex = /[^A-Za-z0-9]/g;
    const sanitizedValue = event.target.value
      .replace(invalidRegex, "")
      .slice(0, 11)
      .toUpperCase();
    setIfsc(sanitizedValue);
  };

  const isAccountNumberValid = (): boolean => {
    const regex = /^\d{9,18}$/;
    return regex.test(accountNumber);
  };

  const isIfscValid = (): boolean => {
    const regex = /^[A-Z]{4}[0][A-Z0-9]{6}$/;
    return regex.test(ifsc);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !isButtonDisabled) {
      handleSubmitClick();
    }
  };

  const verifyAccount = () => {
    addAccount({
      account_number: accountNumber,
      ifsc: ifsc,
    })
      .unwrap()
      .then((res) => {
        if (res) {
          setIsAccountVerified(true);
          setShowAccountVerificationStatus(true);
          setIsDrawerOpen(true);
        } else {
          setIsAccountVerified(false);
          setShowAccountVerificationStatus(true);
          setIsDrawerOpen(true);
        }
      })
      .catch((err) => {
        if (err.status != 401 && err.status != 403) {
          setVerificationFailureMessage(err.data?.message);
        }
        setIsAccountVerified(false);
        setShowAccountVerificationStatus(true);
        setIsDrawerOpen(true);
      });
  };

  const handleSubmitClick = () => {
    if (
      accountNumber &&
      isAccountNumberValid() &&
      accountNumber === verifyAccountNumber &&
      isIfscValid()
    ) {
      if (
        !showAccountVerificationStatus ||
        (showAccountVerificationStatus && !isAccountVerified)
      ) {
        setShowAccountVerificationStatus(false);
        setIsDrawerOpen(false);
        verifyAccount();
      } else if (showAccountVerificationStatus && isAccountVerified) {
        onSuccess();
      }
    }
  };

  const checkButtonDisability = () => {
    setIsButtonDisabled(true);
    if (
      accountNumber.length >= 9 &&
      accountNumber.length <= 18 &&
      verifyAccountNumber === accountNumber &&
      ifsc.length === 11 &&
      isIfscValid()
    ) {
      setIsButtonDisabled(false);
    }
  };

  const VerifyAadhaarButton = () => {
    return (
      <Button
        onClick={handleSubmitClick}
        variant="contained"
        sx={{
          width: "320px",
          height: 45,
          borderRadius: 20,
        }}
      >
        Verify Aadhaar
      </Button>
    );
  };

  const TryAgainButton = () => {
    return (
      <Button
        onClick={() => setIsDrawerOpen(false)}
        variant="contained"
        sx={{
          width: "320px",
          height: 45,
          borderRadius: 20,
        }}
      >
        Try Again
      </Button>
    );
  };

  useEffect(() => {
    checkButtonDisability();
  }, [accountNumber, verifyAccountNumber, ifsc]);

  return (
    <>
      <TextField
        autoFocus
        required
        value={accountNumber}
        disabled={
          addAccountIsLoading ||
          isAccountVerified ||
          (!notPhoneScreen && isDrawerOpen)
        }
        onChange={(e) => handleAccountNumberInput(e, setAccountNumber)}
        onKeyDown={(event) => handleKeyDown(event)}
        label="Account Number"
        variant="outlined"
        InputLabelProps={{
          shrink: false,
          style: { top: -40, left: -13, fontSize: 12 },
        }}
        sx={{
          width: "100%",
          minWidth: "320px",
          maxWidth: "400px",
          mt: 2,
          mb: 5,
          "& .MuiInputBase-root": {
            height: 45,
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 14px",
            fontSize: 14,
          },
        }}
      />
      <TextField
        required
        value={verifyAccountNumber}
        disabled={
          addAccountIsLoading ||
          isAccountVerified ||
          (!notPhoneScreen && isDrawerOpen)
        }
        onChange={(e) => handleAccountNumberInput(e, setVerifyAccountNumber)}
        onKeyDown={(event) => handleKeyDown(event)}
        error={
          verifyAccountNumber !== "" && accountNumber !== verifyAccountNumber
        }
        helperText={
          verifyAccountNumber !== "" &&
          accountNumber !== verifyAccountNumber &&
          "Account numbers do not match"
        }
        type="password"
        label="Re-enter Account Number"
        variant="outlined"
        InputLabelProps={{
          shrink: false,
          style: { top: -40, left: -13, fontSize: 12 },
        }}
        sx={{
          width: "100%",
          minWidth: "320px",
          maxWidth: "400px",
          mb: 5,
          "& .MuiInputBase-root": {
            height: 45,
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 14px",
            fontSize: 14,
          },
        }}
      />
      <TextField
        required
        value={ifsc}
        disabled={
          addAccountIsLoading ||
          isAccountVerified ||
          (!notPhoneScreen && isDrawerOpen)
        }
        onChange={(e) => handleIfscInput(e)}
        onKeyDown={(event) => handleKeyDown(event)}
        error={ifsc.length === 11 && !isIfscValid()}
        helperText={ifsc.length === 11 && !isIfscValid() && "Enter valid IFSC"}
        label="IFSC"
        variant="outlined"
        InputLabelProps={{
          shrink: false,
          style: { top: -40, left: -13, fontSize: 12 },
        }}
        sx={{
          width: "100%",
          minWidth: "320px",
          maxWidth: "400px",
          mb: 2,
          "& .MuiInputBase-root": {
            height: 45,
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 14px",
            fontSize: 14,
          },
        }}
      />
      {notPhoneScreen ? (
        showAccountVerificationStatus ? (
          isAccountVerified ? (
            <Stack direction="row">
              <CheckCircleOutlineIcon sx={{ color: "green", mr: 1 }} />
              <Typography>Account Verified Successfully!</Typography>
            </Stack>
          ) : (
            <Stack direction="row">
              <CancelOutlinedIcon sx={{ color: "red", mr: 1 }} />
              <Typography>Failed to Verify Account!</Typography>
            </Stack>
          )
        ) : null
      ) : showAccountVerificationStatus && isDrawerOpen ? (
        isAccountVerified ? (
          <StatusDrawer
            open={showAccountVerificationStatus && isDrawerOpen}
            type="success"
            headingMessage="Congratulations!!"
            subHeadingMessage1="Account Successfully verified."
            subHeadingMessage2="Please verify your aadhaar to start accepting payments."
            preventDrawerClose={true}
            CustomDrawerButton={VerifyAadhaarButton}
          />
        ) : (
          <StatusDrawer
            open={showAccountVerificationStatus && isDrawerOpen}
            type="failure"
            headingMessage="Verification Failed!"
            subHeadingMessage1={verificationFailureMessage}
            subHeadingMessage2="Please Try Again"
            preventDrawerClose={true}
            CustomDrawerButton={TryAgainButton}
          />
        )
      ) : null}

      <Box sx={{ marginTop: notPhoneScreen ? 4 : 8 }}>
        <GetHelp />
      </Box>

      <LoadingButton
        disabled={
          isButtonDisabled ||
          (!showAccountVerificationStatus && addAccountIsLoading)
        }
        onClick={handleSubmitClick}
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          minWidth: "320px",
          maxWidth: "400px",
          padding: 1.5,
          borderRadius: 20,
          height: 45,
        }}
      >
        {showAccountVerificationStatus ? (
          isAccountVerified ? (
            "Next"
          ) : (
            "Verify Again"
          )
        ) : addAccountIsLoading ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            Verifying
            <CircularProgress
              size={14}
              sx={{ marginLeft: 1, color: "#6f6f6f" }}
            />
          </Box>
        ) : (
          "Verify Account"
        )}
      </LoadingButton>
    </>
  );
};

export default BankAccountDetails;
