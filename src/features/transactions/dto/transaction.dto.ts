export type TransactionDto = {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "successful" | "failed";
  createdAt: string;
};
