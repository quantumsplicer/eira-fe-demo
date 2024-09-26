import * as React from "react";
import Box from "@mui/material/Box";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import BankAccountsList from "./BankAccountsList";
import { useState } from "react";
import AddBankAccountDialog from "../dialogs/AddBankAccountDialog";

interface BankAccount {
  accountNumber: string;
  ifscCode: string;
  isPrimary: boolean;
}

const accountsData: BankAccount[] = [
  { accountNumber: "*******7890", ifscCode: "IFSC001", isPrimary: true },
];
const AccountsListCard: React.FC = () => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [activeDialog, setActiveDialog] = useState<string>("None");
  // const openDialog = () => {
  //   console.log("This function was triggered");
  //   setActiveDialog("AddBankAccountDialog");
  // };
  return (
    <Box
      sx={
        !isPhoneScreen
          ? {
              borderRadius: 2,
              width: "100%",
              height: 550,
              backgroundColor: "white",
              boxShadow: 6,
              display: "flex",
              justifyContent: "center",
            }
          : {
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              pt: 5,
              pb: 5,
            }
      }
    >
      <Stack
        sx={
          !isPhoneScreen
            ? {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                p: 4,
              }
            : {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                p: 2,
              }
        }
      >
        <Stack spacing={4} pl={2} pt={1}>
          <Stack>
            <Typography fontSize={22} fontWeight={550}>
              Account
            </Typography>
            {!isPhoneScreen ? (
              <Typography color="#898989" fontWeight={550}>
                Your active account for settlements
              </Typography>
            ) : (
              <></>
            )}
          </Stack>
          <Stack pl={!isPhoneScreen ? 0.5 : 0}>
            <BankAccountsList accounts={accountsData} />
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ justifyContent: "flex-end" }} spacing={4}>
          {/* <Button
            variant="outlined"
            sx={{
              fontSize: 14,
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              pl: 3,
              pr: 3,
            }}
          >
            Save Changes
          </Button> */}
          {/* <Button
            variant="contained"
            sx={{
              backgroundColor: "#507FFD",
              borderRadius: 2,
              pt: 1.3,
              pb: 1.3,
              pl: 3,
              pr: 3,
            }}
            onClick={openDialog}
          >
            <Stack direction="row" alignContent="center" spacing={1}>
              <AccountBalanceOutlinedIcon />
              <Typography
                sx={{ fontSize: 14, textTransform: "none" }}
                fontWeight={600}
                pt={0.4}
              >
                Add Bank Account
              </Typography>
            </Stack>
          </Button> */}
        </Stack>
      </Stack>

      <AddBankAccountDialog
        activeDialog={activeDialog}
        setActiveDialog={setActiveDialog}
      />
    </Box>
  );
};
export default AccountsListCard;
