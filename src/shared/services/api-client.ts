import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type RawAxiosRequestHeaders,
} from "axios";
import { tokenService } from "@/shared/services/token.service";
import env from "@/shared/constants/env";

type ApiClientOptions = {
  baseUrl?: string;
  headers?: RawAxiosRequestHeaders;
};

type RequestOptions = Omit<
  AxiosRequestConfig,
  "baseURL" | "data" | "url"
> & {
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

class ApiClient {
  private readonly client: AxiosInstance;

  constructor({ baseUrl = "", headers = {} }: ApiClientOptions = {}) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        "x-client-type": "web",
        ...headers,
      },
      withCredentials: true,
    });

    this.client.interceptors.request.use((config) => {
      const authHeader = getAuthHeader();

      if (authHeader.Authorization) {
        config.headers.Authorization = authHeader.Authorization;
      }

      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw new HttpError(normalizeBackendError(error));
      },
    );
  }

  async request<TResponse>(path: string, options: RequestOptions = {}) {
    const { body, ...requestOptions } = options;
    const response = await this.client.request<TResponse>({
      url: path,
      data: body,
      ...requestOptions,
    });

    if (response.status === 204) {
      return undefined as TResponse;
    }

    return response.data;
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

export const apiClient = new ApiClient({
  baseUrl: env.apiUrl,
});

export const http = apiClient;

function getAuthHeader() {
  const accessToken = tokenService.getAccessToken();

  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

function normalizeBackendError(error: AxiosError): BackendError {
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
