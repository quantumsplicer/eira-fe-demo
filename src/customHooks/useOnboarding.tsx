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

  const fetchAadhaarVerificationStatus = async (userId: string | undefined): Promise<boolean> => {
    let isUserAadhaarVerified = false;
    if (userId) {
      await getOnboardingStatus(userId)
        .unwrap()
        .then(res => {
          isUserAadhaarVerified = true;
        })
        .catch(err => {
          if (err.satus === 404) {
            isUserAadhaarVerified = false;
          }
        })
    }
    return isUserAadhaarVerified;
  }

  const determineOnboardingStep = async (): Promise<{
    navigateTo: string;
    onboardingStep: number;
    checkProcessIsLoading: boolean;
  }> => {
    setCheckProcessIsLoading(true);
    const userDetails = await fetchUserDetails();
    const bankAccountDetails = await fetchBankAccountDetails();
    const activeFlow = localStorage.getItem("activeFlow");
    let isUserAadhaarVerified;

    if (activeFlow === "tutorKyc") {
      isUserAadhaarVerified = await fetchAadhaarVerificationStatus(userDetails?.id);
    }
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

    if (activeFlow === "tutorKyc" && !isUserAadhaarVerified) {
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 3,
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
