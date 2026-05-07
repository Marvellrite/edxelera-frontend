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
      ...requestOptions,
      headers: {
        "Content-Type": "application/json",
        ...this.headers,
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json() as Promise<TResponse>;
  }

  get<TResponse>(path: string, options?: RequestOptions) {
    return this.request<TResponse>(path, { ...options, method: "GET" });
  }

  post<TResponse>(path: string, body: unknown, options?: RequestOptions) {
    return this.request<TResponse>(path, { ...options, method: "POST", body });
  }
}

export const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
