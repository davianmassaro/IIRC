import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getApiBaseUrl } from "@/lib/iirc-api";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function proxy(req: NextRequest, context: RouteContext) {
  const params = await context.params;
  const path = params.path.join("/");
  const targetUrl = `${getApiBaseUrl()}/${path}${req.nextUrl.search}`;

  const headers = new Headers();
  headers.set("Accept", "application/json");

  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);

  const incomingAuthorization = req.headers.get("authorization");
  if (incomingAuthorization) {
    headers.set("Authorization", incomingAuthorization);
  }

  if (path.startsWith("admin/") && path !== "admin/login") {
    const session = await auth();
    const token = (session?.user as { apiToken?: string } | undefined)?.apiToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const body = ["GET", "HEAD"].includes(req.method) ? undefined : await req.text();

  const backendResponse = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
    cache: "no-store",
  });

  const responseText = await backendResponse.text();

  return new NextResponse(responseText, {
    status: backendResponse.status,
    headers: {
      "Content-Type": backendResponse.headers.get("content-type") ?? "application/json",
    },
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
