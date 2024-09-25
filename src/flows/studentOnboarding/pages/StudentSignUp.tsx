import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import NoteBox from "../../../components/NoteBox";
import PersonalDetails from "../../../components/PersonalDetails";
import { useNavigate } from "react-router-dom";

const StudentSignUp = () => {

    const [activeFlow, setActiveFlow] = useState<string | null>(null);
    const [isPanUnverified, setIsPanUnverified] = useState<boolean>(false);
    const [isPanVerifying, setIsPanVerifying] = useState<boolean>(false);
    const navigate = useNavigate();

    const noteBoxHeading = "Note:"
    const notes = [
        "Please enter your name exactly as per PAN.",
        "Please enter the PAN linked to your mobile number.",
        "Please make sure you are transferring to a registered tutor or have their account details to onboard them."
    ]

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
                    (activeFlow === "staticFlow" || activeFlow === "dynamicFlow") &&
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
                            mt={3}
                        >
                            <Typography
                                variant="h5"
                                sx={{ fontSize: 20, mb: 2, fontWeight: "bold" }}
                            >
                                Personal details
                            </Typography>
                            <NoteBox
                                heading={noteBoxHeading}
                                notes={notes}
                            />
                            <PersonalDetails
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default StudentSignUp;
