import React, { useState } from "react";

import { 
    Stack,
    Box,
    Typography,
    Button
} from "@mui/material"
import { EiraBack2 } from "../../../components/EiraBack2"
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import OTPDialog from "../../../dialogs/OTPDialog";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";

const TutorSignIn : React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    // const [isPhoneNumberInvalid, setIsPhoneNumberInvalid] = useState<boolean>(false)
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const isPhoneNumberValid = () : boolean => {
        const regex = /^[6-9]\d{9}$/;
        return regex.test(phoneNumber);
    }

    const handleSubmit = () => {
        if(isPhoneNumberValid()) {
            setIsDialogOpen(true)
        }
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
                        Login as a tutor
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontSize: 14, mb: 4, textAlign: "center" }}
                    >
                        Enter your phone
                    </Typography>
                    <PhoneNumberInputField
                        autoFocus={true}
                        label={"Phone number"}
                        phone={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        onSubmit={handleSubmit}
                    />
                    <Button
                        disabled={phoneNumber.length !== 10 || !isPhoneNumberValid()}
                        onClick={handleSubmit}
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
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
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