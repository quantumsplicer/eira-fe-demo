import React, { useEffect, useState } from "react";
import {
    TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface BankAccountDetailsProps {
    isAccountVerifying: boolean;
    onSubmit: () => void;
}

const BankAccountDetails = ({isAccountVerifying, onSubmit}: BankAccountDetailsProps) => {

    const [accountNumber, setAccountNumber] = useState<string>('');
    const [verifyAccountNumber, setVerifyAccountNumber] = useState<string>('');
    const [ifsc, setIfsc] = useState<string>('');
    // const [isAccountNumberInvalid, setIsAccountNumberInvalid] = useState<boolean>(false);
    // const [isVerifyAccountNumberSame, setIsVerifyAccountNumberSame] = useState<boolean>(true);
    // const [isIfscInvalid, setIsIfscInvalid] = useState<boolean>(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleAccountNumberInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setAccountNumber: (accNum: string) => void) => {
        const invalidRegex = /[^0-9]/
        const inputValue = event.target.value;
        if (inputValue === '' || !invalidRegex.test(inputValue)) {
            const inputAccNumber: string = inputValue.slice(0, 18);
            setAccountNumber(inputAccNumber);
        }
    }

    const handleIfscInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const invalidRegex = /[^A-Za-z0-9]/
        if (invalidRegex.test(event.target.value[event.target.value.length - 1]))
            return;
        const inputIfsc: string = event.target.value.slice(0, 11);
        setIfsc(inputIfsc);
    }

    const isAccountNumberValid = (): boolean => {
        const regex = /^\d{9,18}$/;
        // setIsAccountNumberInvalid(!regex.test(accountNumber));
        return regex.test(accountNumber);
    }

    const isIfscValid = (): boolean => {
        const regex = /^[A-Z]{4}[0][A-Z0-9]{6}$/;
        // setIsIfscInvalid(!regex.test(ifsc));
        return regex.test(ifsc);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !isButtonDisabled) {
            handleSubmitClick();
        }
    }

    const handleSubmitClick = () => {
        if (accountNumber && isAccountNumberValid() && accountNumber === verifyAccountNumber && isIfscValid()) {
            onSubmit();
        }
    }

    const checkButtonDisability = () => {
        setIsButtonDisabled(true);
        if (accountNumber.length >= 9 && accountNumber.length <= 18 && verifyAccountNumber === accountNumber && ifsc.length === 11 && isIfscValid()) {
            setIsButtonDisabled(false);
        }
    }

    // useEffect(() => {
    //     verifyAccountNumber === "" || accountNumber === verifyAccountNumber ? setIsVerifyAccountNumberSame(true) : setIsVerifyAccountNumberSame(false)
    // }, [verifyAccountNumber, accountNumber])

    useEffect(() => {
        checkButtonDisability();
    }, [accountNumber, verifyAccountNumber, ifsc])

    return (
        <>
            <TextField
                autoFocus
                required
                value={accountNumber}
                disabled={isAccountVerifying}
                onChange={e => handleAccountNumberInput(e, setAccountNumber)}
                onKeyDown={event => handleKeyDown(event)}
                // error={isAccountNumberInvalid}
                // helperText={isAccountNumberInvalid && "Enter valid Account Number"}
                fullWidth
                label="Account Number"
                variant="outlined"
                sx={{
                    mb: 2,
                    "&:MuiInputBase-input": {
                        fontSize: 12,
                    },
                }}
            />
            <TextField
                required
                value={verifyAccountNumber}
                disabled={isAccountVerifying}
                onChange={e => handleAccountNumberInput(e, setVerifyAccountNumber)}
                onKeyDown={event => handleKeyDown(event)}
                error={verifyAccountNumber !== "" && accountNumber !== verifyAccountNumber}
                helperText={verifyAccountNumber !== "" && accountNumber !== verifyAccountNumber && "Account numbers do not match"}
                // color="success"
                type="password"
                fullWidth
                label="Re-enter Account Number"
                variant="outlined"
                sx={{
                    mb: 2,
                    "&:MuiInputBase-input": {
                        fontSize: 12,
                    },
                }}
            />
            <TextField
                required
                value={ifsc}
                disabled={isAccountVerifying}
                onChange={e => handleIfscInput(e)}
                onKeyDown={event => handleKeyDown(event)}
                error={ifsc.length === 11 && !isIfscValid()}
                helperText={ifsc.length === 11 && !isIfscValid() && "Enter valid IFSC"}
                fullWidth
                label="IFSC"
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
                loading={isAccountVerifying}
                loadingPosition="end"
                // endIcon={null}
                variant="contained"
                color="primary"
                sx={{ padding: 1.5, borderRadius: 2 }}
            >
                {isAccountVerifying ? "Verifying" : "Verify Account"}
            </LoadingButton>
        </>
    )
}

export default BankAccountDetails;