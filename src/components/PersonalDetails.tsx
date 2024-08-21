import React, { useEffect, useState } from "react";
import {
    TextField
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface DetailsProps {
    isPanUnverified: boolean;
    isVerifying: boolean;
    // pan: string;
    // setPan: (pan: string) => void;
    onSubmit: () => void;
}

const PersonalDetails = ({ isPanUnverified, isVerifying, onSubmit}: DetailsProps) => {

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('');
    const [pan, setPan] = useState<string>('')
    // const [isPanInvalid, setIsPanInvalid] = useState<boolean>(false);
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
        if(firstName && lastName && isPanValid()) {
            onSubmit();
        }
    }

    const isPanValid = (): boolean => {
        const regex = /^[A-Z]{3}P[A-Z][0-9]{4}[A-Z]{1}$/;
        // setIsPanInvalid(!regex.test(pan));
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
            {
                <>
                    <TextField
                        autoFocus
                        disabled={isVerifying}
                        required
                        value={firstName}
                        onChange={e => handleNameInput(e, setFirstName)}
                        onKeyDown={event => handleKeyDown(event)}
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        sx={{
                            mb: 2,
                            "&:MuiInputBase-input": {
                                fontSize: 12,
                            },
                        }}
                    />
                    <TextField
                        disabled={isVerifying}
                        required
                        value={lastName}
                        onChange={e => handleNameInput(e, setLastName)}
                        onKeyDown={event => handleKeyDown(event)}
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        sx={{
                            mb: 2,
                            "&:MuiInputBase-input": {
                                fontSize: 12,
                            },
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
                                !isVerifying && isPanUnverified && "PAN number does not match the given name"
                        }
                        fullWidth
                        label="PAN"
                        variant="outlined"
                        sx={{
                            mb: 2,
                            "&:MuiInputBase-input": {
                                fontSize: 12,
                            },
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
                        sx={{ padding: 1.5, borderRadius: 2 }}
                    >
                        {isVerifying ? "Verifying" : "Verify"}
                    </LoadingButton>
                </>
            }
        </>
    )
}

export default PersonalDetails;