import React from "react";
import { Divider, Stack } from "@mui/material";

import PaymentLinkCard from "../components/PaymentLinkCard";
import UnsettledAmountCard from "../components/UnsettledAmountCard";
import PaymentHistoryTable from "../components/PaymentHistoryTable";
import CurrentLimitCard from "../components/CurrentLimitCard";
import SharePaymentLinkCard from "../components/SharePaymentLinkCard";
import CreatePaymentLinkCard from "../components/CreatePaymentLinkCard";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload";
import AccountsListCard from "../components/AccountListCard";
import ProfileInfoCard from "../components/ProfileInfoCard";

const ProfilePage: React.FC = () => {
  return (
    <>
      <Stack spacing={5}>
        <h1>Profile</h1>
        <Stack
          spacing={4}
          direction="row"
          display="flex"
          justifyContent="space-around"
          pl={8}
        >
          <Stack
            sx={{
              flexDirection: "column",
              justifyContent: "space-between", // Centers vertically
              alignItems: "center",
              width: "40%",
            }}
            spacing={4}
          >
            <ProfilePhotoUpload />
            <ProfileInfoCard />
          </Stack>
          <Stack
            sx={{
              justifyContent: "center", // Centers vertically
              alignItems: "center",
              width: "60%",
            }}
          >
            <AccountsListCard />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default ProfilePage;
