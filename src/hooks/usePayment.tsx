import { load } from "@cashfreepayments/cashfree-js";
import { useGetUserDetailsQuery } from "../APIs/definitions/user";
import { useCreateOrderMutation } from "../APIs/definitions/paymentLinks";

export const usePayment = () => {
  const activePaymentAmount = localStorage.getItem("activePaymentAmount");
  const activePaymentPayeeUserId = localStorage.getItem(
    "activePaymentPayeeUserId"
  );

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
      });

  };

  return {
    openCashfreeCheckout,
    makePayment,
  };
};
