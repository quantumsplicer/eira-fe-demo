import { Box, Drawer, IconButton } from "@mui/material";
import { Transaction } from "../../tutorDashboard/interfaces";
import CloseIcon from "@mui/icons-material/Close";
import PaymentInfo from "../../../components/PaymentInfo";

export interface PaymentItemDrawerProps {
  transaction: Transaction;
  open: boolean;
  onClose: () => void;
}

export const PaymentItemDrawer = ({
  open,
  transaction,
  onClose,
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
      <PaymentInfo
        amount={transaction.amount.toString()}
        name={transaction.student_name as string}
        transactionItem={transaction}
        paymentDetails={transaction as unknown as Record<string, string>}
        type="success"
      />
    </Drawer>
  );
};
