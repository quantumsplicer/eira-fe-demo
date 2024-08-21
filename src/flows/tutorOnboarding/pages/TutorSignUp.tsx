import React, { useState } from "react";

import {
    Stack,
    Box,
    Typography,
    Button
} from "@mui/material"
import { EiraBack2 } from "../../../components/EiraBack2"
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";
import DialogMessage from "../../../dialogs/DialogMessage";
import PersonalDetails from "../../../components/PersonalDetails";
import BankAccountDetails from "../../../components/BankAccountDetails";

const TutorSignUp: React.FC = () => {

    const navigate = useNavigate();
    const [signUpStep, setSignUpStep] = useState<number>(1);
    // const [pan, setPan] = useState<string>('');
    const [isPanVerifying, setIsPanVerifying] = useState<boolean>(false);
    const [isAccountVerifying, setIsAccountVerifying] = useState<boolean>(false);
    const [showAccountVerificationStatus, setShowAccountVerificationStatus] = useState<boolean>(false);
    const [isAccountVerified, setIsAccountVerified] = useState<boolean>(false);
    const [isPanUnverified, setIsPanUnverified] = useState<boolean>(false);

    const verifyAccount = () => {
        setShowAccountVerificationStatus(false);
        setIsAccountVerifying(true);
        setTimeout(() => {
            setIsAccountVerifying(false);
            setShowAccountVerificationStatus(true);
            setIsAccountVerified(true);
            // setSignUpStep(3);
            // navigate('/tutor/aadhar-verification');
        }, 5000);
    }

    const verifyPan = () => {

        setIsPanVerifying(true);
        // setIsPanUnverified(false);
        setTimeout(() => {
            setIsPanVerifying(false);
            setIsPanUnverified(false)
            setSignUpStep(2);
            // navigate("/pay/payment-details");
        }, 5000);
    }

    const VerifyAadhaarButton: React.FC = () => {
        return (
            <>
                <Button
                    onClick={() => navigate('/tutor/aadhar-verification')}
                    variant="contained"
                    color="primary"
                    sx={{ padding: 1.5, borderRadius: 2, width: "75%" }}
                >
                    Verify Aadhaar
                </Button>
            </>
        )
    }

    const TryAgainButton: React.FC = () => {
        return (
            <>
                <Button
                    onClick={() => setShowAccountVerificationStatus(false)}
                    variant="contained"
                    color="primary"
                    sx={{ padding: 1.5, borderRadius: 2, width: "75%" }}
                >
                    Try Again
                </Button>
            </>
        )
    }

    return (
        <Stack
            direction={"row"}
            sx={{ justifyContent: "center", alignItems: "center" }}
        >
            <Stack sx={{ width: "50%" }} alignItems={"center"}>
                <img
                    src={EiraLogo}
                    style={{
                        alignSelf: "flex-start",
                        width: 80,
                        position: "absolute",
                        marginLeft: 20,
                        top: 20,
                    }}
                />
                <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ width: "80%", px: 18 }}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontSize: 20, fontWeight: "bold" }}
                    >
                        Sign Up
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontSize: 14, mb: 4, textAlign: "center" }}
                    >
                        Step {signUpStep} of 3
                    </Typography>
                    {
                        signUpStep === 1 &&
                            <PersonalDetails
                                isPanUnverified={isPanUnverified}
                                isVerifying={isPanVerifying}
                                onSubmit={verifyPan}
                            />
                    }
                    {
                        signUpStep === 2 &&
                            <BankAccountDetails
                                isAccountVerifying={isAccountVerifying}
                                onSubmit={verifyAccount}
                            />
                    }
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            mt: 4,
                            textAlign: "center",
                            position: "absolute",
                            bottom: 20,
                        }}
                    >
                        <a
                            href="https://google.com"
                            target="_blank"
                            style={{ textDecoration: "none" }}
                        >
                            <Typography variant="body2" color="grey">
                                privacy policies
                            </Typography>
                        </a>
                        <Typography variant="body2" color="grey">
                            |
                        </Typography>
                        <a
                            href="https://google.com"
                            target="_blank"
                            style={{ textDecoration: "none" }}
                        >
                            <Typography variant="body2" color="grey">
                                terms of use
                            </Typography>
                        </a>
                    </Stack>
                </Stack>
            </Stack>
            <DialogMessage
                open={showAccountVerificationStatus && isAccountVerified}
                onClose={() => setShowAccountVerificationStatus(false)}
                type="success"
                headingMessage="Congratulations!!"
                subHeadingMessage={"Account successfully verified"}
                preventDialogClose={true}
                CustomDialogButton={VerifyAadhaarButton}
            />
            <DialogMessage
                open={showAccountVerificationStatus && !isAccountVerified}
                onClose={() => setShowAccountVerificationStatus(false)}
                type="error"
                headingMessage="Verification failed!"
                subHeadingMessage="Error message"
                preventDialogClose={false}
                CustomDialogButton={TryAgainButton}
            />
            <Box sx={{ width: "50%", p: 2, height: "100vh" }}>
                <EiraBack2 />
            </Box>
        </Stack>
    )
}

export default TutorSignUp;