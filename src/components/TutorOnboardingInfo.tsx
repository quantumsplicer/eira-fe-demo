import React from "react";
import {
    Box,
    Typography,
    Stack,
} from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface TutorOnboardingInfoProps {
    infoMessage: string
}

const TutorOnboardingInfo = ({infoMessage}: TutorOnboardingInfoProps) => {
    return (
        <Box mb={5} p={2} bgcolor={"rgba(251, 203, 168, 0.25)"} borderRadius={5}>
            <Stack direction={"row"} alignItems={"center"}>
                <InfoOutlinedIcon sx={{ color: "#DCA566" }} />
                <Stack ml={2} color={"#CE7C4E"}>
                    <Typography sx={{ fontSize: 13 }}>
                        Looks like the tutor is not onboarded!
                    </Typography>
                    <Typography sx={{ fontSize: 13 }}>
                        {infoMessage}
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

export default TutorOnboardingInfo;