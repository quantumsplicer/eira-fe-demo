import { Box, Button, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import EiraBack from "../../../assets/images/svg/EiraBack.svg";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate, useParams } from "react-router-dom";
import SafeLogo from "../../../components/SafeLogo";
import AmountBreakupCard from "../../../components/AmountBreakupCard";

const InputPayment = () => {

    const { phoneNumber } = useParams();
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();
    const notPhoneScreen = useMediaQuery('(min-width:850px)');

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

    const handleSubmit = () => {
        const isStudentSignedIn = localStorage.getItem("studentLogin") === "true"
        if (isStudentSignedIn) {
            navigate("/pay/create-session");
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
                            name="Suneel Satpal"
                            phone={`+91 ${phoneNumber}`}
                            amount={Number(amount)}
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
                                Enter a valid amount to pay
                            </Typography>
                            <TextField
                                required
                                autoFocus
                                label="Amount to pay"
                                variant="outlined"
                                value={amount}
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
