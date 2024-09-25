import React, { useEffect, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useAddAccountMutation } from "../APIs/definitions/bankAccounts";

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
    const invalidRegex = /[^A-Za-z0-9]/;
    if (invalidRegex.test(event.target.value[event.target.value.length - 1]))
      return;
    const inputIfsc: string = event.target.value.slice(0, 11);
    setIfsc(inputIfsc);
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
      .then(() => {
        setIsAccountVerified(true);
        setShowAccountVerificationStatus(true);
      })
      .catch(() => {
        setIsAccountVerified(false);
        setShowAccountVerificationStatus(false);
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

  useEffect(() => {
    checkButtonDisability();
  }, [accountNumber, verifyAccountNumber, ifsc]);

  return (
    <>
      <TextField
        autoFocus
        required
        value={accountNumber}
        disabled={addAccountIsLoading || isAccountVerified}
        onChange={(e) => handleAccountNumberInput(e, setAccountNumber)}
        onKeyDown={(event) => handleKeyDown(event)}
        fullWidth
        label="Account Number"
        variant="outlined"
        InputLabelProps={{
          shrink: false,
          style: { top: -40, left: -13, fontSize: 12 },
        }}
        sx={{
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
        disabled={addAccountIsLoading || isAccountVerified}
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
        fullWidth
        label="Re-enter Account Number"
        variant="outlined"
        InputLabelProps={{
          shrink: false,
          style: { top: -40, left: -13, fontSize: 12 },
        }}
        sx={{
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
        disabled={addAccountIsLoading || isAccountVerified}
        onChange={(e) => handleIfscInput(e)}
        onKeyDown={(event) => handleKeyDown(event)}
        error={ifsc.length === 11 && !isIfscValid()}
        helperText={ifsc.length === 11 && !isIfscValid() && "Enter valid IFSC"}
        fullWidth
        label="IFSC"
        variant="outlined"
        InputLabelProps={{
          shrink: false,
          style: { top: -40, left: -13, fontSize: 12 },
        }}
        sx={{
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
      {showAccountVerificationStatus ? (
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
      ) : null}
      <LoadingButton
        disabled={isButtonDisabled}
        onClick={handleSubmitClick}
        fullWidth
        loading={addAccountIsLoading}
        loadingPosition="end"
        // endIcon={null}
        variant="contained"
        color="primary"
        sx={{ padding: 1.5, borderRadius: 20, marginTop: 5, height: 45 }}
      >
        {showAccountVerificationStatus
          ? isAccountVerified
            ? "Next"
            : "Verify Again"
          : addAccountIsLoading
          ? "Verifying"
          : "Verify Account"}
      </LoadingButton>
    </>
  );
};

export default BankAccountDetails;
