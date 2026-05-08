import { NextRequest, NextResponse } from "next/server";

import env from "@/config/env";

const proxyCookiePath = "/api/proxy";
const rootPathCookieNames = new Set(["access_token", "reset_token"]);

type ProxyRouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

type HeadersWithSetCookie = Headers & {
  getSetCookie?: () => string[];
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const stripDomainFromSetCookie = (setCookie: string) =>
  setCookie.replace(/;\s*domain=[^;]+/gi, "");

const getSetCookieName = (setCookie: string) =>
  setCookie.split(";", 1)[0]?.split("=", 1)[0]?.trim();

const getCookiePath = (setCookie: string) =>
  rootPathCookieNames.has(getSetCookieName(setCookie) ?? "")
    ? "/"
    : proxyCookiePath;

const rewritePathInSetCookie = (setCookie: string) => {
  const cookiePath = getCookiePath(setCookie);

  if (/;\s*path=/i.test(setCookie)) {
    return setCookie.replace(/;\s*path=[^;]+/i, `; Path=${cookiePath}`);
  }

  return `${setCookie}; Path=${cookiePath}`;
};

const normalizeSetCookie = (setCookie: string) =>
  rewritePathInSetCookie(stripDomainFromSetCookie(setCookie));

async function proxyRequest(req: NextRequest, context: ProxyRouteContext) {
  const backendUrl = await createBackendUrl(req, context);
  const headers = createForwardHeaders(req);
  const body = shouldForwardBody(req.method) ? await req.arrayBuffer() : null;

  const backendResponse = await fetch(backendUrl, {
    method: req.method,
    headers,
    body,
    redirect: "manual",
  });

  const responseHeaders = createResponseHeaders(backendResponse.headers);

  return new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders,
  });
}

async function createBackendUrl(req: NextRequest, context: ProxyRouteContext) {
  const { path } = await context.params;
  const backendUrl = new URL(
    path.map(encodeURIComponent).join("/"),
    ensureTrailingSlash(env.backendUrl),
  );

  backendUrl.search = req.nextUrl.search;

  return backendUrl;
}

function createForwardHeaders(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.delete("host");

  return headers;
}

function createResponseHeaders(headers: Headers) {
  const responseHeaders = new Headers(headers);
  responseHeaders.delete("set-cookie");

  for (const setCookie of getSetCookieHeaders(headers)) {
    responseHeaders.append("Set-Cookie", normalizeSetCookie(setCookie));
  }

  return responseHeaders;
}

function getSetCookieHeaders(headers: Headers) {
  return (headers as HeadersWithSetCookie).getSetCookie?.() ?? [];
}

function shouldForwardBody(method: string) {
  return method !== "GET" && method !== "HEAD";
}

function ensureTrailingSlash(url: string) {
  return url.endsWith("/") ? url : `${url}/`;
}

export function GET(req: NextRequest, context: ProxyRouteContext) {
  return proxyRequest(req, context);
}

export function POST(req: NextRequest, context: ProxyRouteContext) {
  return proxyRequest(req, context);
}

export function PUT(req: NextRequest, context: ProxyRouteContext) {
  return proxyRequest(req, context);
}

export function PATCH(req: NextRequest, context: ProxyRouteContext) {
  return proxyRequest(req, context);
}

export function DELETE(req: NextRequest, context: ProxyRouteContext) {
  return proxyRequest(req, context);
}
