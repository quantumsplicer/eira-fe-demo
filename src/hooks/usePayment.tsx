import { load } from "@cashfreepayments/cashfree-js";
import { useGetUserDetailsQuery } from "../APIs/definitions/user";
import { useCreateOrderMutation } from "../APIs/definitions/paymentLinks";
import { useState } from "react";

export const usePayment = () => {
  const activePaymentAmount = localStorage.getItem("activePaymentAmount");
  const activePaymentPayeeUserId = localStorage.getItem(
    "activePaymentPayeeUserId"
  );
  const [errorMessage, setErrorMessage] = useState<string|null>(null);

  let cashfree: any;

  const { data: userDetails } = useGetUserDetailsQuery();
  const [createOrder] = useCreateOrderMutation();

  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
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

  const makePayment = () => {
    setErrorMessage(null);
    createOrder({
      amount: Number(activePaymentAmount),
      payer_id: userDetails ? userDetails.id : undefined,
      payee_id: activePaymentPayeeUserId ?? undefined,
    })
      .unwrap()
      .then((res) => {
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
