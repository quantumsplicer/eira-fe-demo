import React, { ReactElement, useEffect, useRef, useState } from "react";

import {
    Stack,
    Box,
    Typography,
    TextField,
    Button
} from "@mui/material"
import { EiraBack2 } from "../../../components/EiraBack2"
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import SuccessDialog from "../dialogs/SuccessDialog";

interface step1Fields {
    firstName: string;
    lastName: string;
    pan: string;
}

interface step2Fields {
    accountNumber: string;
    verifyAccountNumber: string;
    ifsc: string;
}

const TutorSignUp: React.FC = () => {

    const navigate = useNavigate();
    const [signUpStep, setSignUpStep] = useState<number>(1);
    const [signUpRenderFields, setSignUpRenderFields] = useState<ReactElement>(<></>);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(true);
    const [isPanInvalid, setIsPanInvalid] = useState<boolean>(false);
    const [isAccountNumberInvalid, setIsAccountNumberInvalid] = useState<boolean>(false);
    const [isVerifyAccountNumberSame, setIsVerifyAccountNumberSame] = useState<boolean>(true);
    const [isIfscInvalid, setIsIfscInvalid] = useState<boolean>(false);
    const [isAccountVerifying, setIsAccountVerifying] = useState<boolean>(false);
    const [showAccountVerificationStatus, setShowAccountVerificationStatus] = useState<boolean>(false);
    const [isAccountVerified, setIsAccountVerified] = useState<boolean>(false);
    const firstNameTextFieldRef = useRef<HTMLInputElement>(null);
    const accountNumberTextFieldRef = useRef<HTMLInputElement>(null);
    const [isPanUnverified, setIsPanUnverified] = useState<boolean>(false);

    const [step1Inputs, setStep1Inputs] = useState<step1Fields>({
        firstName: '',
        lastName: '',
        pan: ''
    });
    const [step2Inputs, setStep2Inputs] = useState<step2Fields>({
        accountNumber: '',
        verifyAccountNumber: '',
        ifsc: ''
    });

    const handleFirstNameInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const invalidRegex = /[^A-Za-z]/
        if (invalidRegex.test(event.target.value[event.target.value.length - 1]))
            return;
        setStep1Inputs(prevState => ({
            ...prevState,
            firstName: event.target.value
        }));
    }

    const handleLastNameInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const invalidRegex = /[^A-Za-z]/
        if (invalidRegex.test(event.target.value[event.target.value.length - 1]))
            return;
        setStep1Inputs(prevState => ({
            ...prevState,
            lastName: event.target.value
        }));
    }

    const handlePanInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const invalidRegex = /[^A-Za-z0-9]/
        if (invalidRegex.test(event.target.value[event.target.value.length - 1]))
            return;
        const inputPan: string = event.target.value.slice(0, 10);
        setStep1Inputs(prevState => ({
            ...prevState,
            pan: inputPan
        }));
    }

    const handleAccountNumberInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const invalidRegex = /[^0-9]/
        const inputValue = event.target.value;
        if (inputValue === '' || !invalidRegex.test(inputValue)) {
            const inputAccNumber: string = inputValue.slice(0, 18);
            setStep2Inputs(prevState => ({
                ...prevState,
                accountNumber: inputAccNumber
            }));
        }
    }

    const handleVerifyAccountNumberInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const invalidRegex = /[^0-9]/
        const inputValue = event.target.value;
        if (inputValue === '' || !invalidRegex.test(inputValue)) {
            const inputAccNumber: string = inputValue.slice(0, 18);
            setStep2Inputs(prevState => ({
                ...prevState,
                verifyAccountNumber: inputAccNumber
            }));
        }
    }

    const handleIfscInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const invalidRegex = /[^A-Za-z0-9]/
        if (invalidRegex.test(event.target.value[event.target.value.length - 1]))
            return;
        const inputIfsc: string = event.target.value.slice(0, 11);
        setStep2Inputs(prevState => ({
            ...prevState,
            ifsc: inputIfsc
        }));
    }

    const isPanValid = (): boolean => {
        const regex = /^[A-Z]{3}P[A-Z][0-9]{4}[A-Z]{1}$/;
        setIsPanInvalid(!regex.test(step1Inputs.pan));
        return regex.test(step1Inputs.pan);
    }

    const isAccountNumberValid = (): boolean => {
        const regex = /^\d{9,18}$/;
        setIsAccountNumberInvalid(!regex.test(step2Inputs.accountNumber));
        return regex.test(step2Inputs.accountNumber);
    }

    const isIfscValid = (): boolean => {
        const regex = /^[A-Z]{4}[0][A-Z0-9]{6}$/;
        setIsIfscInvalid(!regex.test(step2Inputs.ifsc));
        return regex.test(step2Inputs.ifsc);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleSubmitClick();
        }
    }

    const verifyAccount = () => {
        setShowAccountVerificationStatus(false);
        setIsAccountVerifying(true);
        setTimeout(() => {
            setIsAccountVerifying(false);
            setShowAccountVerificationStatus(true);
            setIsAccountVerified(true);
            // setSignUpStep(3);
            // navigate('/tutor/aadhar-verification');
        }, 5000);
    }

    const verifyPan = () => {
        setIsPanUnverified(false);
        return true;
    }

    const handleSubmitClick = () => {
        if (signUpStep === 1) {
            if (step1Inputs.firstName && step1Inputs.lastName && isPanValid()) {
                if (!verifyPan()) {
                    return;
                }
                setSignUpStep(2);
            }
        } else if (signUpStep === 2) {
            if (isAccountNumberValid() && step2Inputs.accountNumber === step2Inputs.verifyAccountNumber && isIfscValid()) {
                verifyAccount();
            }
        }
    }

    const checkButtonDisability = () => {
        setIsSubmitButtonDisabled(true);
        if (signUpStep === 1) {
            if (step1Inputs.firstName && step1Inputs.lastName && step1Inputs.pan.length === 10) {
                setIsSubmitButtonDisabled(false);
            }
        } else if (signUpStep === 2) {
            if (step2Inputs.accountNumber.length >= 9 && step2Inputs.accountNumber.length <= 18 && step2Inputs.verifyAccountNumber === step2Inputs.accountNumber && step2Inputs.ifsc.length === 11) {
                setIsSubmitButtonDisabled(false);
            }
        }
    }

    useEffect(() => {
        step2Inputs.verifyAccountNumber === "" || step2Inputs.accountNumber === step2Inputs.verifyAccountNumber ? setIsVerifyAccountNumberSame(true) : setIsVerifyAccountNumberSame(false)
    }, [step2Inputs.verifyAccountNumber, step2Inputs.accountNumber])

    useEffect(() => {
        checkButtonDisability();

        let renderFields = <></>
        switch (signUpStep) {
            case 1:
                renderFields = (
                    <>
                        <Box
                            sx={{
                                mb: 4,
                                backgroundColor: "#f9f9f9",
                                padding: 3,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="body2" fontSize={12}>
                                Note:
                            </Typography>
                            <ul style={{ marginLeft: "-15px" }}>
                                <li>
                                    <Typography variant="body2" fontSize={12}>
                                        Input First Name and Last Name as given on PAN.
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body2" fontSize={12}>
                                        Make sure you give a valid PAN.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <TextField
                            required
                            value={step1Inputs.firstName}
                            onChange={e => handleFirstNameInput(e)}
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
                            ref={firstNameTextFieldRef}
                        />
                        <TextField
                            required
                            value={step1Inputs.lastName}
                            onChange={e => handleLastNameInput(e)}
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
                            required
                            value={step1Inputs.pan}
                            onChange={e => handlePanInput(e)}
                            onKeyDown={event => handleKeyDown(event)}
                            error={isPanInvalid || isPanUnverified}
                            helperText={
                                isPanInvalid ?
                                    "Enter valid PAN" :
                                    isPanUnverified && "PAN number does not match the given name"
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
                        <Button
                            disabled={isSubmitButtonDisabled}
                            onClick={handleSubmitClick}
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ padding: 1.5, borderRadius: 2 }}
                        >
                            Proceed
                        </Button>
                    </>
                )
                break;
            case 2:
                renderFields = (
                    <>
                        <Box
                            sx={{
                                mb: 4,
                                backgroundColor: "#f9f9f9",
                                padding: 3,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="body2" fontSize={12}>
                                Note:
                            </Typography>
                            <ul style={{ marginLeft: "-15px" }}>
                                <li>
                                    <Typography variant="body2" fontSize={12}>
                                        The account holder should have the same name as provided before.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>
                        <TextField
                            required
                            value={step2Inputs.accountNumber}
                            onChange={e => handleAccountNumberInput(e)}
                            onKeyDown={event => handleKeyDown(event)}
                            error={isAccountNumberInvalid}
                            helperText={isAccountNumberInvalid && "Enter valid Account Number"}
                            fullWidth
                            label="Account Number"
                            variant="outlined"
                            sx={{
                                mb: 2,
                                "&:MuiInputBase-input": {
                                    fontSize: 12,
                                },
                            }}
                            ref={accountNumberTextFieldRef}
                        />
                        <TextField
                            required
                            value={step2Inputs.verifyAccountNumber}
                            onChange={e => handleVerifyAccountNumberInput(e)}
                            onKeyDown={event => handleKeyDown(event)}
                            error={!isVerifyAccountNumberSame}
                            helperText={!isVerifyAccountNumberSame && "Account numbers do not match"}
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
                            value={step2Inputs.ifsc}
                            onChange={e => handleIfscInput(e)}
                            onKeyDown={event => handleKeyDown(event)}
                            error={isIfscInvalid}
                            helperText={isIfscInvalid && "Enter valid IFSC"}
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
                            disabled={isSubmitButtonDisabled}
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
                        {
                            showAccountVerificationStatus && !isAccountVerified &&
                            <Typography mt={3} color="#d32f2f">
                                Account not verified
                            </Typography>
                        }
                    </>
                )
                break;
            default:
                renderFields = <></>
        }
        setSignUpRenderFields(renderFields);
    }, [
        signUpStep,
        step1Inputs,
        step2Inputs,
        isPanInvalid,
        isAccountNumberInvalid,
        isIfscInvalid,
        firstNameTextFieldRef,
        accountNumberTextFieldRef,
        isSubmitButtonDisabled,
        isAccountVerifying,
        isPanUnverified,
        isVerifyAccountNumberSame,
        showAccountVerificationStatus,
        isAccountVerified
    ]
    )

    useEffect(() => {
        const timer = setTimeout(() => {
            if (signUpStep === 1) {
                const inputElement = firstNameTextFieldRef?.current?.querySelector("input");
                if (inputElement) {
                    inputElement.focus();
                }
            } else if (signUpStep === 2) {
                const inputElement = accountNumberTextFieldRef?.current?.querySelector("input");
                if (inputElement) {
                    inputElement.focus();
                }
            }
        }, 10); // Delay of 100ms

        return () => clearTimeout(timer);
    }, [signUpStep])

    const CustomDialogButton: React.FC = () => {
        return (
            <>
                <Button
                    onClick={() => navigate('/tutor/aadhar-verification')}
                    variant="contained"
                    color="primary"
                    sx={{ padding: 1.5, borderRadius: 2, width: "75%" }}
                >
                    Verify Aadhaar
                </Button>
            </>
        )
    }

    return (
        <Stack
            direction={"row"}
            sx={{ justifyContent: "center", alignItems: "center" }}
        >
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
                    sx={{ width: "80%", px: 18 }}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontSize: 20, fontWeight: "bold" }}
                    >
                        Sign Up
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontSize: 14, mb: 4, textAlign: "center" }}
                    >
                        Step {signUpStep} of 3
                    </Typography>
                    {signUpRenderFields}
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
            <SuccessDialog
                open={showAccountVerificationStatus && isAccountVerified}
                onClose={() => setShowAccountVerificationStatus(false)}
                successMessage={"Account successfully verified"}
                preventDialogClose={true}
                CustomDialogButton={CustomDialogButton}
            />
            <Box sx={{ width: "50%", p: 2, height: "100vh" }}>
                <EiraBack2 />
            </Box>
        </Stack>
    )
}

export default TutorSignUp;