import React, { useEffect, useState } from "react";
import {
    Typography
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import SuccessfulOnboardingDialog from "../dialogs/SuccessfulOnboardingDialog";
import SuccessDialog from "../dialogs/SuccessDialog";

const TutorDashboard: React.FC = () => {

    const location = useLocation();
    const previousUrl = location.state?.previousUrl;
    const [showDialog, setShowDialog] = useState<boolean>(false);

    useEffect(() => {
        const showAlert = localStorage.getItem('showDialog') === 'true';

        if (showAlert && previousUrl?.endsWith('/tutor/aadhar-verification')) {
            setShowDialog(true);
            localStorage.setItem('showDialog', 'showDialog');
        }
    }, [previousUrl])

    const CustomDialogButton: React.FC = () => {
        return (
            <>
                <Typography
                    onClick={() => setShowDialog(false)}
                    sx={{
                        borderBottom: "1px solid #757575",
                        cursor: "pointer",
                        color: theme => theme.palette.grey[600]
                    }}
                >
                    Schedule a class now
                </Typography>
            </>
        )
    }

    return (
        <div>
            <SuccessDialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                successMessage="You are ready to accept payments on Eira!"
                preventDialogClose={false}
                CustomDialogButton={CustomDialogButton}
            />
            {/* <SuccessfulOnboardingDialog open={showDialog} onClose={() => setShowDialog(false)} /> */}
        </div>
    )
}

export default TutorDashboard;