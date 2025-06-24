import { useLocation, useNavigate } from "react-router-dom";
import {
  UserDetails,
  useLazyGetUserByUserNameQuery,
  useLazyGetUserDetailsByIdQuery,
  useLazyGetUserDetailsQuery,
  usePrefillOnboardingMutation,
} from "../APIs/definitions/user";
import { useEffect, useState } from "react";
import { useLazyGetPaymentInfoFromLinkQuery } from "../APIs/definitions/paymentLinks";
import { useLazyGetPlatformFeeQuery } from "../APIs/definitions/pg";

const useGetOnboardingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [checkProcessIsLoading, setCheckProcessIsLoading] =
    useState<boolean>(false);

  const [triggerPrefillOnboarding] = usePrefillOnboardingMutation();

  const [
    getUserDetails,
    { data: studentData, isLoading: studentDataIsLoading },
  ] = useLazyGetUserDetailsQuery();

  const [getTutorDetails] = useLazyGetUserByUserNameQuery();

  const [getTutorDetailsById] = useLazyGetUserDetailsByIdQuery();

  const [getPaymentLinkInfo] = useLazyGetPaymentInfoFromLinkQuery();

  const [getPgDetails] = useLazyGetPlatformFeeQuery();

  const getPgRates = async (payeeId: string, amount?: number) => {
    await getPgDetails(payeeId)
      .unwrap()
      .then((data) => {
        localStorage.setItem("pgName", data?.standard.pg_name);
        localStorage.setItem("baseRate", data?.standard.base_rate.toString());
        localStorage.setItem("platformTxnRate", data.standard.platform_tax_rate.toString());
        localStorage.setItem("isMarketplaceTxn", data.standard.is_marketplace_txn.toString());

        if (amount) {
          const fees = (amount * data?.standard?.base_rate) / 100;
          const gst = (data?.standard?.platform_tax_rate * fees) / 100;
          const activePaymentTotalAmt = parseFloat((fees + gst + amount).toFixed(2));
          localStorage.setItem("activePaymentTotalAmount", activePaymentTotalAmt.toString())
        }
      })
  }

  const navigationLogic = async (user: UserDetails) => {
    const activePaymentFlow = localStorage.getItem("activeFlow");

    if (user?.pan && user?.phone && user?.first_name) {
      switch (activePaymentFlow) {
        case "payTuitionFeesFlow":
          navigate("/pay/payment-details");
          break;
        case "StaticLinkFlow":
          localStorage.setItem("isTutorEiraOnboarded", "true");
          const urlStrings = localStorage.getItem("activeFlowUrl")?.split("/");
          if (urlStrings) {
            const tutorUsername =
              urlStrings[urlStrings.length - 1] !== ""
                ? urlStrings[urlStrings.length - 1]
                : urlStrings[urlStrings.length - 2];
            await getTutorDetails(tutorUsername)
              .unwrap()
              .then(async (res) => {
                const tutor = res[0];
                localStorage.setItem("activePaymentTutorId", tutor?.phone);
                localStorage.setItem(
                  "activePaymentTutorName",
                  `${tutor?.first_name} ${tutor?.last_name}`
                );
                localStorage.setItem("activePaymentPayeeUserId", tutor?.id);
                await getPgRates(tutor?.id);
                navigate(`/static-link/${tutorUsername}`);
              })
              .catch((err) => console.log(err));
          }
          break;
        case "DynamicLinkFlow":
          localStorage.setItem("isTutorEiraOnboarded", "true");
          try {
            const activeFlowQuery = localStorage.getItem("activeFlowQuery");
            const activePaymentLinkId = activeFlowQuery
              ?.split("=")
              .at(-1) as string;
            const paymentLinkInfo = await getPaymentLinkInfo(
              activePaymentLinkId
            )
              .unwrap()
              .then()
              .catch();

            localStorage.setItem(
              "activePaymentAmount",
              `${paymentLinkInfo?.amount}`
            );
            localStorage.setItem(
              "activePaymentTutorId",
              paymentLinkInfo?.payee_phone
            );
            localStorage.setItem(
              "activePaymentTutorName",
              paymentLinkInfo?.payee_name
            );
            localStorage.setItem(
              "activePaymentPayeeUserId",
              paymentLinkInfo?.payee
            );
            activePaymentLinkId &&
              localStorage.setItem("activePaymentLinkId", activePaymentLinkId);

            if (paymentLinkInfo?.payee) {
              let isTutorPgOnboarded = false;
              getTutorDetailsById(paymentLinkInfo.payee)
                .unwrap()
                .then(async (res) => {
                  isTutorPgOnboarded = res?.pg_onboarding_status.length > 0 
                  await getPgRates(paymentLinkInfo.payee, paymentLinkInfo?.amount);
                })
                .catch()
                .finally(
                  () =>
                    isTutorPgOnboarded
                      ? navigate("/pay/review")
                      : navigate("/page-not-found")
                  // isTutorPgOnboarded ? navigate("/pay/review") : navigate("/pay/create-session")
                );
            } else {
              navigate("/page-not-found");
            }
          } catch {
            navigate("/page-not-found");
            console.error("Error fetching payment link info");
          }
          break;
        default:
          navigate("/student/dashboard");
          break;
      }
    } else {
      if (
        localStorage.getItem("access-token") &&
        localStorage.getItem("studentLogin") === "true"
      ) {
        setCheckProcessIsLoading(true);
        await triggerPrefillOnboarding({
          phone: user?.phone,
        }).then(async (result) => {
          if (result) {
            localStorage.setItem("autoFillDetails", "true");

            const firstName = result.data?.first_name;
            const lastName = result.data?.last_name;
            const pan = result.data?.pan;

            firstName && localStorage.setItem("firstName", firstName);
            lastName && localStorage.setItem("lastName", lastName);
            pan && localStorage.setItem("pan", pan);

            firstName && lastName && pan && navigateToCurrentOnboardingStep(); // if prefill gives all only navigate then otherwise this goes into an endless loop
          }
        });
        navigate("/student/signup");
      } else {
        navigate("/student/login");
      }
    }
  };

  const navigateToCurrentOnboardingStep = async () => {
    const user = await getUserDetails()
      .unwrap()
      .catch((err) => console.log(err));

    await navigationLogic(user as UserDetails);
  };

  const checkCurrentStudentOnboardingState = async () => {
    setCheckProcessIsLoading(true);
    try {
      const token = localStorage.getItem("access-token");

      // Check if the user is already logged in or not
      if (!token && !window.location.href.includes("student/login")) {
        navigate("/student/login");
        return;
      }

      // Check if the user is a student or not
      const isStudent = localStorage.getItem("studentLogin") === "true";

      if (!isStudent) {
        setCheckProcessIsLoading(false);
        navigate("/student/login");
        return;
      }

      // Check if the student is fully onboarded
      const user = await getUserDetails().unwrap();
      setCheckProcessIsLoading(false);
      if (user) {
        navigationLogic(user as UserDetails);
      } else {
        navigate("/student/login");
      }
    } catch {
      setCheckProcessIsLoading(false);
      navigate("/student/login");
      console.error("Error fetching user details");
    }
  };

  return {
    navigateToCurrentOnboardingStep,
    checkCurrentStudentOnboardingState,
    checkProcessIsLoading,
  };
};

export default useGetOnboardingDetails;
