import { Box, Button, Drawer, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import SafeLogo from "../../../components/SafeLogo";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import SouthIcon from '@mui/icons-material/South';
import { useNavigate } from "react-router-dom";
import Amount from "../../../components/Amount";
import CustomProgressIndicator from "../../../components/CustomProgressIndicator";

const KycLogin = () => {

    const notPhoneScreen = useMediaQuery('(min-width:850px)');
    const navigate = useNavigate();

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
                            >
                                Complete your KYC to get <Amount amount={15000} /> settled in your account
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                textAlign={"center"}
                                mt={5}
                                mb={10}
                            >
                                Login to continue with your KYC
                            </Typography>
                            <CustomProgressIndicator />
                            <Stack
                                direction={"row"}
                                mt={notPhoneScreen ? 10 : 25}
                                mb={5}
                            >
                                <Typography
                                    fontWeight={"500"}
                                    fontSize={18}
                                    mr={1}
                                >
                                    Login Now
                                </Typography>
                                <SouthIcon />
                            </Stack>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    padding: 1.5,
                                    borderRadius: 20,
                                    height: 45,
                                    mt: 5,
                                    width: '100%',
                                    minWidth: '320px',
                                    maxWidth: '400px',
                                }}
                                onClick={() => navigate('/tutor/login')}
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