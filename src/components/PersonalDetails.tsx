import React, { useEffect, useState } from "react";
import {
    TextField
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface DetailsProps {
    isPanUnverified: boolean;
    isVerifying: boolean;
    onSubmit: () => void;
}

const PersonalDetails = ({ isPanUnverified, isVerifying, onSubmit }: DetailsProps) => {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('');
    const [pan, setPan] = useState<string>('')
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleNameInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setName: (value: string) => void) => {
        const invalidRegex = /[^A-Za-z]/;
        if (invalidRegex.test(event.target.value[event.target.value.length - 1]))
            return;
        setName(event.target.value);
    }

    const handlePanInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const invalidRegex = /[^A-Za-z0-9]/
        if (invalidRegex.test(event.target.value[event.target.value.length - 1]))
            return;
        const inputPan: string = event.target.value.slice(0, 10);
        setPan(inputPan);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !isButtonDisabled) {
            handleSubmitClick();
        }
    }

    const handleSubmitClick = () => {
        if (firstName && lastName && isPanValid()) {
            onSubmit();
        }
    }

    const isPanValid = (): boolean => {
        const regex = /^[A-Z]{3}P[A-Z][0-9]{4}[A-Z]{1}$/;
        return regex.test(pan);
    }

    useEffect(() => {
        setIsButtonDisabled(true);
        if (firstName && lastName && pan.length === 10 && isPanValid()) {
            setIsButtonDisabled(false);
        }
    }, [firstName, lastName, pan])

    return (
        <>
            <TextField
                autoFocus
                disabled={isVerifying}
                required
                value={firstName}
                onChange={e => handleNameInput(e, setFirstName)}
                onKeyDown={event => handleKeyDown(event)}
                fullWidth
                label="First Name (as per PAN)"
                variant="outlined"
                InputLabelProps={{
                    shrink: false,
                    style: { top: -40, left: -13, fontSize: 12 },
                }}
                sx={{
                    mt: 2,
                    mb: 5,
                    "& .MuiInputBase-root": {
                        height: 45,
                    },
                    "& .MuiOutlinedInput-input": {
                        padding: "12px 14px",
                        fontSize: 14,
                    }
                }}
            />
            <TextField
                disabled={isVerifying}
                required
                value={lastName}
                onChange={e => handleNameInput(e, setLastName)}
                onKeyDown={event => handleKeyDown(event)}
                fullWidth
                label="Last Name (as per PAN)"
                variant="outlined"
                InputLabelProps={{
                    shrink: false,
                    style: { top: -40, left: -13, fontSize: 12 },
                }}
                sx={{
                    mb: 5,
                    "& .MuiInputBase-root": {
                        height: 45,
                    },
                    "& .MuiOutlinedInput-input": {
                        padding: "12px 14px",
                        fontSize: 14,
                    }
                }}
            />
            <TextField
                disabled={isVerifying}
                required
                value={pan}
                onChange={e => handlePanInput(e)}
                onKeyDown={event => handleKeyDown(event)}
                error={pan.length === 10 && !isPanValid() || (!isVerifying && isPanUnverified)}
                helperText={
                    pan.length === 10 && !isPanValid() ?
                        "Enter valid PAN" :
                        !isVerifying && isPanUnverified && "PAN number and given name do not match. Please check again."
                }
                fullWidth
                label="PAN"
                variant="outlined"
                InputLabelProps={{
                    shrink: false,
                    style: { top: -40, left: -13, fontSize: 12 },
                }}
                sx={{
                    mb: 2,
                    "& .MuiInputBase-root": {
                        height: 45,
                    },
                    "& .MuiOutlinedInput-input": {
                        padding: "12px 14px",
                        fontSize: 14,
                    }
                }}
            />
            <LoadingButton
                disabled={isButtonDisabled}
                onClick={handleSubmitClick}
                fullWidth
                loading={isVerifying}
                loadingPosition="end"
                // endIcon={null}
                variant="contained"
                color="primary"
                sx={{ padding: 1.5, borderRadius: 20, marginTop: 4, height: 45 }}
            >
                {isVerifying ? "Verifying" : "Proceed"}
            </LoadingButton>
        </>
    )
}

export default PersonalDetails;