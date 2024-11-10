import React from "react";
import { Divider, Stack, useMediaQuery } from "@mui/material";
import ProfilePhotoUpload from "../components/ProfilePhotoUpload";
import AccountsListCard from "../components/AccountListCard";
import ProfileInfoCard from "../components/ProfileInfoCard";

const ProfilePage: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  return (
    <Stack
      spacing={!isPhoneScreen ? 2 : 0}
      sx={!isPhoneScreen ? {} : { pt: 3.5 }}
      height={isPhoneScreen ? "100vh" : "80vh"}
    >
      {!isPhoneScreen ? <h1>Profile</h1> : <></>}
      <Stack
        spacing={!isPhoneScreen ? 4 : 0}
        direction={!isPhoneScreen ? "row" : "column"}
        sx={
          !isPhoneScreen
            ? { justifyContent: "space-between" }
            : { justifyContent: "space-around" }
        }
      >
        <Stack
          sx={
            !isPhoneScreen
              ? {
                  flexDirection: "column",
                  justifyContent: "space-between", // Centers vertically
                  alignItems: "center",
                  width: "47%",
                }
              : {
                  flexDirection: "column",
                  justifyContent: "space-between", // Centers vertically
                  alignItems: "center",
                  width: "100%",
                }
          }
          spacing={!isPhoneScreen ? 4 : 0}
        >
          <ProfilePhotoUpload />
          <ProfileInfoCard />
        </Stack>
        {!isPhoneScreen ? <></> : <Divider />}
        <Stack
          sx={
            !isPhoneScreen
              ? {
                  justifyContent: "center", // Centers vertically
                  alignItems: "center",
                  width: "47%",
                }
              : {
                  justifyContent: "center", // Centers vertically
                  alignItems: "center",
                  width: "100%",
                }
          }
        >
          <AccountsListCard />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
