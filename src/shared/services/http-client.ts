import env from "@/shared/constants/env";
import { tokenService } from "@/shared/services/token.service";

type HttpClientOptions = {
  baseUrl?: string;
  headers?: HeadersInit;
};

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export type BackendError = {
  status: number;
  message: string;
  details?: unknown;
};

export class HttpError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(error: BackendError) {
    super(error.message);
    this.name = "HttpError";
    this.status = error.status;
    this.details = error.details;
  }
}

class HttpClient {
  private readonly baseUrl: string;
  private readonly headers: HeadersInit;

  constructor({ baseUrl = "", headers = {} }: HttpClientOptions = {}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  async request<TResponse>(path: string, options: RequestOptions = {}) {
    const { body, headers, ...requestOptions } = options;
    const response = await fetch(`${this.baseUrl}${path}`, {
      credentials: "include",
      ...requestOptions,
      headers: {
        "Content-Type": "application/json",
        "x-client-type": "web",
        ...getAuthHeader(),
        ...this.headers,
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new HttpError(await normalizeBackendError(response));
    }

    if (response.status === 204) {
      return undefined as TResponse;
    }

    return response.json() as Promise<TResponse>;
  }

  get<TResponse>(path: string, options?: RequestOptions) {
    return this.request<TResponse>(path, { ...options, method: "GET" });
  }

  post<TResponse>(path: string, body: unknown, options?: RequestOptions) {
    return this.request<TResponse>(path, { ...options, method: "POST", body });
  }

  put<TResponse>(path: string, body: unknown, options?: RequestOptions) {
    return this.request<TResponse>(path, { ...options, method: "PUT", body });
  }

  patch<TResponse>(path: string, body: unknown, options?: RequestOptions) {
    return this.request<TResponse>(path, { ...options, method: "PATCH", body });
  }

  delete<TResponse>(path: string, options?: RequestOptions) {
    return this.request<TResponse>(path, { ...options, method: "DELETE" });
  }
}

export const http = new HttpClient({
  baseUrl: env.apiUrl,
});

export const apiClient = http;

function getAuthHeader(): HeadersInit {
  const accessToken = tokenService.getAccessToken();

  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

async function normalizeBackendError(response: Response): Promise<BackendError> {
  const details = await readErrorDetails(response);
  const message =
    getErrorMessage(details) ?? `API request failed with status ${response.status}`;

  return {
    status: response.status,
    message,
    details,
  };
}

async function readErrorDetails(response: Response) {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json().catch(() => undefined);
  }

  return response.text().catch(() => undefined);
}

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
