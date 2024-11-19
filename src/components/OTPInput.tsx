// src/components/OTPDialog.tsx
import React, { useState, useRef, createRef, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  useMediaQuery,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetOtpMutation,
  useValidateOtpMutation,
} from "../APIs/definitions/auth";

const OPT_LENGTH = 4;

interface OTPInputProps {
  open?: boolean;
  onClose?: () => void;
  navigateTo?: string;
  phoneNumber: string;
  onVerified?: (result: any) => void;
  isDrawer: boolean;
  role: "teacher" | "student";
  onChangePhoneNumber?: () => void;
}

const OTPInput = ({
  open,
  onClose,
  navigateTo,
  phoneNumber,
  onVerified,
  isDrawer,
  role,
  onChangePhoneNumber,
}: OTPInputProps) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const otpInputsRef = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const [isOtpInvalid, setIsOtpInvalid] = useState<boolean>(false);
  const location = useLocation();
  const notPhoneScreen = useMediaQuery("(min-width:850px)");
  const [resendOtpCountdown, setResendOtpCountdown] = useState<number>(0);

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
    const result = await validateOtp({
      phone: phoneNumber,
      otp,
      role: location.pathname.includes("tutor") ? "teacher" : "student",
    }).catch((err) => {
      console.log(err);
    });
    if (!result?.data?.token) {
      setIsOtpInvalid(true);
      return;
    }

    if (onVerified) {
      onVerified(result?.data?.id);
    }

    localStorage.setItem("phoneNumber", phoneNumber);
    if (
      location.pathname.includes("student") ||
      location.pathname.includes("pay-tuition-fees")
    ) {
      localStorage.setItem("studentLogin", "true");
      localStorage.removeItem("tutorLogin");
    } else if (location.pathname.includes("tutor")) {
      localStorage.setItem("tutorLogin", "true");
      localStorage.removeItem("studentLogin");
    }
    navigateTo && navigate(navigateTo);
  };

  const resendOtp = () => {
    if (resendOtpCountdown > 0) {
      return;
    }
    setOtp("");
    setIsOtpInvalid(false);
    setActiveIndex(0);

    getOtp({ phone: phoneNumber, role: role });
    startResendOtpCountdown();
  };

  const startResendOtpCountdown = () => {
    setResendOtpCountdown(30);
    let remainingTime = 30 * 1000;

    const timer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime -= 1000;
        setResendOtpCountdown(remainingTime / 1000);

        if (remainingTime === 0) {
          clearInterval(timer);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    otpInputsRef.current = Array.from({ length: OPT_LENGTH }).map(() =>
      createRef<HTMLInputElement>()
    );
    setOtp("");
    setActiveIndex(0);
    startResendOtpCountdown();
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

  useEffect(() => {
    if(otp.length === 4) {
      handleSubmit()
    }
  }, [otp.length])

  return (
    <Stack alignItems={"center"}>
      <Typography fontWeight={"500"} variant="h6" mt={notPhoneScreen ? 8 : 2}>
        Verify Phone Number
      </Typography>
      <Typography
        mt={3}
        mb={notPhoneScreen || isDrawer ? 5 : 12}
        textAlign={"center"}
        color="#6F6F6F"
      >
        Enter OTP for phone number verification
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, pt: 2 }}>
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
      <Stack mt={2} alignItems={"center"}>
        <Typography
          onClick={resendOtp}
          fontSize={14}
          width={"fit-content"}
          sx={{
            borderBottomWidth: "1px",
            borderBottomStyle: "solid",
            borderBottomColor: resendOtpCountdown > 0 ? "#cecece" : "#6285FF",
            cursor: "pointer",
            color: resendOtpCountdown > 0 ? "#cecece" : "#6285FF",
          }}
        >
          Resend OTP
        </Typography>
        {resendOtpCountdown > 0 && (
          <Typography fontSize={14} mt={1}>
            in {resendOtpCountdown} seconds
          </Typography>
        )}
      </Stack>
      <Typography
        onClick={onChangePhoneNumber && onChangePhoneNumber}
        fontSize={14}
        color="#6285FF"
        mt={resendOtpCountdown > 0 ? 1 : 4.7}
        sx={{
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "#6285FF",
          cursor: "pointer",
        }}
      >
        Change phone number
      </Typography>
      {/* <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={otp.length !== 4}
        fullWidth
        sx={{
          width: "100%",
          minWidth: "320px",
          maxWidth: "400px",
          marginTop: notPhoneScreen || isDrawer ? 10 : 30,
          height: 45,
          borderRadius: 20,
        }}
      >
        Verify OTP
      </Button> */}
    </Stack>
  );
};

export default OTPInput;
