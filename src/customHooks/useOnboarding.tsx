import { Account, useLazyGetAccountsQuery } from "../APIs/definitions/bankAccounts";
import { useLazyGetUserDetailsQuery, UserDetails } from "../APIs/definitions/user";

export const useOnboarding = () => {

  const [getUserDetails] = useLazyGetUserDetailsQuery();
  const [getBankAccountDetails] = useLazyGetAccountsQuery();

  const fetchUserDetails = async (): Promise<UserDetails | null> => {
    let userDetails: UserDetails | null = null;
    await getUserDetails()
      .unwrap()
      .then(data => {
        userDetails = data
      })
      .catch(error => {
        console.log(error)
      })

    return userDetails;
  };

  const fetchBankAccountDetails = async (): Promise<Account[]> => {
    let bankAccountDetails: Account[] = [];
    await getBankAccountDetails()
      .unwrap()
      .then(data => {
        bankAccountDetails = data;
      })
      .catch(error => {
        console.log(error)
      })

    return bankAccountDetails
  };

  const determineOnboardingStep = async (): Promise<{ navigateTo: string; onboardingStep: number }> => {
    const userDetails = await fetchUserDetails();
    const bankAccountDetails = await fetchBankAccountDetails();

    if (!userDetails?.pan) {
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 1
      }
    }

    if (!bankAccountDetails || (bankAccountDetails && bankAccountDetails.length === 0)) {
      return {
        navigateTo: "/tutor/personal-details",
        onboardingStep: 2
      }
    }

    return {
      navigateTo: "/tutor-id/dashboard",
      onboardingStep: 0
    }
  };

  return { determineOnboardingStep };
};