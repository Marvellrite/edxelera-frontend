import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type RawAxiosRequestHeaders,
} from "axios";
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

const isServer = typeof window === "undefined"

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
  console.log("🔥 Axios request interceptor:", config.method, config.url);
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
   
    console.log('apiUrl ==>', env.apiUrl)

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
    console.log("GET Method Called", path)
    return this.request<TResponse>(path, { ...options, method: "GET" });
  }
  
  post<TResponse>(path: string, body: unknown, options?: RequestOptions) {
    console.log("POST Method called", path)
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
  baseUrl: isServer? '' : env.apiUrl,
});

export const http = apiClient;


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
