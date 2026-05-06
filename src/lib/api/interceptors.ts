export function withAuthHeader(headers: HeadersInit = {}, token?: string) {
  if (!token) {
    return headers;
  }

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
}
