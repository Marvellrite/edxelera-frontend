export const ACCESS_TOKEN_COOKIE = "access_token";

const maxAgeSeconds = 60 * 60 * 24 * 7;

export const tokenService = {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
};

export function getAccessToken() {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((currentCookie) =>
      currentCookie.startsWith(`${ACCESS_TOKEN_COOKIE}=`),
    );

  return cookie ? decodeURIComponent(cookie.split("=")[1] ?? "") : null;
}

export function setAccessToken(token: string) {
  document.cookie = [
    `${ACCESS_TOKEN_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${maxAgeSeconds}`,
    "SameSite=Lax",
    location.protocol === "https:" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function clearAccessToken() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = [
    `${ACCESS_TOKEN_COOKIE}=`,
    "Path=/",
    "Max-Age=0",
    "SameSite=Lax",
    location.protocol === "https:" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export const setAccessTokenCookie = setAccessToken;
