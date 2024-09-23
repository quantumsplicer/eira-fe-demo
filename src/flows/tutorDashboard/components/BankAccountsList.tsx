import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  Stack,
  useMediaQuery,
} from "@mui/material";

interface BankAccount {
  accountNumber: string;
  ifscCode: string;
  isPrimary: boolean;
}

interface BankAccountsListProps {
  accounts: BankAccount[];
}

const BankAccountsList: React.FC<BankAccountsListProps> = ({ accounts }) => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>(
    accounts.find((account) => account.isPrimary)?.accountNumber
  );

  const handleSelectAccount = (accountNumber: string) => {
    setSelectedAccount(accountNumber);
  };

  return (
    <Box>
      <List>
        {accounts.map((account) => (
          <React.Fragment key={account.accountNumber}>
            <ListItem
              sx={
                !isPhoneScreen
                  ? {
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2,
                    }
                  : {
                      border: "0.2px solid",
                      borderColor: "#C3C3C3",
                      borderRadius: 2,
                      p: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }
              }
            >
              <Box>
                <Stack spacing={1}>
                  <Typography fontSize={18} fontWeight={550}>
                    {account.accountNumber}
                  </Typography>
                  <Typography color="#898989" fontWeight={500}>
                    {account.ifscCode}
                  </Typography>
                </Stack>
              </Box>
              {!isPhoneScreen ? (
                <></>
              ) : (
                <RadioGroup
                  value={selectedAccount}
                  onChange={() => handleSelectAccount(account.accountNumber)}
                >
                  <FormControlLabel
                    value={account.accountNumber}
                    control={<Radio />}
                    label=""
                    sx={{ margin: 0 }}
                  />
                </RadioGroup>
              )}
            </ListItem>
            {!isPhoneScreen ? <Divider /> : <></>}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default BankAccountsList;
