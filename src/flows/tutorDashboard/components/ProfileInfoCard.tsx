import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import StatusTag from "./StatusTag";
import { useGetUserDetailsQuery } from "../../../APIs/definitions/user";
import { useGetOnboardingStatusQuery } from "../../../APIs/definitions/onboarding";

const ProfileInfoCard: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const { data: userDetails, isLoading, error } = useGetUserDetailsQuery();
  const { error: isOnboardingStatusError } = useGetOnboardingStatusQuery(userDetails ? userDetails.id : "");
  return (
    <Box
      sx={
        !isPhoneScreen
          ? {
              pt: 6,
              borderRadius: 2,
              width: "100%",
              height: 340,
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
          <Stack direction="row" display="flex" justifyContent="space-between" alignItems={"center"}>
            <Typography color="#7E7E7E" fontWeight={630}>
              Pan:
            </Typography>
            <Typography color="#3C3C3C" fontWeight={630}>
              {userDetails?.pan}
            </Typography>
          </Stack>
          <Stack direction="row" display="flex" justifyContent="space-between" alignItems={"center"}>
            <Typography color="#7E7E7E" fontWeight={630}>
              Account Verified:
            </Typography>
            <StatusTag cellValue="No" />
          </Stack>
          <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
            <Typography color="#7E7E7E" fontWeight={630}>
              Account Holder:
            </Typography>
            <Typography color="#3C3C3C" fontWeight={630}>
              {userDetails?.first_name + " " + userDetails?.last_name}
            </Typography>
          </Stack>
          <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
            <Typography color="#7E7E7E" fontWeight={630}>
              Aadhaar Verified:
            </Typography>
            <StatusTag cellValue={isOnboardingStatusError ? "No" : "Yes"} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
export default ProfileInfoCard;
