import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import StatusTag from "./StatusTag";
import { useGetUserDetailsQuery } from "../../../APIs/definitions/user";

const ProfileInfoCard: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const { data: userDetails, isLoading, error } = useGetUserDetailsQuery(undefined, { skip: !localStorage.getItem("access-token") });

  const isAadharVerified = () => {
    return (
      userDetails?.pg_onboarding_status &&
      userDetails.pg_onboarding_status.length > 0 &&
      (userDetails.pg_onboarding_status[0].status === "MIN_KYC_APPROVED" ||
        userDetails.pg_onboarding_status[0].status === "ACTIVE")
    );
  };

  return (
    <Box
      sx={
        !isPhoneScreen
          ? {
              pt: 6,
              pb: 2,
              borderRadius: 2,
              width: "100%",
              height: "40vh",
              backgroundColor: "white",
              boxShadow: 6,
            }
          : {
              pb: 6,
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              marginTop: "-1rem",
              paddingTop: "1rem",
            }
      }
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        spacing={6}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
          spacing={0.5}
        >
          <Typography fontSize={20} fontWeight={600}>
            {userDetails?.first_name + " " + userDetails?.last_name}
          </Typography>
          <Typography>+91{userDetails?.phone}</Typography>
        </Stack>

        <Stack sx={{ width: "80%" }} spacing={2}>
          <Stack
            direction="row"
            display="flex"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography color="#7E7E7E" fontWeight={630}>
              Pan:
            </Typography>
            <Typography color="#3C3C3C" fontWeight={630}>
              {userDetails?.pan}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            display="flex"
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography color="#7E7E7E" fontWeight={630}>
              Account Verified:
            </Typography>
            <StatusTag cellValue={userDetails?.onboarding_status ?? ""} />
          </Stack>
          <Stack
            direction="row"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="#7E7E7E" fontWeight={630}>
              Account Holder:
            </Typography>
            <Typography color="#3C3C3C" fontWeight={630}>
              {userDetails?.first_name + " " + userDetails?.last_name}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="#7E7E7E" fontWeight={630}>
              Aadhaar Verified:
            </Typography>
            <StatusTag cellValue={isAadharVerified() ? "Yes" : "No"} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
export default ProfileInfoCard;
