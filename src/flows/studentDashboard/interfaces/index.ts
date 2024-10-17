import { Dayjs } from "dayjs";

export interface PaymentDetails {
  phoneNumber: string;
  amount: number;
}

export interface TutorDetails {
  firstName: string;
  lastName: string;
  panNumber: string;
  phoneNumber: string;
}

export interface SessionDetails {
  sessionTitle: string;
  description: string;
  date: Dayjs | null;
  startTime: Dayjs | null;
  endTime: Dayjs | null;
}

export interface UserMetrics {
  user_id: string;
  unsettled_amount: number;
  txn_since_last_settlement: number;
  avg_transaction_amount: number;
}
