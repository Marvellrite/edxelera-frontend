;import type { AxiosResponse, AxiosError, } from "axios";
import { BackendError } from "./types";

function getErrorMessage(details: unknown) {
  if (typeof details === "string" && details.trim()) {
    return details;
  }

  if (typeof details === "object" && details !== null) {
    const maybeMessage = "message" in details ? details.message : undefined;
    const maybeError = "error" in details ? details.error : undefined;

    if (typeof maybeMessage === "string") {
      return maybeMessage;
    }

    if (typeof maybeError === "string") {
      return maybeError;
    }
  }

  return undefined;
}


export default function normalizeBackendError(error: AxiosError): BackendError {
  const response = error.response as AxiosResponse<unknown> | undefined;
  const details = response?.data;
  const status = response?.status ?? 0;
  const message =
    getErrorMessage(details) ??
    error.message ??
    `API request failed with status ${status}`;

  return {
    status,
    message,
    details,
  };
}

