import { useState } from "react";
import {
  Account,
  useLazyGetAccountsQuery,
} from "../APIs/definitions/bankAccounts";
import { 
  useLazyGetOnboardingStatusQuery 
} from "../APIs/definitions/onboarding";
import {
  useLazyGetUserDetailsQuery,
  UserDetails,
} from "../APIs/definitions/user";

export const useOnboarding = () => {
  const [getUserDetails] = useLazyGetUserDetailsQuery();
  const [getBankAccountDetails] = useLazyGetAccountsQuery();
  const [getOnboardingStatus] = useLazyGetOnboardingStatusQuery();
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
    navigateTo: string;
    onboardingStep: number;
    checkProcessIsLoading: boolean;
  }> => {
    setCheckProcessIsLoading(true);
    const userDetails = await fetchUserDetails();
    const bankAccountDetails = await fetchBankAccountDetails();
    const isKycPending = userDetails?.pg_onboarding_status.length === 0 || 
      (
        userDetails?.pg_onboarding_status && 
        userDetails?.pg_onboarding_status.length > 0 && 
        (userDetails.pg_onboarding_status[0].status === "INITIATED" || userDetails.pg_onboarding_status[0].status === "EMAIL_VERIFIED" || userDetails.pg_onboarding_status[0].status === "MIN_KYC_PENDING")
      );
    const isKycSubmitted = userDetails?.pg_onboarding_status && 
      userDetails?.pg_onboarding_status.length > 0 && 
      userDetails.pg_onboarding_status[0].status === "MIN_KYC_SUBMITTED"
    const isUserAadhaarVerified = userDetails?.pg_onboarding_status && 
      userDetails?.pg_onboarding_status.length > 0 && 
      (userDetails.pg_onboarding_status[0].status === "MIN_KYC_APPROVED" || userDetails.pg_onboarding_status[0].status !== "ACTIVE")
      // userDetails.pg_onboarding_status[0].status !== "EMAIL_VERIFIED" && 
      // userDetails.pg_onboarding_status[0].status !== "MIN_KYC_PENDING";

    setCheckProcessIsLoading(false);

    if (!userDetails?.pan) {
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 1,
        checkProcessIsLoading
      };
    }

    if (
      !bankAccountDetails ||
      (bankAccountDetails && bankAccountDetails.length === 0)
    ) {
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 2,
        checkProcessIsLoading
      };
    }

    if (isKycPending) {
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 3,
        checkProcessIsLoading
      }
    }

    if (isKycSubmitted) {
      return {
        navigateTo: "/tutor/dashboard",
        onboardingStep: 0,
        checkProcessIsLoading
      }
    }

    if (isUserAadhaarVerified) {
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 0,
        checkProcessIsLoading
      }
    }

    return {
      navigateTo: "/tutor/dashboard",
      onboardingStep: 0,
      checkProcessIsLoading
    };
  };

  return { determineOnboardingStep, checkProcessIsLoading };
};
