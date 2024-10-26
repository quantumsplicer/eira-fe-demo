// src/components/PaymentSuccessfulPage.tsx
import React, { useEffect } from "react";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { useLazyGetPaymentStatusQuery } from "../../../APIs/definitions/paymentLinks";
import { changePaymentStatus } from "../../../stores/slices";
import { Loading } from "../../../components/Loading";
import { useNavigate } from "react-router-dom";

const PaymentRedirect = () => {
  const navigate = useNavigate();
  const notPhoneScreen = useMediaQuery('(min-width:850px)');
  const [getPaymentStatus] = useLazyGetPaymentStatusQuery();
  const dispatch = useDispatch();

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
            if (res.order.status === desiredStatus) {
              clearInterval(interval);
              clearTimeout(timeout);
              navigate("/pay/status")
            }
          })
          .catch(err => {
            console.error('Error fetching payment status:', err);
          });
      } else {
        navigate("/pay/status")
      }
    }
  
    interval = setInterval(fetchPaymentStatus, 1000);
    timeout = setTimeout(() => {
      clearInterval(interval);
      navigate("/pay/status")
    }, 10000);
  
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Loading />
  );
};

export default PaymentRedirect;
