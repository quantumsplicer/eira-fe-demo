// src/components/PaymentReviewPage.tsx
import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, Alert } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import EiraLogo from "../../../assets/images/png/eira-logo.png";
import PaymentInfo from "../../../components/PaymentInfo";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import Secure from '../../../assets/images/svg/Secure.svg'
import PaymentBreakupInfo from "../../../components/PaymentBreakupInfo";

const PaymentReviewPage = () => {

  const {amount, phoneNumber} = useParams()
  const location = useLocation();
  const [isTutorOnboarded, setIsTutorOnboarded] = useState<boolean>(true);
  const navigate = useNavigate();
  const [routeSource, setRouteSource] = useState<string>("");
  const paymentDetails = {
    "Account Number": ["**** **** **** 2150"],
    "Session date & time": ["17:00 - 18:00", "24th Aug, 2024"]
  }

  const handleSubmit = () => {
    console.log(routeSource)
    if(routeSource === "Dynamic Flow") {
      const isStudentSignedIn = localStorage.getItem("studentLogin") === "true";
      if(isStudentSignedIn) {
        navigate("/pay/create-session");
      } else {
        localStorage.setItem("activeFlow", "dynamicFlow");
        navigate("/student/signin");
      }
    } else {
      navigate("/pay/payment-gateway-payment-flow");
    }
  };

  useEffect(() => {
    if (location.pathname.startsWith('/pay/dynamic')) {
      setRouteSource('Dynamic Flow');
    } else if (location.pathname === '/pay/review') {
      setRouteSource('Tuition Fee Flow');
    }
  }, [])

  return (
    <Box
      pt={7}
      sx={{
        backgroundImage: `url(${EiraBack})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          alignSelf={"flex-end"}
        >
          <img
            src={Secure}
            style={{
              height: "50px",
              width: "50px"
            }}
          />
          <Typography
            color={"white"}
            fontWeight={"bold"}
          >
            100% safe
          </Typography>
        </Stack>
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
            name="Suneel Satpal"
            phone={phoneNumber ? `+91 ${phoneNumber}` : "+91 93892 50148"}
            amount={amount ? Number(amount) : 5000}
            settlementDate="7th October"
            settlementTime="5:00 pm"
          />
        </Box>
        <Box
          width="30vw"
          minHeight="90vh"
          bgcolor={"#fff"}
          border={"1px solid #ccc"}
          padding={5}
          borderRadius={5}
          boxShadow={"2px -2px 14px 2px #00000021"}
        >
          <Stack>
            <img
              src={EiraLogo}
              style={{
                alignSelf: "flex-start",
                width: 80,
              }}
            />
            <Stack
              alignItems={"center"}
              mt={isTutorOnboarded ? 15 : 5}
            >
              {
                !isTutorOnboarded &&
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
                    Ask them to complete KYC now to receive the payment
                  </Typography>
                </Alert>
              }
              <PaymentInfo
                amount="5000"
                name="Suneel Satpal"
                paymentDetails={paymentDetails}
                type="review"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ padding: 1.5, borderRadius: 20, height: 45, mt: 5 }}
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
