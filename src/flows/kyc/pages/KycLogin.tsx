import { Box, Button, Drawer, Stack, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import SafeLogo from "../../../components/SafeLogo";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import SouthIcon from '@mui/icons-material/South';
import { useNavigate } from "react-router-dom";
import Amount from "../../../components/Amount";
import CustomProgressIndicator from "../../../components/CustomProgressIndicator";
import { useOnboarding } from "../../../customHooks/useOnboarding";

const KycLogin = () => {

    const notPhoneScreen = useMediaQuery('(min-width:850px)');
    const [nextStep, setNextStep] = useState<number>(2);
    const navigate = useNavigate();

    const handleProceedClick = () => {
        const token = localStorage.getItem("access-token");
        if (!token) {
            navigate("/tutor/login");
        } else {
            navigate("/tutor/personal-details");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("access-token");
        if (token) {
            const onboardingStep = localStorage.getItem("tutorOnboardingStep");
            if (onboardingStep) {
                setNextStep(Number.parseInt(onboardingStep));
            }
        }
      }, []);

    return (
        <Box
            pt={7}
            sx={{
                backgroundImage: notPhoneScreen ? `url(${EiraBack})` : '',
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
                {
                    notPhoneScreen &&
                    <Box
                        position={"absolute"}
                        bottom={52}
                        left={45}
                    >
                        <SafeLogo />
                    </Box>
                }
                {
                    notPhoneScreen &&
                    <Typography
                        ml={10}
                        color={"white"}
                        variant="h3"
                        width={"28%"}
                        fontWeight={"bold"}
                    >
                        Tuitions made accessible than ever before with Eira
                    </Typography>
                }
                <Box
                    mr={notPhoneScreen ? 5.5 : 0}
                    width={notPhoneScreen ? "410px" : "100vw"}
                    minHeight={notPhoneScreen ? "90vh" : "100vh"}
                    bgcolor={"#fff"}
                    border={notPhoneScreen ? "1px solid #ccc" : "none"}
                    padding={5}
                    borderRadius={notPhoneScreen ? 5 : 0}
                    boxShadow={notPhoneScreen ? "2px -2px 14px 2px #00000021" : "none"}
                >
                    <Stack
                        direction={"column"}
                    >
                        <img
                            src={EiraLogo}
                            style={{
                                alignSelf: notPhoneScreen ? "flex-start" : "center",
                                width: 80,
                            }}
                        />
                        <Stack
                            alignItems={"center"}
                            mt={5}
                        >
                            <Typography
                                textAlign={"center"}
                                variant="h5"
                                mt={5}
                            >
                                Complete your KYC to start receiving money
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                textAlign={"center"}
                                mt={5}
                                mb={10}
                            >
                                Login to continue with your KYC
                            </Typography>
                            <CustomProgressIndicator nextStep={nextStep} />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    padding: 1.5,
                                    borderRadius: 20,
                                    height: 45,
                                    mt: notPhoneScreen ? 15 : 35,
                                    width: '100%',
                                    minWidth: '320px',
                                    maxWidth: '400px',
                                }}
                                onClick={handleProceedClick}
                            >
                                Proceed
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default KycLogin;