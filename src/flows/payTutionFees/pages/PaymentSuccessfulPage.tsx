// src/components/PaymentSuccessfulPage.tsx
import React, { useEffect } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import PaymentConfirmation from "../../../components/PaymentConfirmation";
import SafeLogo from "../../../components/SafeLogo";
import { useDispatch } from "react-redux";
import { useLazyGetPaymentStatusQuery } from "../../../APIs/definitions/payment";
import { changePaymentStatus } from "../../../stores/slices";

const PaymentSuccessfulPage = () => {

  const notPhoneScreen = useMediaQuery('(min-width:850px)');
  const [getPaymentStatus] = useLazyGetPaymentStatusQuery();
  const dispatch = useDispatch();

  const paymentDetails = {
    "Transaction ID": "1feda785cb576a90",
    "Account Number": "**** **** **** 2150",
    "Payee Name": "Suneel Satpal",
    "Payee Phone": "+91 9389250148",
    "Transaction Date": "24th Aug, 2024",
    "Transaction Time": "15:49",
    "Session Date": "24th Aug, 2024",
    "Session Time": "17:00 - 18:00"
  }

  useEffect(() => {
    const desiredStatus = 'PAID';
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;
  
    const fetchPaymentStatus = async () => {
      console.log("status")
      const orderId = localStorage.getItem("order_id");
      if (orderId) {
        await getPaymentStatus(orderId)
          .unwrap()
          .then(res => {
            if (res.status === desiredStatus) {
              dispatch(changePaymentStatus(res.status));
              clearInterval(interval);
              clearTimeout(timeout);
            }
          })
          .catch(err => {
            console.error('Error fetching payment status:', err);
          });
      };
    }
  
    interval = setInterval(fetchPaymentStatus, 1000);
    timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box
      pt={7}
      sx={{
        backgroundImage: notPhoneScreen ? `url(${EiraBack})` : '',
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
        {
          notPhoneScreen &&
          <Box
            alignSelf={"flex-end"}
            position={"relative"}
            right={404}
          >
            <SafeLogo />
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
            width="100%"
          >
            <img
              src={EiraLogo}
              style={{
                alignSelf: notPhoneScreen ? "flex-start" : "center",
                width: 80,
              }}
            />
            <Box
              mt={notPhoneScreen ? 5 : 10}
              width={"100%"}
            >
              <PaymentConfirmation
                name="Suneel Satpal"
                paymentDetails={paymentDetails}
                amount="5000"
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default PaymentSuccessfulPage;
