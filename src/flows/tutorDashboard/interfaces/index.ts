export interface PaymentLinkInput {
  phoneNumber: string;
  email: string;
  amount: number;
}
export interface Transaction {
  id: string;
  amount: number;
  created: string;
  settlement_timestamp: string | null;
  settlement_status: string;
  payment_mode: string;
  status: string;
  student_phone: string;
  student_name: string;
}

export interface TransactionsResponse {
  limit: number;
  offset: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: Transaction[];
}
export interface PaymentLinkDetails {
  id: string;
  created: string;
  updated: string;
  deleted: string | null;
  url: string;
  amount: string;
  order_id: string;
  receiver_phone: string;
  status: string;
  expiry_timestamp: string | null;
  creator: string;
  payer: string | null;
}
