import { ACCESS_TOKEN_COOKIE } from "@/lib/auth-cookies";
import { env } from "@/config/env";

type ApiClientOptions = {
  baseUrl?: string;
  headers?: HeadersInit;
};

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

class ApiClient {
  private readonly baseUrl: string;

  private readonly headers: HeadersInit;

  constructor({ baseUrl = "", headers = {} }: ApiClientOptions = {}) {
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
        ...getAuthHeader(),
        ...this.headers,
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
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

  patch<TResponse>(path: string, body: unknown, options?: RequestOptions) {
    return this.request<TResponse>(path, { ...options, method: "PATCH", body });
  }
}

export const apiClient = new ApiClient({
  baseUrl: env.apiUrl,
});

function getAuthHeader(): HeadersInit {
  if (typeof document === "undefined") {
    return {};
  }

  const accessToken = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${ACCESS_TOKEN_COOKIE}=`))
    ?.split("=")[1];

  if (!accessToken) {
    return {};
  }

  return {
    Authorization: `Bearer ${decodeURIComponent(accessToken)}`,
  };
}
