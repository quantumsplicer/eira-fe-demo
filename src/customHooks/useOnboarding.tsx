import { useState } from "react";
import {
  Account,
  useLazyGetAccountsQuery,
} from "../APIs/definitions/bankAccounts";
import { useLazyGetOnboardingStatusQuery } from "../APIs/definitions/onboarding";
import {
  useLazyGetUserDetailsQuery,
  usePrefillOnboardingMutation,
  UserDetails,
} from "../APIs/definitions/user";

export const useOnboarding = () => {
  const [getUserDetails] = useLazyGetUserDetailsQuery();
  const [getBankAccountDetails] = useLazyGetAccountsQuery();
  const [getOnboardingStatus] = useLazyGetOnboardingStatusQuery();
  const [checkProcessIsLoading, setCheckProcessIsLoading] =
    useState<boolean>(true);
  const [triggerPrefillOnboarding, { isLoading: prefillDataIsLoading }] =
    usePrefillOnboardingMutation();

  const fetchUserDetails = async (): Promise<UserDetails | null> => {
    let userDetails: UserDetails | null = null;
    await getUserDetails()
      .unwrap()
      .then((data) => {
        userDetails = data;
      })
      .catch((error) => {
        console.log(error);
      });

    return userDetails;
  };

  const fetchBankAccountDetails = async (): Promise<Account[]> => {
    let bankAccountDetails: Account[] = [];
    await getBankAccountDetails()
      .unwrap()
      .then((data) => {
        bankAccountDetails = data;
      })
      .catch((error) => {
        console.log(error);
      });

    return bankAccountDetails;
  };

  const determineOnboardingStep = async (): Promise<{
    navigateTo?: string;
    onboardingStep?: number;
    checkProcessIsLoading?: boolean;
  }> => {
    setCheckProcessIsLoading(true);
    const userDetails = await fetchUserDetails();

    localStorage.setItem("firstName", userDetails?.first_name ?? "");
    localStorage.setItem("lastName", userDetails?.last_name ?? "");
    localStorage.setItem("pan", userDetails?.pan ?? "");

    const isKycPending =
      userDetails?.pg_onboarding_status.length === 0 ||
      (userDetails?.pg_onboarding_status &&
        userDetails?.pg_onboarding_status.length > 0 &&
        (userDetails.pg_onboarding_status[0].status === "INITIATED" ||
          userDetails.pg_onboarding_status[0].status === "EMAIL_VERIFIED" ||
          userDetails.pg_onboarding_status[0].status === "MIN_KYC_PENDING"));
    const isKycSubmitted =
      userDetails?.pg_onboarding_status &&
      userDetails?.pg_onboarding_status.length > 0 &&
      userDetails.pg_onboarding_status[0].status === "MIN_KYC_SUBMITTED";
    const isUserAadhaarVerified =
      userDetails?.pg_onboarding_status &&
      userDetails?.pg_onboarding_status.length > 0 &&
      (userDetails.pg_onboarding_status[0].status === "MIN_KYC_APPROVED" ||
        userDetails.pg_onboarding_status[0].status !== "ACTIVE");
    // userDetails.pg_onboarding_status[0].status !== "EMAIL_VERIFIED" &&
    // userDetails.pg_onboarding_status[0].status !== "MIN_KYC_PENDING";

    if (!userDetails?.first_name) {
      let returnContext = {};

      await triggerPrefillOnboarding({
        phone: localStorage.getItem("phoneNumber") ?? "",
      })
        .then(async (result) => {
          if (result) {
            localStorage.setItem("autoFillDetails", "true");

            const firstName = result.data?.first_name;
            const lastName = result.data?.last_name;
            const pan = result.data?.pan;

            firstName && localStorage.setItem("firstName", firstName);
            lastName && localStorage.setItem("lastName", lastName);
            pan && localStorage.setItem("pan", pan);

            if (firstName && lastName && pan) {
              returnContext = {
                navigateTo: "/tutor/personal-details",
                onboardingStep: 2,
                checkProcessIsLoading,
              };
            } // if prefill gives all only navigate then otherwise this goes into an endless loop
          }
        })
        .catch((error) => {
          returnContext = {
            navigateTo: "/tutor/personal-details",
            onboardingStep: 1,
            checkProcessIsLoading,
          };
        });
      console.log("coming here", returnContext);
      if (Object.keys(returnContext).length > 0) {
        console.log("hey");
        return returnContext;
      }
    }

    setCheckProcessIsLoading(false);

    const bankAccountDetails = await fetchBankAccountDetails();

    if (!userDetails?.pan) {
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 1,
        checkProcessIsLoading,
      };
    }

    if (
      !bankAccountDetails ||
      (bankAccountDetails && bankAccountDetails.length === 0)
    ) {
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 2,
        checkProcessIsLoading,
      };
    }

    if (isKycPending) {
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 3,
        checkProcessIsLoading,
      };
    }

    if (isKycSubmitted) {
      return {
        navigateTo: "/tutor/dashboard",
        onboardingStep: 0,
        checkProcessIsLoading,
      };
    }

    if (isUserAadhaarVerified) {
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 0,
        checkProcessIsLoading,
      };
    }

    return {
      navigateTo: "/tutor/dashboard",
      onboardingStep: 0,
      checkProcessIsLoading,
    };
  };

  return { determineOnboardingStep, checkProcessIsLoading };
};
