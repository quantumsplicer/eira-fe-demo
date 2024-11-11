// src/components/PaymentSuccessfulPage.tsx
import React, { useEffect } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import EiraLogo from "../../../assets/images/png/eira-logo.png";
import EiraBack from '../../../assets/images/svg/EiraBack.svg'
import PaymentConfirmation from "../../../components/PaymentConfirmation";
import SafeLogo from "../../../components/SafeLogo";
import { useDispatch } from "react-redux";
import { useGetPaymentStatusQuery } from "../../../APIs/definitions/paymentLinks";
import { changePaymentStatus } from "../../../stores/slices";
import moment from "moment";

const PaymentSuccessfulPage = () => {
  const notPhoneScreen = useMediaQuery('(min-width:850px)');
  const { data: paymentStatus } = useGetPaymentStatusQuery(localStorage.getItem("order_id") as string);

  const amount = paymentStatus?.order?.amount;
  const payeeName = paymentStatus?.payee_name;
  const payeePhone = paymentStatus?.payee_phone;
  const maskedAccountNumber = paymentStatus?.masked_account_number;
  const sessionDate = localStorage.getItem("activePaymentSessionDate");
  const sessionTime = localStorage.getItem("activePaymentSessionTime");
  const transactionId = paymentStatus?.latest_payment_id;
  const paymentDateTime = paymentStatus?.payment_time;

  const paymentDetails = {
    ...(transactionId ? { "Transaction ID": transactionId } : {}),
    ...(maskedAccountNumber ? { "Account Number": maskedAccountNumber } : {}),
    ...(payeeName ? { "Payee Name": payeeName } : {}),
    ...(payeePhone ? { "Payee Phone": `+91 ${payeePhone}` } : {}),
    ...(paymentDateTime ? { "Transaction Date": moment(paymentDateTime).format("MMMM D, YYYY") } : {}),
    ...(paymentDateTime ? { "Transaction Time": moment(paymentDateTime).format("h:mm A") } : {}),
    ...(sessionDate ? { "Session Date": moment(sessionDate).format("MMMM D, YYYY") } : {}),
    ...(sessionTime ? { "Session Time": 
          `${moment(sessionTime.split("-")[0]).format(
            "h:mm A z"
          )} - ${moment(sessionTime.split("-")[1]).format(
            "h:mm A z"
          )}` } 
        : {})
  }

  useEffect(() => {
    localStorage.removeItem("activePaymentAmount");
    localStorage.removeItem("activePaymentPayeeUserId");
    localStorage.removeItem("activePaymentTutorId");
    localStorage.removeItem("activePaymentTutorName");
    localStorage.removeItem("activePaymentSessionDate");
    localStorage.removeItem("activePaymentSessionTime");
    localStorage.removeItem("isTutorEiraOnboarded");
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
                name={payeeName ?? ""}
                paymentDetails={paymentDetails}
                amount={String(amount) ?? ""}
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default PaymentSuccessfulPage;
