import * as React from "react";
import Box from "@mui/material/Box";
import { Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import { useGetUserMetricsQuery } from "../../../APIs/definitions/userMetrics";
import { getNextWorkingDay } from "../../../utils/helperFunctions";

const UnsettledAmountCard: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const userMetricsData = useGetUserMetricsQuery();
  const settlementDate = getNextWorkingDay();
  console.log("User metrics data");
  console.log(userMetricsData);

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  return (
    <Box
      sx={
        !isPhoneScreen
          ? {
              p: 2,
              borderRadius: 2,
              width: "50%",
              backgroundColor: "white",
              boxShadow: 6,
            }
          : {
              p: 3,
              width: "100%",
              backgroundColor: "white",
              height: 320,
            }
      }
    >
      <Stack
        spacing={!isPhoneScreen ? 0 : 3}
        direction={!isPhoneScreen ? "row" : "column"}
        sx={!isPhoneScreen ? { justifyContent: "space-between" } : {}}
      >
        <Box
          sx={
            !isPhoneScreen
              ? {
                  backgroundColor: "#EBF9F1",
                  width: "45%",
                  alignContent: "center",
                  borderRadius: 2,
                  p: 2,
                }
              : {
                  backgroundColor: "#EBF9F1",
                  width: "100%",
                  alignContent: "center",
                  borderRadius: 6,
                  pt: 4,
                  pb: 4,
                  pl: 2,
                  pr: 2,
                }
          }
        >
          <Stack
            spacing={!isPhoneScreen ? 0 : 0.5}
            direction={!isPhoneScreen ? "column" : "row"}
            sx={
              !isPhoneScreen
                ? { alignContent: "center" }
                : {
                    width: "100%",
                    justifyContent: "space-between",
                    alignContent: "center",
                    pl: 2,
                    pr: 2,
                  }
            }
          >
            <Stack spacing={!isPhoneScreen ? 0 : 1}>
              <Typography
                sx={
                  !isPhoneScreen
                    ? { fontSize: 15, fontWeight: 600 }
                    : {
                        fontSize: 16,
                        fontWeight: 500,
                      }
                }
              >
                Unsettled Amount
              </Typography>
              <Typography
                sx={
                  !isPhoneScreen
                    ? { color: "#3BB900", fontSize: 27, fontWeight: 650 }
                    : { color: "#3BB900", fontSize: 32, fontWeight: 600 }
                }
              >
                {formatter.format(userMetricsData.data?.unsettled_amount || 0)}
              </Typography>
            </Stack>
            <Stack sx={!isPhoneScreen ? {} : { alignSelf: "center" }}>
              <Typography
                sx={
                  !isPhoneScreen
                    ? { fontSize: 10 }
                    : { fontSize: 12, textAlign: "right" }
                }
                color="#898989"
              >
                Next settlement on
              </Typography>
              <Typography
                sx={
                  !isPhoneScreen
                    ? { fontSize: 10 }
                    : { fontSize: 11, textAlign: "right" }
                }
                fontWeight="bold"
                color="#898989"
              >
                {settlementDate}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        {!isPhoneScreen ? (
          <Divider orientation="vertical" variant="middle" flexItem />
        ) : (
          <></>
        )}
        <Box sx={!isPhoneScreen ? { width: "45%" } : {}}>
          <Stack
            spacing={4}
            direction={!isPhoneScreen ? "column" : "row"}
            sx={
              !isPhoneScreen
                ? {
                    justifyContent: "space-evenly",
                    height: "100%",
                  }
                : {}
            }
          >
            <Stack
              direction="row"
              spacing={2}
              sx={
                !isPhoneScreen
                  ? { justifyContent: "space-evenly" }
                  : {
                      justifyContent: "space-between",
                      border: "0.2px solid",
                      borderColor: "#C3C3C3",
                      borderRadius: 2,
                      p: 2,
                    }
              }
            >
              <Typography
                sx={
                  !isPhoneScreen
                    ? { fontSize: 13, fontWeight: "bold" }
                    : {
                        fontSize: 18,
                        alignSelf: "center",
                        pl: 1,
                        fontWeight: 500,
                      }
                }
              >
                {userMetricsData.data?.txn_since_last_settlement || 0}
              </Typography>
              <Typography
                sx={
                  !isPhoneScreen
                    ? { fontSize: 11, textAlign: "right" }
                    : { fontSize: 10, textAlign: "right", width: "40%" }
                }
              >
                Transactions since last settlement
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={!isPhoneScreen ? 1 : 0}
              sx={
                !isPhoneScreen
                  ? {
                      justifyContent: "space-evenly",
                    }
                  : {
                      justifyContent: "space-between",
                      border: "0.2px solid",
                      borderColor: "#C3C3C3",
                      borderRadius: 2,
                      p: 2,
                    }
              }
            >
              <Typography
                sx={
                  !isPhoneScreen
                    ? { fontSize: 13, fontWeight: "bold" }
                    : {
                        fontSize: 17,
                        alignSelf: "center",
                        pl: 0,
                        fontWeight: 500,
                      }
                }
              >
                {formatter.format(
                  userMetricsData.data?.avg_transaction_amount || 0
                )}
              </Typography>
              <Typography
                sx={
                  !isPhoneScreen
                    ? { fontSize: 11, textAlign: "right" }
                    : { fontSize: 10, textAlign: "right", width: "40%" }
                }
              >
                Average transaction amount
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
export default UnsettledAmountCard;
