import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import PersonalDetails from "../../../components/PersonalDetails";
import PhoneNumberInputField from "../../../components/PhoneNumberInputField";
import NoteBox from "../../../components/NoteBox";
import OTPInput from "../../../components/OTPInput";

const StudentSignIn = () => {

    const [activeFlow, setActiveFlow] = useState<string | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const notes = [
        "Please make sure that you have the bank account details of the payee accessible.",
        "Please make sure that the person receiving money is onbaorded on Eiraor you have the necessary details to onboard them."
    ]

    const isPhoneNumberValid = (): boolean => {
        const regex = /^[6-9]\d{9}$/;
        return regex.test(phoneNumber);
    }

    const handleSubmit = () => {
        if (isPhoneNumberValid()) {
            setIsDialogOpen(true)
        }
    }

    useEffect(() => {
        const flow = localStorage.getItem("activeFlow");
        setActiveFlow(flow)
    }, [])

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
                mr={-10}
            >
                {
                    ( activeFlow === "staticFlow" || activeFlow === "dynamicFlow" ) &&
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
                    width="30vw"
                    minHeight="90vh"
                    bgcolor={"#fff"}
                    border={"1px solid #ccc"}
                    padding={5}
                    borderRadius={5}
                    boxShadow={"2px -2px 14px 2px #00000021"}
                    justifySelf={"flex-end"}
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
                            mt={5}
                        >
                            {
                                !isDialogOpen ?
                                    <>
                                        <Typography
                                            fontWeight={"bold"}
                                            variant="h6"
                                        >
                                            Login as a student
                                        </Typography>
                                        <Typography
                                            mt={1}
                                            mb={5}
                                        >
                                            Enter your phone number
                                        </Typography>
                                        <NoteBox
                                            notes={notes}
                                        />
                                        <PhoneNumberInputField
                                            label="Phone number"
                                            phone={phoneNumber}
                                            setPhoneNumber={setPhoneNumber}
                                            onSubmit={handleSubmit}
                                            autoFocus={true}
                                        />
                                        <Button
                                            disabled={phoneNumber.length !== 10 || !isPhoneNumberValid()}
                                            onClick={handleSubmit}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            sx={{ padding: 1.5, borderRadius: 20, marginTop: 5, height: 45 }}
                                        >
                                            Verify
                                        </Button>
                                    </> :
                                    <OTPInput
                                        navigateTo="/student/signup"
                                        phoneNumber={phoneNumber}
                                    />
                            }
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default StudentSignIn;
