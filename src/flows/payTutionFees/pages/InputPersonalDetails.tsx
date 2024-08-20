import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Typography,
    Stack,
} from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";
import { EiraBack1 } from "../../../components/EiraBack1";
import NoteBox from "../../../components/NoteBox";
import PersonalDetails from "../../../components/PersonalDetails";

const InputPersonalDetails: React.FC = () => {

    // const [pan, setPan] = useState<string>('');
    const [isPanUnverified, setIsPanUnverified] = useState<boolean>(false);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const navigate = useNavigate();

    const noteBoxHeading = "Note:";
    const notes = [
        "Please enter your name exactly as per PAN",
        "Please enter the PAN linked to your mobile number",
        "Please make sure you are transferring to a registered tutor or have their account details to onboard them."
    ]

    const verifyPan = () => {

        setIsVerifying(true);
        // setIsPanUnverified(false);
        setTimeout(() => {
            setIsVerifying(false);
            setIsPanUnverified(false)
            navigate("/pay/payment-details");
        }, 5000);
    }

    return (
        <Stack
            direction="row"
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box sx={{ width: "50%", p: 2, height: "100vh" }}>
                <EiraBack1 />
            </Box>
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
                    sx={{ width: "85%", px: 18 }}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontSize: 20, fontWeight: "bold", mb: 2 }}
                    >
                        Personal Details
                    </Typography>
                    <NoteBox
                        heading={noteBoxHeading}
                        notes={notes}
                    />
                    <PersonalDetails
                        // pan={pan}
                        // setPan={setPan}
                        isPanUnverified={isPanUnverified}
                        isVerifying={isVerifying}
                        onSubmit={verifyPan}
                    />
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
        </Stack>
    )
}

export default InputPersonalDetails;