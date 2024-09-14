import React from "react";
import { TextField, Box } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 10,
    "& fieldset": {
      borderColor: "#e0e0e0",
      borderWidth: 1,
    },
    "&:hover fieldset": {
      borderColor: "#b0b0b0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root": {
    backgroundColor: theme.palette.background.default,
    padding: "0 4px",
    marginLeft: "-4px",
  },
  "& .MuiInputLabel-outlined": {
    transform: "translate(14px, -20px) scale(0.75)",
  },
  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -30px) scale(0.75) !important",
  },
  marginBottom: 20,
}));

const Form = () => {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        margin: "auto",
      }}
    >
      <StyledTextField label="Phone Number" variant="outlined" fullWidth />
      <StyledTextField label="Amount" variant="outlined" fullWidth />
    </Box>
  );
};

export default Form;
