import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Stack,
    Alert,
    useMediaQuery,
    Button
} from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import { useNavigate } from "react-router-dom";
import PersonalDetails from "../../../components/PersonalDetails";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import SafeLogo from "../../../components/SafeLogo";
import { useDispatch } from "react-redux";
import { setTutorPhoneNumber } from "../../../stores/slices";
import { useLazyGetUserDetailsByPhoneQuery } from "../../../APIs/definitions/user";
import StatusDialog from "../../../dialogs/StatusDialog";
import StatusDrawer from "../../../components/StatusDrawer";

const InputTutorDetails: React.FC = () => {
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const notPhoneScreen = useMediaQuery('(min-width:850px)');
    const navigate = useNavigate();

    const activePaymentTutorName = localStorage.getItem("activePaymentTutorName");
    const activePaymentTutorId = localStorage.getItem("activePaymentTutorId");
    const activePaymentAmount = localStorage.getItem("activePaymentAmount");

    const [
        getTutorDetials
      ] = useLazyGetUserDetailsByPhoneQuery();

    const goToDashboardButton = () => {
        return (
            <Button
            variant="contained"
            color="primary"
            sx={{
                padding: 1.5,
                borderRadius: 20,
                height: 45,
                mt: 5,
                width: "100%",
                minWidth: "320px",
                maxWidth: "400px",
            }}
            onClick={() => navigate("/student/dashboard")}
            >
            Go to Dashboard
            </Button>
        )
    }

    useEffect(() => {
        const checkTutorOnboarding = async (tutorPhone: string) => {
            await getTutorDetials(tutorPhone)
                .unwrap()
                .then(res => {
                    const tutor = res.length && res[0];
                    const isTutorOnboarded = !!(tutor && tutor?.first_name && tutor?.last_name && tutor?.pan);
                    if (isTutorOnboarded) {
                        navigate("/pay/review");
                    }
                })
        }

        const activePaymentTutorId = localStorage.getItem("activePaymentTutorId");
        if (!activePaymentTutorId) {
            navigate("/pay/payment-details");
        } else {
            checkTutorOnboarding(activePaymentTutorId);
        }
    }, [])

    return (
        <Box
            pt={5}
            pb={5}
            sx={{
                backgroundImage: notPhoneScreen ? `url(${EiraBack})` : '',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                width: '100vw',
            }}
        >
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                {
                    notPhoneScreen &&
                    <Box
                        alignSelf={"flex-end"}
                    >
                        <SafeLogo />
                    </Box>
                }
                {
                    notPhoneScreen &&
                    <Box
                        width={"55%"}
                        height={"30%"}
                        bgcolor={"#fff"}
                        zIndex={10}
                        p={5}
                        sx={{
                            borderRadius: "20px 0 0 20px"
                        }}
                    >
                        <PaymentBreakupInfo
                            name={activePaymentTutorName ?? ""}
                            phone={activePaymentTutorId ? `+91 ${activePaymentTutorId}` : ""}
                            amount={activePaymentAmount ? Number(activePaymentAmount) : 0}
                        />
                    </Box>
                }
                <Box
                    width={notPhoneScreen ? "430px" : "100vw"}
                    minHeight={notPhoneScreen ? "90vh" : "100vh"}
                    bgcolor={"#fff"}
                    border={notPhoneScreen ? "1px solid #ccc" : "none"}
                    padding={5}
                    borderRadius={notPhoneScreen ? 5 : 0}
                    boxShadow={notPhoneScreen ? "2px -2px 14px 2px #00000021" : "none"}
                >
                    <Stack
                        direction={"column"}
                    >
                        <img
                            src={EiraLogo}
                            style={{
                                alignSelf: notPhoneScreen ? "flex-start" : "center",
                                width: 80,
                            }}
                        />
                        <Stack
                            alignItems={"center"}
                            mt={3}
                        >
                            <Alert
                                variant="filled"
                                severity="info"
                                icon={<InfoOutlinedIcon sx={{ color: '#DCA566', margin: "auto 0px" }} />}
                                sx={{
                                    backgroundColor: "rgba(251, 203, 168, 0.25)",
                                    color: "#CE7C4E",
                                    borderRadius: 5,
                                    marginBottom: 5,
                                    padding: 2
                                }}
                            >
                                <Typography sx={{ fontSize: 11 }}>
                                    Looks like the tutor is not onboarded!
                                </Typography>
                                <Typography sx={{ fontSize: 11 }}>
                                    Onboard them with us now to make the payment
                                </Typography>
                            </Alert>
                            <Typography
                                variant="h5"
                                sx={{ fontSize: 20, fontWeight: "bold" }}
                            >
                                Tutor personal details
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{ fontSize: 14, mb: 4, textAlign: "center" }}
                            >
                                Provide Tutor's personal details for their onboarding
                            </Typography>
                            <PersonalDetails
                                onSuccess={() => setShowMessage(true)}
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
            {showMessage ? 
                (notPhoneScreen ?
                    <StatusDialog 
                        open={showMessage}
                        onClose={() => setShowMessage(false)}
                        type="info"
                        headingMessage=""
                        subHeadingMessage="KYC link is sent to your tutor. Tutor will be able to accept payments after completion of KYC"
                        preventDialogClose={false}
                        CustomDialogButton={goToDashboardButton}
                    /> :
                    <StatusDrawer 
                        open={showMessage}
                        type="info"
                        headingMessage=""
                        subHeadingMessage1="KYC link is sent to your tutor. Tutor will be able to accept payments after completion of KYC"
                        preventDrawerClose={false}
                        CustomDrawerButton={goToDashboardButton}
                    />
                ) : null
            }
        </Box>
    );
}

export default InputTutorDetails;