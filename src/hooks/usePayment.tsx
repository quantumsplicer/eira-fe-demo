import { load } from "@cashfreepayments/cashfree-js";
import { useGetUserDetailsQuery } from "../APIs/definitions/user";
import { useCreateOrderMutation } from "../APIs/definitions/paymentLinks";
import { useState } from "react";
import { useCreateSessionMutation } from "../APIs/definitions/session";
import { trackEvent } from "../utils/amplitude";

export const usePayment = () => {
  const [errorMessage, setErrorMessage] = useState<string|null>(null);

  let cashfree: any;

  const { data: userDetails } = useGetUserDetailsQuery(undefined, { skip: !localStorage.getItem("access-token") });
  const [createOrder] = useCreateOrderMutation();
  const [createSession, { isLoading: createSessionIsLoading }] = useCreateSessionMutation();

  var initializeSDK = async function () {
    const environment = window.location.host.includes("app.eira.club") ? "prod" : "dev";
    cashfree = await load({
      mode: environment === "prod" ? "production" : "sandbox",
    });
  };
  initializeSDK();

  const openCashfreeCheckout = async (paymentSessionId: string) => {
    let checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions);
  };

  const getNextHour = (incrementHour:number) => {
    const currentTime = new Date();

    // Increment the hour
    currentTime.setHours(currentTime.getHours() + incrementHour);
    currentTime.setMinutes(0);
    currentTime.setSeconds(0);
    currentTime.setMilliseconds(0);

    // Convert to IST timezone (UTC+5:30)
    const istOffset = 5.5 * 60; // 5.5 hours in minutes
    const istTime = new Date(currentTime.getTime() + istOffset * 60 * 1000);

    // Format the IST time to YYYY-MM-DDTHH:mm:ss
    const formattedISTTime = istTime.toISOString().split('.')[0];

    return formattedISTTime;
  }

  const makePayment = () => {

    const activePaymentAmount = localStorage.getItem("activePaymentAmount");
    const activePaymentTotalAmount = localStorage.getItem("activePaymentTotalAmount");
    const activePaymentPayeeUserId = localStorage.getItem(
      "activePaymentPayeeUserId"
    );
    setErrorMessage(null);

    const payload = {
      amount: Number(activePaymentTotalAmount),
      base_amount: Number(activePaymentAmount),
      payer_id: userDetails ? userDetails.id : undefined,
      payee_id: activePaymentPayeeUserId ?? undefined,
      payment_method: "cc",
      settlement_type: "STANDARD" as "STANDARD" | "ON_DEMAND" | "INSTANT",
      ...(localStorage.getItem("activePaymentLinkId")
        ? { payment_link_id: localStorage.getItem("activePaymentLinkId")} 
        : {}),
    }

    createOrder(payload)
      .unwrap()
      .then((res) => {
        createSession({
          subject: "Maths session",
          teacher_id: activePaymentPayeeUserId ?? undefined,
          student_id: userDetails?.id ?? "",
          amount: activePaymentAmount ? Number(activePaymentAmount) : 0,
          starttime: getNextHour(1),
          endtime: getNextHour(2),
          title: "Maths session"
        })
        .catch()
        trackEvent("Redirecting to cashfree", {
          sessionId: res.payment_session_id
        })
        openCashfreeCheckout(res.payment_session_id);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 400) {
          setErrorMessage(err.data.message.split(": ").pop());
        } else {
          setErrorMessage("Something went wrong. Please try again!")
        }
      });

  };

  return {
    openCashfreeCheckout,
    makePayment,
    errorMessage
  };
};
