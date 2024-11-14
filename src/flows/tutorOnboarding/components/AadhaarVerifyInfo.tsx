import { Typography, Stack, Button, Box, useMediaQuery, CircularProgress } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import Aadhaar from "../../../assets/images/svg/Aadhaar.svg";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useNavigate } from "react-router-dom";
import { useOnboardUserMutation } from "../../../APIs/definitions/onboarding";
import { useGetUserDetailsQuery } from "../../../APIs/definitions/user";

interface AadhaarVerifyInfoProps {
  showHeading: boolean;
}

const AadhaarVerifyInfo = ({ showHeading }: AadhaarVerifyInfoProps) => {
  const navigate = useNavigate();
  const notPhoneScreen = useMediaQuery("(min-width:850px)");
  const [aadhaarVerificationFailed, setAadhaarVerificationFailed] = useState<
    boolean | null
  >(null);


    const [onboardUser, { isLoading }] = useOnboardUserMutation();
    const { data: userDetails } = useGetUserDetailsQuery();

    const handleVerifyClick = () => {
        onboardUser({
            user_id: userDetails?.id ?? ""
        })
            .unwrap()
            .then(res => {
                console.log(res)
                if (res.onboarding_link) {
                    window.location.href = res.onboarding_link;
                } else {
                    setAadhaarVerificationFailed(true);
                }
            })
            .catch(error => {
                console.log(error.status);
                console.log(error.data?.message);
                setAadhaarVerificationFailed(true);
            })
    }

    return (
        <Stack alignItems={"center"} textAlign={"center"}>
            {
                showHeading &&
                <Typography fontWeight={"bold"}>
                    Aadhaar Verification
                </Typography>
            }
            <Typography mt={2} color={"#6F6F6F"}>
                Please keep your Aadhaar registered phone number with you for verification
            </Typography>
            <Typography mt={1} color={"#6F6F6F"}>
                Verify Aadhaar now to increase your payment acceptance limit to <span style={{color: "#000", fontWeight: "bold", fontSize: "15px"}}>₹50,000</span>
            </Typography>
            <Typography fontSize={12} color="#6F6F6F">
              +91-98731 89338 OR +91-95104 63209
            </Typography>

            <img
                src={Aadhaar}
                style={{
                    height: 100,
                    marginTop: 20,
                    marginBottom: 20
                }}
            />
            {
                aadhaarVerificationFailed &&
                <Box mb={1} borderRadius={3} p={2} sx={{backgroundColor: "rgba(251, 203, 168, 0.25)"}}>
                    <Stack fontSize={12} alignItems={"center"}>
                        <Stack mb={2} direction={"row"} alignItems={"center"}>
                            <CancelOutlinedIcon sx={{color: "red", marginRight: 1}} />
                            <Typography fontSize={12} color={"red"}>
                                Verification Failed!
                            </Typography>
                        </Stack>
                        <Typography fontSize={12} color="#6F6F6F">
                            Contact Us Now for resolution
                        </Typography>
                        <Typography fontSize={12} color="#6F6F6F">
                            +91-98731 89338 OR +91-95104 63209
                        </Typography>
                    </Stack>
                </Box>
            }
            {/* <Button
                variant="contained"
                disabled={isLoading}
                sx={{
                    width: '100%',
                    minWidth: '320px',
                    maxWidth: '400px',
                    borderRadius: 20,
                    height: 45,
                    marginTop: aadhaarVerificationFailed ? 2 : 17
                }}
                onClick={handleVerifyClick}
            >
                {
                    isLoading ? "Verifying" :
                        (aadhaarVerificationFailed ? "Verify Again" : "Verify")
                }
            </Button> */}
            <LoadingButton
                disabled={isLoading}
                onClick={handleVerifyClick}
                variant="contained"
                color="primary"
                sx={{
                    width: "100%",
                    minWidth: "320px",
                    maxWidth: "400px",
                    padding: 1.5,
                    borderRadius: 20,
                    marginTop: aadhaarVerificationFailed ? 2 : 17,
                    height: 45,
                }}
            >
                {isLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        Verifying
                        <CircularProgress
                            size={14}
                            sx={{ marginLeft: 1, color: "#6f6f6f" }}
                        />
                    </Box>
                ) : (
                    aadhaarVerificationFailed ? "Verify Again" : "Verify"
                )}
            </LoadingButton>
            
            {/* Escrow account flow */}
            {/* <Button
                variant="outlined"
                sx={{
                    width: '100%',
                    minWidth: '320px',
                    maxWidth: '400px',
                    borderRadius: 20,
                    marginTop: 1,
                    height: 45
                }}
                onClick={() => navigate('/tutor/dashboard')}
            >
                Skip
            </Button> */}
        </Stack>
    )
}

export default AadhaarVerifyInfo;
