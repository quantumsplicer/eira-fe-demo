import React from "react";
import {
    Typography,
    TextField,
    Stack,
} from "@mui/material";

interface PhoneNumberInputFieldProps {
    label: string;
    phone: string;
    setPhoneNumber: (phone: string) => void;
    onSubmit: () => void;
    autoFocus: boolean;
}

const PhoneNumberInputField = ({ label, phone, setPhoneNumber, onSubmit, autoFocus }: PhoneNumberInputFieldProps) => {

    const handlePhoneNumberChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const invalidRegex = /[^0-9]/
        const inputValue = event.target.value;
        if (inputValue === '' || !invalidRegex.test(inputValue)) {
            let inputPhoneNumber: string = inputValue.slice(0, 10);
            setPhoneNumber(inputPhoneNumber);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && phone.length === 10 && isPhoneNumberValid()) {
            onSubmit();
        }
    }

    const isPhoneNumberValid = (): boolean => {
        const regex = /^[6-9]\d{9}$/;
        return regex.test(phone);
    }

  return (
    <TextField
      autoFocus={autoFocus}
      fullWidth
      label={label}
      variant="outlined"
      value={phone}
      onChange={handlePhoneNumberChange}
      onKeyDown={handleKeyDown}
      size="small"
      error={phone.length === 10 && !isPhoneNumberValid()}
      helperText={
        phone.length === 10 &&
        !isPhoneNumberValid() &&
        "Enter valid phone number"
      }
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
  );
};

export default PhoneNumberInputField
