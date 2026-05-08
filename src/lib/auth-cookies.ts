export const ACCESS_TOKEN_COOKIE = "access_token";

const maxAgeSeconds = 60 * 60 * 24 * 7;

export function setAccessTokenCookie(token: string) {
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
