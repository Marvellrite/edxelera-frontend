import axios, {
  RawAxiosHeaders,
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type RawAxiosRequestHeaders,
} from "axios";
import env from "@/lib/constants/env";
import normalizeBackendError from "./error";
import { BackendError } from "./types";

type ApiClientOptions = {
  baseUrl?: string;
  headers?: RawAxiosRequestHeaders;
};

type RequestOptions = Omit<
  AxiosRequestConfig,
  "baseURL" | "data" | "url"
> & {
  body?: unknown;
  cookies?: string
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



    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw new HttpError(normalizeBackendError(error));
      },
    );
  }

  async request<TResponse>(path: string, options: RequestOptions = {}) {
    const { body, cookies, ...requestOptions } = options;

    const headers: RawAxiosRequestHeaders = {...(requestOptions.headers || {})}
    
    if(cookies) headers.cookie = cookies
   
    console.log('apiUrl ==>', env.apiUrl)

    const response = await this.client.request<TResponse>({
      url: path,
      data: body,
      ...requestOptions,
      headers,
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
  baseUrl: isServer? env.backendApiUrl : env.apiUrl,
});

export const http = apiClient;

