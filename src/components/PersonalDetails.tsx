import React, { useEffect, useState } from "react";
import { Box, CircularProgress, TextField, useMediaQuery } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useUpdateUserDetailsMutation } from "../APIs/definitions/user";
import { isPanValid } from "../utils/helperFunctions";

interface PersonalDetailsProps {
  onSuccess?: () => void;
}

const PersonalDetails = ({ onSuccess }: PersonalDetailsProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [pan, setPan] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isPanUnverified, setIsPanUnverified] = useState<boolean>(false);
  const notPhoneScreen = useMediaQuery("(min-width:850px)");

  const [updateTutor, { isLoading: updateTutorIsLoading }] =
    useUpdateUserDetailsMutation();

  const handleNameInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setName: (value: string) => void
  ) => {
    const invalidRegex = /[^A-Za-z]/;
    if (invalidRegex.test(event.target.value[event.target.value.length - 1]))
      return;
    setName(event.target.value);
  };

  const handlePanInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const invalidRegex = /[^A-Za-z0-9]/;
    if (invalidRegex.test(event.target.value[event.target.value.length - 1]))
      return;
    const inputPan: string = event.target.value.slice(0, 10);
    setPan(inputPan);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !isButtonDisabled) {
      handleSubmitClick();
    }
  };

  const handleSubmitClick = () => {
    if (firstName && lastName && isPanValid(pan)) {
      updateTutor({
        first_name: firstName,
        last_name: lastName,
        pan: pan,
      })
        .then(() => {
          setIsPanUnverified(false);
          onSuccess && onSuccess();
        })
        .catch(() => {
          setIsPanUnverified(true);
        });
    }
  };

  useEffect(() => {
    setIsButtonDisabled(true);
    if (firstName && lastName && pan.length === 10 && isPanValid(pan)) {
      setIsButtonDisabled(false);
    }
  }, [firstName, lastName, pan]);

  return (
    <>
      <TextField
        autoFocus
        disabled={updateTutorIsLoading}
        required
        value={firstName}
        onChange={(e) => handleNameInput(e, setFirstName)}
        onKeyDown={(event) => handleKeyDown(event)}
        label="First Name (as per PAN)"
        variant="outlined"
        InputLabelProps={{
          shrink: false,
          style: { top: -40, left: -13, fontSize: 12 },
        }}
        sx={{
          width: "100%",
          minWidth: "320px",
          maxWidth: "400px",
          mt: notPhoneScreen ? 2 : 4,
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
        disabled={updateTutorIsLoading}
        required
        value={lastName}
        onChange={(e) => handleNameInput(e, setLastName)}
        onKeyDown={(event) => handleKeyDown(event)}
        label="Last Name (as per PAN)"
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
        disabled={updateTutorIsLoading}
        required
        value={pan}
        onChange={(e) => handlePanInput(e)}
        onKeyDown={(event) => handleKeyDown(event)}
        error={
          (pan.length === 10 && !isPanValid(pan)) ||
          (!updateTutorIsLoading && isPanUnverified)
        }
        helperText={
          pan.length === 10 && !isPanValid(pan)
            ? "Enter valid PAN"
            : !updateTutorIsLoading &&
              isPanUnverified &&
              "PAN number and given name do not match. Please check again."
        }
        label="PAN"
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
      <LoadingButton
        disabled={isButtonDisabled || updateTutorIsLoading}
        onClick={handleSubmitClick}
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          minWidth: "320px",
          maxWidth: "400px",
          padding: 1.5,
          borderRadius: 20,
          marginTop: notPhoneScreen ? 4 : 18,
          height: 45,
        }}
      >
        {updateTutorIsLoading ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            Verifying
            <CircularProgress
              size={14}
              sx={{ marginLeft: 1, color: "#6f6f6f" }}
            />
          </Box>
        ) : (
          "Proceed"
        )}
      </LoadingButton>
    </>
  );
};

export default PersonalDetails;