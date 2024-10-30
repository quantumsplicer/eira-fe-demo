import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TransactionsTable from "./tables/TransactionsTable";
import PaymentLinksTable from "./tables/PaymentLinksTable";
import SendPaymentLinkFlow from "./flows/SendPaymentLinkFlow";
import { useGetPaymentLinksQuery } from "../../../APIs/definitions/paymentLinks";
const lightTheme = createTheme({ palette: { mode: "light" } });

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const TabbedDataTableContainer: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [paymentLinkFlowActive, setPaymentLinkFlowActive] = useState(false);
  const [paymentLinkCreated, setPaymentLinkCreated] = useState(false);
  const [value, setValue] = useState(0);
  const { data, isLoading, isSuccess, isError, error } =
    useGetPaymentLinksQuery();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  useEffect(() => {
    if (isSuccess) {
      setPaymentLinkCreated(true);
    }
  }, [isSuccess]);
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Box
          width="fullwidth"
          my={4}
          gap={4}
          p={2}
          sx={
            !isPhoneScreen
              ? {
                  boxShadow: 8,
                  backgroundColor: "white",
                  borderRadius: 2,
                  height: "fullheight",
                }
              : { backgroundColor: "white", minHeight: "60vh" }
          }
        >
          <Stack spacing={2}>
            <Stack direction="row">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between", // Distribute space between children
                  width: "100%", // Ensure the Box takes full width of its parent
                  padding: 2, // Optional: Adjust padding as needed
                }}
              >
                <Stack direction="column" width="100%" spacing={2}>
                  {isPhoneScreen ? (
                    <Button
                      variant="contained"
                      onClick={() => setPaymentLinkFlowActive(true)}
                      sx={{
                        backgroundColor: "#507FFD",
                        borderRadius: 5,
                        fontSize: "0.7rem",
                        width: "12rem",
                        fontWeight: "bold",
                        height: 40,
                        paddingLeft: 1,
                        paddingRight: 1,
                        textTransform: "none",
                        alignSelf: "flex-end",
                      }}
                    >
                      Create a Payment Link
                    </Button>
                  ) : (
                    <></>
                  )}
                  <Stack
                    direction="row"
                    spacing={2}
                    width="100%"
                    justifyContent="space-between"
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab
                        label={
                          <Typography
                            fontSize={isPhoneScreen ? "0.75rem" : "0.9rem"}
                            sx={{ textTransform: "none" }}
                          >
                            Transactions History
                          </Typography>
                        }
                        {...a11yProps(0)}
                      />
                      <Tab
                        label={
                          <Typography
                            fontSize={isPhoneScreen ? "0.75rem" : "0.9rem"}
                            sx={{ textTransform: "none" }}
                          >
                            Payment Links
                          </Typography>
                        }
                        {...a11yProps(1)}
                      />
                    </Tabs>
                    {!isPhoneScreen ? (
                      <Button
                        variant="contained"
                        onClick={() => setPaymentLinkFlowActive(true)}
                        sx={{
                          backgroundColor: "#507FFD",
                          borderRadius: 3,
                          fontSize: "1rem",
                          fontWeight: "bold",
                          height: 45,
                          paddingLeft: 3,
                          paddingRight: 3,
                          textTransform: "none",
                        }}
                      >
                        Create a Payment Link
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Stack>
                </Stack>
              </Box>
            </Stack>
            <CustomTabPanel value={value} index={0}>
              <TransactionsTable paymentLinkCreated={paymentLinkCreated} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <PaymentLinksTable data={data} />
            </CustomTabPanel>
          </Stack>
        </Box>
      </ThemeProvider>
      {paymentLinkFlowActive && (
        <SendPaymentLinkFlow
          isActive={paymentLinkFlowActive}
          onClose={() => setPaymentLinkFlowActive(false)}
        />
      )}
    </>
  );
};

export default TabbedDataTableContainer;
