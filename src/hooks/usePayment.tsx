import { load } from "@cashfreepayments/cashfree-js";

export const usePayment = () => {
  let cashfree: any;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "production",
    });
  };
  initializeSDK();

  const doPayment = async (paymentSessionId: string) => {
    let checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions);
  };

  return {
    doPayment,
  };
};
