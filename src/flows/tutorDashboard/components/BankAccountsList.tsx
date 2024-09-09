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
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
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
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default BankAccountsList;
