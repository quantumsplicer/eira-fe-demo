import { Box, Drawer, IconButton } from "@mui/material";
import { Transaction } from "../../tutorDashboard/interfaces";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import TransactionSummary from "../../../components/TransactionSummary";
export interface PaymentItemDrawerProps {
  transaction: Transaction;
  open: boolean;
  onClose: () => void;
  role?: "student" | "tutor";
}

export const PaymentItemDrawer = ({
  open,
  transaction,
  onClose,
  role = "tutor",
}: PaymentItemDrawerProps) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        width: "100%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          padding: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          width: "100%",
          boxSizing: "border-box",
        },
      }}
      anchor="bottom"
    >
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <TransactionSummary
        amount={transaction.amount.toString()}
        name={
          role === "tutor"
            ? transaction.student_first_name +
              " " +
              transaction.student_last_name
            : transaction.tutor_first_name + " " + transaction.tutor_last_name
        }
        transactionItem={transaction}
        paymentDetails={transaction as unknown as Record<string, string>}
        role={role === "tutor" ? "receiver" : "sender"}
      />
    </Drawer>
  );
};
