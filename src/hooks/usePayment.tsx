import { load } from "@cashfreepayments/cashfree-js";

export const usePayment = () => {
  let cashfree: any;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "production",
    });
  };
  initializeSDK();

  const doPayment = async () => {
    let checkoutOptions = {
      paymentSessionId: "your-payment-session-id",
      redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions);
  };

  return {
    doPayment,
  };
};
