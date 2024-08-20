import React, { useState } from "react";
import {
    Box,
    Typography,
    Stack,
} from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";
import { EiraBack1 } from "../../../components/EiraBack1";
import TutorOnboardingInfo from "../../../components/TutorOnboardingInfo";
import PersonalDetails from "../../../components/PersonalDetails";
import BankAccountDetails from "../../../components/BankAccountDetails";

const InputTutorDetails: React.FC = () => {

    const [step, setStep] = useState<string>('personal');
    // const [pan, setPan] = useState<string>('');
    const [isPanUnverified, setIsPanUnverified] = useState<boolean>(false);
    const [isPanVerifying, setIsPanVerifying] = useState<boolean>(false);
    const [isAccountVerifying, setIsAccountVerifying] = useState<boolean>(false);
    const navigate = useNavigate();

    const verifyPan = () => {

        setIsPanVerifying(true);
        // setIsPanUnverified(false);
        setTimeout(() => {
            setIsPanVerifying(false);
            setIsPanUnverified(false)
            setStep("account");
            // navigate("/pay/payment-details");
        }, 5000);
    }

    const verifyAccount = () => {
        setIsAccountVerifying(true);
        setTimeout(() => {
            setIsAccountVerifying(false);
            navigate('/pay/create-session');
        }, 5000);
    }

    return (
        <Stack
            direction="row"
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ width: "50%", p: 2, height: "100vh" }}>
                <EiraBack1 />
            </Box>
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
                <TutorOnboardingInfo
                    infoMessage="Onboard them with us now to make the payment"
                />
                <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ width: "85%", px: 18 }}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontSize: 20, fontWeight: "bold", mb: 2 }}
                    >
                        Tutor {step} details
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontSize: 16, mb: 4, textAlign: "center" }}
                    >
                        Provide Tutor's {step} details for their onboarding
                    </Typography>
                    {
                        step === "personal" &&
                            <PersonalDetails
                                isPanUnverified={isPanUnverified}
                                isVerifying={isPanVerifying}
                                onSubmit={verifyPan}
                            />
                    }
                    {
                        step === "account" &&
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
        </Stack>
    );
}

export default InputTutorDetails;