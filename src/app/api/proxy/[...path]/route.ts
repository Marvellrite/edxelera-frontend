import { NextRequest, NextResponse } from "next/server";

const fallbackBackendUrl = "http://192.168.10.20:8000";

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
  const backendBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL?.trim() || fallbackBackendUrl;
  const backendUrl = new URL(
    path.map(encodeURIComponent).join("/"),
    ensureTrailingSlash(backendBaseUrl),
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
    responseHeaders.append("Set-Cookie", stripDomainFromSetCookie(setCookie));
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
