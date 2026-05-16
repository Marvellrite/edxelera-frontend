export type BackendError = {
  status: number;
  message: string;
  details?: unknown;
};