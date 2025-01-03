// src/components/OTPDialog.tsx
import React, { useState, useRef, createRef, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogContent,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetOtpMutation,
  useValidateOtpMutation,
} from "../../../APIs/definitions/auth";

const OPT_LENGTH = 4;

interface OTPInputProps {
  open: boolean;
  onClose: () => void;
  navigateTo: string;
  phoneNumber: string;
}

const OTPInputDialog = ({
  open,
  onClose,
  navigateTo,
  phoneNumber,
}: OTPInputProps) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const otpInputsRef = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const [isOtpInvalid, setIsOtpInvalid] = useState<boolean>(false);
  const location = useLocation();

  const [getOtp, { isLoading: getOtpIsLoading }] = useGetOtpMutation();
  const [validateOtp, { isLoading: validateOtpIsLoading }] =
    useValidateOtpMutation();

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index]) {
      setActiveIndex(index - 1);
      setOtp((prev) => prev.slice(0, index - 1) + prev.slice(index));
      return;
    }
    if (e.key === "Enter" && otp.length === OPT_LENGTH) {
      handleSubmit();
    }
  };

  const handleOTPInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const invalidRegex = /[^0-9]/;
    const inputValue = e.target.value;

    if (inputValue === "" || !invalidRegex.test(inputValue)) {
      setIsOtpInvalid(false);

      // Handle deletion
      if (inputValue === "") {
        // If there is a value at the current index, remove it
        if (otp[index] !== "") {
          setOtp((prev) => prev.slice(0, index) + prev.slice(index + 1));
          // No need to change activeIndex here as we're staying in the same input
        } else if (index > 0) {
          // If the current index is empty, move one step back and delete the character there
          setActiveIndex(index - 1); // Move back to the previous input
          setOtp((prev) => prev.slice(0, index - 1) + prev.slice(index)); // Delete the character at the new active index
        }
        return; // Early return after handling deletion
      }

      // Handle new input
      if (inputValue.length === 1) {
        setOtp(
          (prev) => prev.slice(0, index) + inputValue + prev.slice(index + 1)
        );

        // Move to the next input if not the last one
        if (index < OPT_LENGTH - 1) {
          setActiveIndex(index + 1);
        }
      }
    }
  };

  const handleSubmit = async () => {
    // navigate("/pay/payment-details")
    // const result = await validateOtp({
    //   phone: phoneNumber,
    //   otp,
    //   role: location.pathname.includes("student") ? "student" : "teacher",
    // });

    // if (!result?.data?.token) {
    //   setIsOtpInvalid(true);
    //   return;
    // }

    localStorage.setItem("phoneNumber", phoneNumber);
    if (location.pathname.includes("student")) {
      localStorage.setItem("studentLogin", "true");
      localStorage.removeItem("tutorLogin");
    } else if (location.pathname.includes("tutor")) {
      localStorage.setItem("tutorLogin", "true");
      localStorage.removeItem("studentLogin");
    }
    navigate(navigateTo);
  };

  const resendOtp = () => {
    setOtp("");
    setIsOtpInvalid(false);
    setActiveIndex(0);

    getOtp({ phone: phoneNumber, role: "student" });
  };

  useEffect(() => {
    otpInputsRef.current = Array.from({ length: OPT_LENGTH }).map(() =>
      createRef<HTMLInputElement>()
    );
    setOtp("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (otpInputsRef.current[activeIndex]?.current) {
        console.log("otp");
        otpInputsRef.current[activeIndex].current?.focus();
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Stack alignItems={"center"}>
          <Typography fontWeight={"bold"} variant="h6" mt={8}>
            Verify Phone Number
          </Typography>
          <Typography mt={1} mb={5}>
            Enter OTP for phone number verification
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              pt: 2,
              mt: 8,
            }}
          >
            {Array.from({ length: OPT_LENGTH }).map((_, index) => (
              <TextField
                key={index}
                inputRef={otpInputsRef.current[index]}
                value={otp[index] || ""}
                error={isOtpInvalid}
                variant="outlined"
                sx={{
                  borderRadius: 20,
                }}
                onChange={(event) => handleOTPInput(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    padding: 1,
                    width: 40,
                    height: 40,
                  },
                }}
              />
            ))}
          </Box>
          {isOtpInvalid && (
            <Typography color="#d32f2f" fontSize={14} mt={1}>
              Incorrect OTP. Please retry.
            </Typography>
          )}
          {isOtpInvalid && (
            <Typography
              onClick={resendOtp}
              fontSize={14}
              mt={2}
              sx={{
                borderBottom: "1px solid #6285FF",
                cursor: "pointer",
                color: "#6285FF",
              }}
            >
              Resend OTP
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={otp.length !== 4}
            fullWidth
            sx={{
              width: "80%",
              marginTop: 10,
              height: 45,
              borderRadius: 20,
            }}
          >
            Verify OTP
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default OTPInputDialog;
