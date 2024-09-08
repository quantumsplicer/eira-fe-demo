import React, { useEffect, useState } from "react";
import {
    Typography
} from "@mui/material";
import { useLocation } from 'react-router-dom';
import StatusDialog from "../../../dialogs/StatusDialog";

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

    const ScheduleClassButton: React.FC = () => {
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
            <StatusDialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
                type="success"
                headingMessage="Congratulations!!"
                subHeadingMessage="You are ready to accept payments on Eira!"
                preventDialogClose={false}
                CustomDialogButton={ScheduleClassButton}
            />
        </div>
    )
}

export default TutorDashboard;