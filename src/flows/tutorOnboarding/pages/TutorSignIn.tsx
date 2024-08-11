import React, { useEffect, useState } from "react";

import { 
    Stack,
    Box,
    Typography,
    TextField,
    Button
} from "@mui/material"
import { EiraBack2 } from "../../../components/EiraBack2"
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import OTPDialog from "../../payTutionFees/dialogs/OTPDialog";

const TutorSignIn : React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [isPhoneNumberInvalid, setIsPhoneNumberInvalid] = useState<boolean>(false)
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState<boolean>(true)
    const [isOtpDialogOpen, setIsOtpDialogOpen] = useState<boolean>(false);

    const verifyPhoneNumber = () => {
        const regex = /^[6-9]\d{9}$/;
        if(regex.test(phoneNumber)) {
            setIsPhoneNumberInvalid(false);
            setIsOtpDialogOpen(true);
        } else {
            setIsPhoneNumberInvalid(true);
        }
    }

    const handlePhoneNumberInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const invalidRegex = /[^0-9]/
        const inputValue = e.target.value;
        if(inputValue === '' || !invalidRegex.test(inputValue)) {
            let inputPhoneNumber : string = inputValue.slice(0,10);
            setPhoneNumber(inputPhoneNumber);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            verifyPhoneNumber();
        }
    }

    const handleOtpDialogClose = () => {
        setIsOtpDialogOpen(false);
    }

    useEffect(() => {
        if(phoneNumber.length === 10) {
            setIsLoginButtonDisabled(false);
        } else {
            setIsLoginButtonDisabled(true);
        }
    }, [phoneNumber])

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
                        Login as a tutor
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontSize: 14, mb: 4, textAlign: "center" }}
                    >
                        Enter your phone
                    </Typography>
                    <TextField
                        value={phoneNumber}
                        onChange={e => handlePhoneNumberInput(e)}
                        onKeyDown={event => handleKeyDown(event)}
                        error={isPhoneNumberInvalid}
                        helperText={isPhoneNumberInvalid && "Enter valid phone number"}
                        fullWidth
                        label="Phone number"
                        variant="outlined"
                        sx={{
                            mb: 2,
                            "&:MuiInputBase-input": {
                                fontSize: 12,
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <Stack direction={"row"} spacing={1} sx={{ mr: 1 }}>
                                    <img
                                        src="https://flagcdn.com/w320/in.png"
                                        alt="India Flag"
                                        style={{ width: 24, height: 18, marginRight: 8 }}
                                    />
                                    <Typography fontSize={14}>+91</Typography>
                                </Stack>
                            ),
                        }}
                    />
                    <Button
                        disabled={isLoginButtonDisabled}
                        onClick={verifyPhoneNumber}
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ padding: 1.5, borderRadius: 2 }}
                    >
                        Next
                    </Button>
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
            <OTPDialog
                open={isOtpDialogOpen}
                onClose={handleOtpDialogClose}
                navigateTo="/tutor/signup"
                phoneNumber={phoneNumber}
            />
            <Box sx={{ width: "50%", p: 2, height: "100vh" }}>
                <EiraBack2 />
            </Box>
        </Stack>

    )
}

export default TutorSignIn;