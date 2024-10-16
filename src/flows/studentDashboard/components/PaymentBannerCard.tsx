import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";
import PaymentLinkBannerArt from "../../../assets/images/svg/PaymentLinkBannerArt.svg";
import { TutorDetails } from "../interfaces";
import PaymentFlow from "./PaymentFlow";

interface AvatarWithDetailsProps {
  name: string;
  phoneNumber: string;
  onClick: () => void;
}

const AvatarWithDetails: React.FC<AvatarWithDetailsProps> = ({
  name,
  phoneNumber,
  onClick,
}) => {
  return (
    <Stack spacing={1} width="100%" alignItems="center">
      <Avatar
        alt={name}
        sx={{
          width: "80px",
          height: "80px",
          bgcolor: "primary.main",
          fontSize: "40px",
        }}
        onClick={onClick}
      >
        {name[0]}
      </Avatar>
      <Stack alignItems="center">
        <Typography sx={{ fontSize: 11, fontWeight: 500 }}>{name}</Typography>
        <Typography sx={{ fontSize: 10, fontWeight: 500 }}>
          {phoneNumber}
        </Typography>
      </Stack>
    </Stack>
  );
};

const PaymentBannerCard: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [isPaymentFlowActive, setIsPaymentFlowActive] = useState(false);
  const handleClosePaymentFlow = () => {
    setIsPaymentFlowActive(false);
  };
  const [tutorDetails, setTutorDetails] = useState<TutorDetails>({
    firstName: "",
    lastName: "",
    panNumber: "",
    phoneNumber: "",
  });
  const handleTutorDetails = (details: TutorDetails) => {
    setTutorDetails(details);
    setIsPaymentFlowActive(true);
  };
  const handleOpenPaymentFlow = () => {
    setTutorDetails({
      firstName: "",
      lastName: "",
      panNumber: "",
      phoneNumber: "",
    });
    setIsPaymentFlowActive(true);
  };
  return (
    <Box
      sx={
        !isPhoneScreen
          ? {
              p: 4,
              borderRadius: 2,
              backgroundColor: "white",
              boxShadow: 6,
              width: "100%",
            }
          : {
              p: 2,
              backgroundColor: "white",
              width: "100%",
              height: "70vw",
            }
      }
    >
      <Stack
        direction="row"
        spacing={!isPhoneScreen ? 0 : 4}
        sx={
          !isPhoneScreen
            ? {
                justifyContent: "space-around",
              }
            : {
                justifyContent: "space-between",
                height: "100%",
              }
        }
        width="fullwidth"
      >
        <Stack
          direction={!isPhoneScreen ? "row" : "column"}
          sx={
            !isPhoneScreen
              ? {
                  flexDirection: "row",
                  alignItems: "center",
                }
              : {
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "space-evenly",
                  paddingLeft: 2,
                  paddingRight: 2,
                }
          }
        >
          <Stack
            spacing={2}
            alignItems="center"
            direction={!isPhoneScreen ? "column" : "row-reverse"}
            sx={
              !isPhoneScreen
                ? {
                    justifyContent: "space-between",
                  }
                : {
                    justifyContent: "space-evenly",
                    height: "100%",
                  }
            }
          >
            <Button
              variant="contained"
              onClick={handleOpenPaymentFlow}
              sx={
                !isPhoneScreen
                  ? {
                      backgroundColor: "#507FFD",
                      borderRadius: 3,
                      fontSize: 20,
                      fontWeight: 600,
                      height: 90,
                      paddingLeft: 8,
                      paddingRight: 8,
                      textTransform: "none",
                    }
                  : {
                      backgroundColor: "#507FFD",
                      borderRadius: 5,
                      fontSize: 10,
                      fontWeight: 600,
                      height: 40,
                      paddingLeft: 0,
                      paddingRight: 0,
                      textTransform: "none",
                      width: "80%",
                    }
              }
            >
              {isPhoneScreen ? "Make a payment" : "Make a new Payment"}
            </Button>
            <Stack
              direction="row"
              spacing={!isPhoneScreen ? 1 : 0}
              sx={!isPhoneScreen ? {} : { width: "100%" }}
            >
              <Typography
                sx={
                  !isPhoneScreen
                    ? { fontSize: 20, fontWeight: 500 }
                    : { fontSize: 12, fontWeight: 500, width: "100%" }
                }
              >
                Make a payment through Credit <strong> @ just 1%</strong>
              </Typography>
            </Stack>
          </Stack>
          {isPhoneScreen ? (
            <Stack spacing={4} width="100%">
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                Recent Payments
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="space-evenly"
                sx={{ width: "100%" }}
              >
                {avatarsWithDetails.slice(0, 3).map((avatar, index) => (
                  <AvatarWithDetails
                    key={index}
                    name={`${avatar.firstName} ${avatar.lastName}`}
                    phoneNumber={avatar.phoneNumber}
                    onClick={() => {
                      handleTutorDetails(avatar);
                    }}
                  />
                ))}
              </Stack>
            </Stack>
          ) : (
            <></>
          )}
        </Stack>
        {!isPhoneScreen ? (
          <Box>
            <img
              src={PaymentLinkBannerArt}
              alt="art"
              style={
                !isPhoneScreen
                  ? {
                      width: "250px",
                      height: "250x",
                    }
                  : {
                      width: "250px",
                      height: "250x",
                    }
              }
            />
          </Box>
        ) : (
          <></>
        )}
      </Stack>
      {isPaymentFlowActive && (
        <PaymentFlow
          open={isPaymentFlowActive}
          onClose={handleClosePaymentFlow}
          tutorDetailsProp={tutorDetails}
        />
      )}
    </Box>
  );
};
const avatarsWithDetails: TutorDetails[] = [
  {
    firstName: "John",
    lastName: "Dorito",
    panNumber: "1234567890",
    phoneNumber: "9997945005",
  },
  {
    firstName: "Sugarcane",
    lastName: "Smith",
    panNumber: "1234567890",
    phoneNumber: "9411819909",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    panNumber: "1234567890",
    phoneNumber: "9412061914",
  },
  {
    firstName: "Bob",
    lastName: "Williams",
    panNumber: "1234567890",
    phoneNumber: "9997945005",
  },
  {
    firstName: "Eva",
    lastName: "Brown",
    panNumber: "1234567890",
    phoneNumber: "9997945005",
  },
];
export default PaymentBannerCard;
