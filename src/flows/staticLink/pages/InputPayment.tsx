import { Box, Button, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import EiraBack from "../../../assets/images/svg/EiraBack.svg";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate, useParams } from "react-router-dom";
import SafeLogo from "../../../components/SafeLogo";
import AmountBreakupCard from "../../../components/AmountBreakupCard";
import { useLazyGetUserByUserNameQuery } from "../../../APIs/definitions/user";
import { trackEvent } from "../../../utils/amplitude";

const InputPayment = () => {

    const [amount, setAmount] = useState("");
    const navigate = useNavigate();
    const notPhoneScreen = useMediaQuery('(min-width:850px)');
    const activePaymentTutorName = localStorage.getItem("activePaymentTutorName");
    const activePaymentTutorId = localStorage.getItem("activePaymentTutorId");

    const [getTutorDetails] = useLazyGetUserByUserNameQuery();

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const invalidRegex = /[^0-9]/
        const inputValue = event.target.value;
        if (inputValue === '' || !invalidRegex.test(inputValue)) {
            setAmount(inputValue);
            localStorage.setItem("activePaymentAmount", inputValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        trackEvent("Clicked Proceed")
        const isStudentSignedIn = localStorage.getItem("studentLogin") === "true"
        let isTutorPgOnboarded = false;
        const links = window.location.pathname.split("/");
        const tutorUsername = links[links.length -1] === "" ? links[links.length-2] :  links[links.length -1];

        await getTutorDetails(tutorUsername)
            .unwrap()
            .then(res => {
                const tutor = res[0];
                isTutorPgOnboarded = tutor?.pg_onboarding_status &&
                    tutor.pg_onboarding_status?.length > 0 && 
                    (tutor.pg_onboarding_status[0].status === "MIN_KYC_APPROVED" || tutor.pg_onboarding_status[0].status === "ACTIVE");
            })
            .catch()

        if (isStudentSignedIn) {
            isTutorPgOnboarded ? navigate("/pay/review") : navigate("/pay/create-session");
        } else {
            navigate("/student/login");
        }
    };

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
                            name={activePaymentTutorName ? activePaymentTutorName : ""}
                            phone={activePaymentTutorId ? `+91 ${activePaymentTutorId}` : ""}
                            amount={Number(amount)}
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
                    <Stack>
                        <img
                            src={EiraLogo}
                            style={{
                                alignSelf: notPhoneScreen ? "flex-start" : "center",
                                width: 80,
                            }}
                        />
                        <Stack
                            alignItems={"center"}
                            mt={10}
                        >
                            <Typography
                                variant="h5"
                                sx={{ fontSize: 20, fontWeight: "bold" }}
                            >
                                Payment Amount
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontSize: 14, mb: 4, mt: 2, textAlign: "center" }}
                            >
                                {
                                    activePaymentTutorName ?
                                    `Enter a valid amount to pay to ${activePaymentTutorName}` :
                                    `Enter a valid amount to pay`
                                }
                            </Typography>
                            <TextField
                                required
                                autoFocus
                                label="Amount to pay"
                                variant="outlined"
                                value={amount}
                                onBlur={() => {
                                    trackEvent("Entered Amount To Pay", {
                                        text: amount
                                    })
                                }}
                                onChange={handleAmountChange}
                                onKeyDown={handleKeyDown}
                                InputLabelProps={{
                                    shrink: false,
                                    style: { top: -40, left: -13, fontSize: 12 },
                                }}
                                sx={{
                                    width: '100%',
                                    minWidth: '320px',
                                    maxWidth: '400px',
                                    mt: 10,
                                    mb: 4,
                                    "& .MuiInputBase-root": {
                                        height: 45,
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        padding: "12px 14px",
                                        fontSize: 14,
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <Typography fontSize={14} sx={{ mr: 1 }}>
                                            ₹
                                        </Typography>
                                    ),
                                }}
                            />
                            {
                                !notPhoneScreen &&
                                <Box
                                    height="300px"
                                    width="350px"
                                    bgcolor={"#F5F5F5"}
                                    pt={2}
                                    pb={2}
                                    borderRadius={5}
                                    mt={3}
                                    mb={3}
                                >
                                    <AmountBreakupCard
                                        amount={Number(amount)}
                                        settlementDate={"9th October"}
                                        settlementTime={"5:00 pm"}
                                    />
                                </Box>
                            }
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    padding: 1.5,
                                    borderRadius: 20,
                                    mt: 5,
                                    width: '100%',
                                    minWidth: '320px',
                                    maxWidth: '400px',
                                }}
                                onClick={handleSubmit}
                                disabled={!amount || Number(amount) === 0}
                            >
                                Proceed to pay
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default InputPayment;
