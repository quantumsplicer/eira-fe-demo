import React, { useState } from "react";
import {
    Box,
    Typography,
    Stack,
    Alert,
    useMediaQuery
} from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";
import PersonalDetails from "../../../components/PersonalDetails";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import SafeLogo from "../../../components/SafeLogo";
import { useDispatch } from "react-redux";
import { setTutorPhoneNumber } from "../../../stores/slices";

const InputTutorDetails: React.FC = () => {

    const [isPanUnverified, setIsPanUnverified] = useState<boolean>(false);
    const [isPanVerifying, setIsPanVerifying] = useState<boolean>(false);
    const notPhoneScreen = useMediaQuery('(min-width:850px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                justifyContent={"center"}
            >
                {
                    notPhoneScreen &&
                    <Box
                        alignSelf={"flex-end"}
                    >
                        <SafeLogo />
                    </Box>
                }
                {
                    notPhoneScreen &&
                    <Box
                        width={"55%"}
                        height={"30%"}
                        bgcolor={"#fff"}
                        zIndex={10}
                        p={5}
                        sx={{
                            borderRadius: "20px 0 0 20px"
                        }}
                    >
                        <PaymentBreakupInfo
                            name="Suneel Satpal"
                            phone="+91 93892 50148"
                            amount={5000}
                            settlementDate="7th October"
                            settlementTime="5:00 pm"
                        />
                    </Box>
                }
                <Box
                    width={notPhoneScreen ? "430px" : "100vw"}
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
                            <Alert
                                variant="filled"
                                severity="info"
                                icon={<InfoOutlinedIcon sx={{ color: '#DCA566', margin: "auto 0px" }} />}
                                sx={{
                                    backgroundColor: "rgba(251, 203, 168, 0.25)",
                                    color: "#CE7C4E",
                                    borderRadius: 5,
                                    marginBottom: 5,
                                    padding: 2
                                }}
                            >
                                <Typography sx={{ fontSize: 11 }}>
                                    Looks like the tutor is not onboarded!
                                </Typography>
                                <Typography sx={{ fontSize: 11 }}>
                                    Onboard them with us now to make the payment
                                </Typography>
                            </Alert>
                            <Typography
                                variant="h5"
                                sx={{ fontSize: 20, fontWeight: "bold" }}
                            >
                                Tutor personal details
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontSize: 14, mb: 4, textAlign: "center" }}
                            >
                                Provide Tutor's personal details for their onboarding
                            </Typography>
                            <PersonalDetails
                                onSuccess={() => navigate("/pay/create-session")}
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}

export default InputTutorDetails;