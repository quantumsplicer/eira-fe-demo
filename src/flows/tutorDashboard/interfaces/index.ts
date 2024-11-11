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
  tutor_phone?: string;
  tutor_first_name?: string;
  tutor_last_name?: string;
  student_phone?: string;
  student_first_name?: string;
  student_last_name?: string;
  payment_timestamp?: string;
}

export interface TransactionsResponse {
  limit: number;
  offset: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: Transaction[];
}

// New SessionResponse interface
export interface SessionDetails {
  id: string;
  start_time: string;
  end_time: string;
  duration: number;
  student_name: string;
  subject: string;
  status: string;
}

export interface SessionsResponse {
  limit: number;
  offset: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: SessionDetails[];
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
export interface CreateSessionLinkRequest {
  subject: string;
  amount: number;
  title: string;
  starttime: string;
  endtime: string;
  teacher_id: string;
  student_id: string;
}
