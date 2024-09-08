import { Typography, Stack, Button, Box } from "@mui/material";
import React from "react";
import Aadhaar from "../../../assets/images/svg/Aadhaar.svg";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from "react-router-dom";

interface AadhaarVerifyInfoProps {
    aadhaarVerificationFailed: boolean | null;
}

const AadhaarVerifyInfo = ({aadhaarVerificationFailed}: AadhaarVerifyInfoProps) => {

    const navigate = useNavigate();

    return (
        <Stack alignItems={"center"} textAlign={"center"}>
            <Typography fontWeight={"bold"}>
                Aadhaar Verification
            </Typography>
            <Typography mt={2} color={"#6F6F6F"}>
                Please keep your Aadhaar egistered phone number with you for verification
            </Typography>
            <Typography mt={1} color={"#6F6F6F"}>
                Verify Aadhaar now to increase your payment acceptance limit to <span style={{color: "#000", fontWeight: "bold", fontSize: "15px"}}>₹50,000</span>
            </Typography>
            <Typography mt={1} color="#6F6F6F">
                Limit without Aadhaar Verification - <span style={{color: "#000", fontWeight: "bold", fontSize: "15px"}}>₹5,000</span>
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
                <Box mb={3} borderRadius={3} p={2} sx={{backgroundColor: "rgba(251, 203, 168, 0.25)"}}>
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
            <Button
                variant="contained"
                fullWidth
                sx={{
                    borderRadius: 20,
                    height: 45
                }}
                onClick={() => navigate('/tutor/aadhar-verification')}
            >
                Verify
            </Button>
            <Button
                variant="outlined"
                fullWidth
                sx={{
                    borderRadius: 20,
                    marginTop: 1,
                    height: 45
                }}
                onClick={() => navigate('/tutor/dashboard')}
            >
                Skip
            </Button>
        </Stack>
    )
}

export default AadhaarVerifyInfo;