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

interface SuccessDialogProps {
    open: boolean;
    onClose: () => void;
    successMessage: string;
    preventDialogClose: boolean;
    CustomDialogButton: React.FC;
}

const SuccessDialog = ({ open, onClose, successMessage, preventDialogClose, CustomDialogButton }: SuccessDialogProps) => {

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
                        Congratulations!!
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
                        {successMessage}
                    </Typography>
                    <Box>
                        <CheckCircleOutlineIcon sx={{ fontSize: 90, marginTop: "30px", color: "#19B904" }} />
                    </Box>
                    <CustomDialogButton />
                </Stack>
            </DialogContent>
        </Dialog>
    );
}

export default SuccessDialog;