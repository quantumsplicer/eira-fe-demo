import React from "react";
import {
    Dialog,
    DialogContent,
    Box,
    IconButton,
    Typography,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface SuccessDialogProps {
    open: boolean;
    onClose: () => void;
    type: string;
    headingMessage: string;
    subHeadingMessage: string;
    preventDialogClose: boolean;
    CustomDialogButton: React.FC;
}

const StatusDialog = ({ open, onClose, type, headingMessage, subHeadingMessage, preventDialogClose, CustomDialogButton }: SuccessDialogProps) => {

    const handleDialogClose = (event: React.MouseEvent<HTMLDivElement> ,reason: string) => {
        if (preventDialogClose && reason === 'backdropClick') {
            return;
        }
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: 500,
                    maxWidth: "50vw",
                    height: 400,
                },
                p: 1,
            }}
        >
            <DialogContent dividers>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{ height: "100%", pb: 10, pt: 10 }}
                >
                    <Typography
                        fontSize={22}
                        fontWeight="bold"
                    >
                        {headingMessage}
                    </Typography>
                    {
                        !preventDialogClose && 
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: -5,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    <Typography>
                        {subHeadingMessage}
                    </Typography>
                    <Box>
                        {
                            type === "success" ?
                                <CheckCircleOutlineIcon
                                    sx={{ mt: 5, fontSize: 90, color: "green" }} /> :
                                <CancelOutlinedIcon
                                    sx={{ mt: 5, fontSize: 90, color: "red"}} />
                        }
                        
                    </Box>
                    <CustomDialogButton />
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default StatusDialog;