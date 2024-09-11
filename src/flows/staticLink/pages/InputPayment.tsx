import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import EiraBack from "../../../assets/images/svg/EiraBack.svg";
import Secure from "../../../assets/images/svg/Secure.svg";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate, useParams } from "react-router-dom";

const InputPayment = () => {


    const {phoneNumber} = useParams();
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const invalidRegex = /[^0-9]/
        const inputValue = event.target.value;
        if (inputValue === '' || !invalidRegex.test(inputValue)) {
            setAmount(inputValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        localStorage.setItem("activeFlow", "staticFlow");
        const isStudentSignedIn = localStorage.getItem("studentLogin") === "true"
        if(isStudentSignedIn) {
            navigate("/pay/create-session");
        } else {
            navigate("/student/signIn");
        }
    };

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
                justifyContent={"center"}
            >
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    alignSelf={"flex-end"}
                >
                    <img
                        src={Secure}
                        style={{
                            height: "50px",
                            width: "50px"
                        }}
                    />
                    <Typography
                        color={"white"}
                        fontWeight={"bold"}
                    >
                        100% safe
                    </Typography>
                </Stack>
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
                <Box
                    width="30vw"
                    minHeight="90vh"
                    bgcolor={"#fff"}
                    border={"1px solid #ccc"}
                    padding={5}
                    borderRadius={5}
                    boxShadow={"2px -2px 14px 2px #00000021"}
                >
                    <Stack>
                        <img
                            src={EiraLogo}
                            style={{
                                alignSelf: "flex-start",
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
                                fullWidth
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
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ padding: 1.5, borderRadius: 2, mt: 5 }}
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
