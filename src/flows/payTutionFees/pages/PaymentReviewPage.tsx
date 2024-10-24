// src/components/PaymentReviewPage.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Alert,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import EiraLogo from "../../../assets/images/png/eira-logo.png";
import PaymentInfo from "../../../components/PaymentInfo";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EiraBack from "../../../assets/images/svg/EiraBack.svg";
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";
import SafeLogo from "../../../components/SafeLogo";
import AmountBreakupCard from "../../../components/AmountBreakupCard";
import { selectAmount } from "../../../stores/slices";
import { useSelector } from "react-redux";
import { load } from "@cashfreepayments/cashfree-js";
import { usePayment } from "../../../hooks/usePayment";
import { RootState } from "../../../stores/configuration";
import { getNextWorkingDay } from "../../../utils/helperFunctions";

const PaymentReviewPage = () => {
  const location = useLocation();
  const [isTutorOnboarded, setIsTutorOnboarded] = useState<boolean>(false);
  const navigate = useNavigate();
  const [routeSource, setRouteSource] = useState<string>("");
  const notPhoneScreen = useMediaQuery("(min-width:850px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const activePaymentAmount = localStorage.getItem("activePaymentAmount");
  const activePaymentTutorId = localStorage.getItem("activePaymentTutorId");
  const activePaymentSessionDate = localStorage.getItem("activePaymentSessionDate");
  const activePaymentSessionTime = localStorage.getItem("activePaymentSessionTime");
  const activePaymentSessionId = localStorage.getItem("activePaymentSessionId");
  const activePaymentTutorName = localStorage.getItem("activePaymentTutorName");
  const activeFlow = localStorage.getItem("activeFlow");
  const paymentSessionId = useSelector((state: RootState) => state.onGoingPayment.paymentSessionId);

  const paymentDetails = {
    "Payee Name": activePaymentTutorName ? activePaymentTutorName : "",
    "Payee Phone": activePaymentTutorId ? `+91 ${activePaymentTutorId}` : "",
    "Session Date": activePaymentSessionDate ? activePaymentSessionDate : "",
    "Session Time": activePaymentSessionTime ? activePaymentSessionTime : ""
  };

  const { doPayment } = usePayment();

  const handleSubmit = () => {
    doPayment(activePaymentSessionId ? activePaymentSessionId : "");
    // navigate("/pay/payment-gateway-payment-flow");
  };

  useEffect(() => {
    if (!activePaymentAmount || !activePaymentTutorId || !activePaymentTutorName) {
      navigate("/pay/payment-details");
    } else if (!activePaymentSessionDate || !activePaymentSessionTime || !activePaymentSessionId) {
      navigate("/pay/create-session");
    }
  }, []);

  return (
    <Box
      pt={7}
      sx={{
        backgroundImage: notPhoneScreen ? `url(${EiraBack})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        {notPhoneScreen && (
          <Box alignSelf={"flex-end"}>
            <SafeLogo />
          </Box>
        )}
        {notPhoneScreen && (
          <Box
            width={"55%"}
            height={"30%"}
            bgcolor={"#fff"}
            zIndex={10}
            p={5}
            sx={{
              borderRadius: "20px 0 0 20px",
            }}
          >
            <PaymentBreakupInfo
              name={activePaymentTutorName ? activePaymentTutorName : ""}
              phone={
                activePaymentTutorId
                  ? `+91 ${activePaymentTutorId}`
                  : "+91 93892 50148"
              }
              amount={Number(activePaymentAmount)}
              settlementDate={getNextWorkingDay()}
              settlementTime="5:00 pm"
            />
          </Box>
        )}
        <Box
          width={notPhoneScreen ? "430px" : "100vw"}
          minHeight={notPhoneScreen ? "90vh" : "100vh"}
          bgcolor={"#fff"}
          border={notPhoneScreen ? "1px solid #ccc" : "none"}
          padding={5}
          borderRadius={notPhoneScreen ? 5 : 0}
          boxShadow={notPhoneScreen ? "2px -2px 14px 2px #00000021" : "none"}
        >
          <Stack>
            <img
              src={EiraLogo}
              style={{
                alignSelf: notPhoneScreen ? "flex-start" : "center",
                width: 80,
              }}
            />
            <Stack alignItems={"center"} mt={isTutorOnboarded ? 22 : 5}>
              {!isTutorOnboarded && (
                <Alert
                  variant="filled"
                  severity="info"
                  icon={
                    <InfoOutlinedIcon
                      sx={{ color: "#DCA566", margin: "auto 0px" }}
                    />
                  }
                  sx={{
                    backgroundColor: "rgba(251, 203, 168, 0.25)",
                    color: "#CE7C4E",
                    borderRadius: 5,
                    marginBottom: 5,
                    padding: 2,
                  }}
                >
                  <Typography sx={{ fontSize: 11 }}>
                    Looks like the tutor is not onboarded!
                  </Typography>
                  <Typography sx={{ fontSize: 11 }}>
                    Ask them to complete KYC now to receive the payment
                  </Typography>
                </Alert>
              )}
              <PaymentInfo
                amount={activePaymentAmount as string}
                name={activePaymentTutorName ? activePaymentTutorName : ""}
                paymentDetails={paymentDetails}
                type="review"
              />
              {!notPhoneScreen && (
                <Stack
                  mt={20}
                  direction={"row"}
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <InfoOutlinedIcon />
                  <Typography ml={1} borderBottom={"1px solid #000"}>
                    Amount breakup
                  </Typography>
                </Stack>
              )}
              {
                <Drawer
                  open={isDrawerOpen}
                  onClose={() => setIsDrawerOpen(false)}
                  sx={{
                    width: "100%",
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                      padding: 5,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      width: "100%",
                      boxSizing: "border-box",
                    },
                  }}
                  anchor="bottom"
                >
                  <Stack alignItems={"center"}>
                    <AmountBreakupCard
                      amount={Number(activePaymentAmount)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        padding: 1.5,
                        borderRadius: 20,
                        mt: 5,
                        width: "100%",
                        minWidth: "320px",
                        maxWidth: "360px",
                      }}
                      onClick={() => {
                        setIsDrawerOpen(false);
                      }}
                    >
                      Ok
                    </Button>
                  </Stack>
                </Drawer>
              }
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
                onClick={handleSubmit}
              >
                Proceed to pay
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default PaymentReviewPage;
