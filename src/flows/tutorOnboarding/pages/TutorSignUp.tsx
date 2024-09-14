import React, { useState } from "react";

import {
    Stack,
    Box,
    Typography
} from "@mui/material"
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";
import PersonalDetails from "../../../components/PersonalDetails";
import BankAccountDetails from "../../../components/BankAccountDetails";
import NoteBox from "../../../components/NoteBox";
import LinearProgress from '@mui/material/LinearProgress';
import AadhaarVerifyInfo from "../components/AadhaarVerifyInfo";
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import SafeLogo from "../../../components/SafeLogo";

const TutorSignUp: React.FC = () => {

    const navigate = useNavigate();
    const [signUpStep, setSignUpStep] = useState<number>(1);
    const [isPanVerifying, setIsPanVerifying] = useState<boolean>(false);
    const [isAccountVerifying, setIsAccountVerifying] = useState<boolean>(false);
    const [isPanUnverified, setIsPanUnverified] = useState<boolean>(false);
    const [aadhaarVerificationFailed, setAadhaarVerificationFailed] = useState<boolean | null>(null);

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

    const step1Notes = [
        "Input First Name and Last Name as on PAN given.",
        "Make sure you give a valid PAN."
    ]

    const step2Notes = [
        "Please ensure that account holder's name is same as the name entered before"
    ]

    return (
        <Box
            pt={7}
            sx={{
                backgroundImage: `url(${EiraBack})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                minWidth: '100vw',
            }}
        >
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Box
                    position={"absolute"}
                    bottom={52}
                    left={45}
                >
                    <SafeLogo />
                </Box>
                <Typography
                    ml={10}
                    color={"white"}
                    variant="h3"
                    width={"28%"}
                    fontWeight={"bold"}
                >
                    Finest tutors use Eira to manage their payments
                </Typography>
                <Box
                    mr={5.5}
                    width="30vw"
                    minHeight="90vh"
                    bgcolor={"#fff"}
                    border={"1px solid #ccc"}
                    padding={5}
                    borderRadius={5}
                    boxShadow={"2px -2px 14px 2px #00000021"}
                >
                    <Stack
                        direction={"column"}
                    >
                        <img
                            src={EiraLogo}
                            style={{
                                alignSelf: "flex-start",
                                width: 80,
                            }}
                        />
                        <Stack
                            alignItems={"center"}
                            mt={2}
                        >
                            <Typography
                                color={"black"}
                                variant="h6"
                                fontWeight={"bold"}
                            >
                                Tutor Sign-up
                            </Typography>
                            <Stack
                                direction={"row"}
                                width={"60%"}
                                mt={2}
                                mb={5}
                            >
                                <Box width={"32%"} mr={1}>
                                    <LinearProgress variant="determinate" value={100} />
                                </Box>
                                <Box width="32%" mr={1}>
                                    <LinearProgress variant="determinate" value={signUpStep >= 2 ? 100 : 0} />
                                </Box>
                                <Box width="32%">
                                    <LinearProgress variant="determinate" value={signUpStep >= 3 ? 100 : 0} />
                                </Box>
                            </Stack>
                            {
                                signUpStep === 1 &&
                                <NoteBox
                                    heading="Note:"
                                    notes={step1Notes}
                                />
                            }
                            {
                                signUpStep === 2 &&
                                <NoteBox
                                    notes={step2Notes}
                                />
                            }
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
                                    onSubmit={() => setSignUpStep(3)}
                                />
                            }
                            {
                                signUpStep === 3 &&
                                <AadhaarVerifyInfo
                                    aadhaarVerificationFailed={aadhaarVerificationFailed}
                                />
                            }
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default TutorSignUp;