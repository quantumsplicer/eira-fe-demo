import { useState } from "react";
import {
  Account,
  useLazyGetAccountsQuery,
} from "../APIs/definitions/bankAccounts";
import { useLazyGetOnboardingStatusQuery } from "../APIs/definitions/onboarding";
import {
  useLazyGetUserDetailsQuery,
  UserDetails,
} from "../APIs/definitions/user";
import { trackEvent } from "../utils/amplitude";

export const useOnboarding = () => {
  const [getUserDetails] = useLazyGetUserDetailsQuery();
  const [getBankAccountDetails] = useLazyGetAccountsQuery();
  const [checkProcessIsLoading, setCheckProcessIsLoading] =
    useState<boolean>(true);

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

    setCheckProcessIsLoading(false);

    const bankAccountDetails = await fetchBankAccountDetails();

    if (!userDetails?.pan) {
      trackEvent("redirecting to page not found because pan does not exist", {
        userDetails: userDetails
      });
      return {
        navigateTo: "/page-not-found",
        onboardingStep: 1,
        checkProcessIsLoading,
      };
    }

    if (!bankAccountDetails || bankAccountDetails.length === 0) {
      trackEvent("redirecting to page not found because bank account does not exist", {
        bankAccountDetails: bankAccountDetails
      });
      return {
        navigateTo: "/page-not-found",
        onboardingStep: 2,
        checkProcessIsLoading,
      };
    }

    if (isKycPending) {
      trackEvent("redirecting to aadhaar verification page");
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 3,
        checkProcessIsLoading,
      };
    }

    trackEvent("KYC process completed already");
    return {
      navigateTo: "/tutor/dashboard",
      onboardingStep: 0,
      checkProcessIsLoading,
    };
  };

  return { determineOnboardingStep, checkProcessIsLoading };
};
