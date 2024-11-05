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
  account_number: string;
  account_number_trimmed: string;
  id: string;
  ifsc: string;
  is_primary: boolean;
  name_on_bank: string;
}

interface BankAccountsListProps {
  accounts: BankAccount[];
}

const BankAccountsList: React.FC<BankAccountsListProps> = ({ accounts }) => {
  const isPhoneScreen = useMediaQuery("(max-width:600px)");
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>(
    accounts.find((account) => account.is_primary)?.account_number
  );

  const handleSelectAccount = (account_number: string) => {
    setSelectedAccount(account_number);
  };

  const getMaskedAccountNumber = (accountNumber:  string) => {
    const maskedPart = accountNumber.slice(0, -4).replace(/./g, '*');
    return maskedPart + accountNumber.slice(-4);
  }

  return (
    <Box>
      <List>
        {accounts.map((account) => (
          <React.Fragment key={account.account_number}>
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
                    {getMaskedAccountNumber(account.account_number)}
                  </Typography>
                  <Typography color="#898989" fontWeight={500}>
                    {account.ifsc}
                  </Typography>
                </Stack>
              </Box>
              {!isPhoneScreen ? (
                <></>
              ) : (
                <RadioGroup
                  value={selectedAccount}
                  onChange={() => handleSelectAccount(account.account_number)}
                >
                  <FormControlLabel
                    value={account.account_number}
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
