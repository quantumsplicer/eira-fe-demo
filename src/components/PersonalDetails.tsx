import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  CircularProgress,
  TextField,
  useMediaQuery
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useRegisterTutorByStudentMutation,
  useUpdateUserDetailsMutation,
} from "../APIs/definitions/user";
import { RootState } from "../stores/configuration";
import { isPanValid } from "../utils/helperFunctions";
import GetHelp from "./GetHelp";

interface PersonalDetailsProps {
  onSuccess?: () => void;
}

const PersonalDetails = ({ onSuccess }: PersonalDetailsProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [pan, setPan] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string|null>(null);
  const notPhoneScreen = useMediaQuery("(min-width:850px)");

  const tutorPhoneNumber = useSelector(
    (state: RootState) => state.onGoingPayment.tutorPhoneNumber
  );
  const activePaymentTutorId = localStorage.getItem("activePaymentTutorId");
  const dispatch = useDispatch();

  const [updateTutor, { isLoading: updateTutorIsLoading }] =
    useUpdateUserDetailsMutation();
  const [registerTutor, { isLoading: registerTutorIsLoading }] =
    useRegisterTutorByStudentMutation();

  const handleFirstNameInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setName: (value: string) => void
  ) => {
    const invalidRegex = /[^A-Za-z]/g;
    const sanitizedValue = event.target.value;
    setName(sanitizedValue);
  };
  const handleLastNameInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setName: (value: string) => void
  ) => {
    const invalidRegex = /[^A-Za-z]/g;
    const sanitizedValue = event.target.value;
    setName(sanitizedValue);
  };

  const handlePanInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const invalidRegex = /[^A-Za-z0-9]/g;
    const sanitizedValue = event.target.value
      .replace(invalidRegex, "")
      .slice(0, 10)
      .toUpperCase();
    setPan(sanitizedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !isButtonDisabled) {
      handleSubmitClick();
    }
  };

  const handleSubmitClick = () => {
    if (firstName && lastName && isPanValid(pan)) {
      setErrorMessage(null);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("pan", pan);
      localStorage.setItem("onboardingUsername", `${firstName} ${lastName}`);
      
      if (tutorPhoneNumber || activePaymentTutorId) {
        registerTutor({
          first_name: firstName,
          last_name: lastName,
          pan: pan,
          phone: activePaymentTutorId ? activePaymentTutorId : tutorPhoneNumber,
          amount: Number(localStorage.getItem("activePaymentAmount"))
        })
          .unwrap()
          .then((res) => {
            localStorage.setItem("activePaymentPayeeUserId", res.id);
            localStorage.setItem(
              "activePaymentTutorName",
              res.first_name + " " + res.last_name
            );
            onSuccess && onSuccess();
          })
          .catch((error) => {
            setErrorMessage(error?.data?.message);
          });
      } else {
        updateTutor({
          first_name: firstName,
          last_name: lastName,
          pan: pan,
        })
          .unwrap()
          .then((res) => {
            onSuccess && onSuccess();
          })
          .catch((error) => {
            setErrorMessage(error?.data?.message);
          });
      }
    }
  };

  useEffect(() => {
    setIsButtonDisabled(true);
    if (firstName && lastName && pan.length === 10 && isPanValid(pan)) {
      setIsButtonDisabled(false);
    }
  }, [firstName, lastName, pan]);

  useEffect(() => {
    const autoFillDetails = localStorage.getItem("autoFillDetails") === "true";
    if (
      autoFillDetails &&
      localStorage.getItem("firstName") &&
      localStorage.getItem("lastName") &&
      localStorage.getItem("pan")
    ) {
      setFirstName(localStorage.getItem("firstName") as string);
      setLastName(localStorage.getItem("lastName") as string);
      setPan(localStorage.getItem("pan") as string);
    }
  }, []);

  return (
    <>
      <TextField
        autoFocus
        disabled={updateTutorIsLoading}
        required
        value={firstName}
        onChange={(e) => handleFirstNameInput(e, setFirstName)}
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
        onChange={(e) => handleLastNameInput(e, setLastName)}
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
          (!updateTutorIsLoading && errorMessage !== null)
        }
        helperText={
          pan.length === 10 && !isPanValid(pan)
            ? "Enter valid PAN"
            : !updateTutorIsLoading &&
              errorMessage &&
              `${errorMessage}`
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
          marginTop: notPhoneScreen ? 2 : 4,
          borderRadius: 20,
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

      <Box>
        <GetHelp />
      </Box>
    </>
  );
};

export default PersonalDetails;
