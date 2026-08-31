import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { adminDelete, adminGet, adminPut, BackendEvent } from "@/lib/iirc-api";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function toBackendDate(value?: string | null, fallbackTime = "09:00:00") {
  if (!value) return undefined;
  if (value.includes(":")) return value;
  return `${value} ${fallbackTime}`;
}

function mapEventPayload(body: Record<string, unknown>) {
  const payload: Record<string, unknown> = {};

  if (body.title !== undefined) payload.title = body.title;
  if (body.description !== undefined) payload.description = body.description;
  if (body.venue !== undefined || body.location !== undefined) payload.location = body.location ?? body.venue;
  if (body.startDate !== undefined || body.start_date !== undefined) payload.start_date = toBackendDate(body.startDate as string | undefined, "09:00:00") ?? body.start_date;
  if (body.endDate !== undefined || body.end_date !== undefined) payload.end_date = toBackendDate(body.endDate as string | undefined, "17:00:00") ?? body.end_date;
  if (body.price !== undefined) payload.price = Number(body.price);
  if (body.quota !== undefined) payload.quota = Number(body.quota);
  if (body.status !== undefined) payload.status = body.status;
  if (body.isPublished !== undefined) payload.status = body.isPublished ? "open" : "draft";

  return payload;
}

async function getAdminToken() {
  const session = await auth();
  return (session?.user as { apiToken?: string } | undefined)?.apiToken ?? null;
}

export async function GET(_req: NextRequest, context: RouteContext) {
  const token = await getAdminToken();

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const data = await adminGet<BackendEvent>(`/admin/events/${id}`, token);
  return NextResponse.json({ event: data, data });
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  const token = await getAdminToken();

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await req.json();
  const data = await adminPut<Record<string, unknown>>(`/admin/events/${id}`, token, mapEventPayload(body));
  return NextResponse.json({ success: true, data });
}

export async function PUT(req: NextRequest, context: RouteContext) {
  return PATCH(req, context);
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  const token = await getAdminToken();

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const data = await adminDelete<Record<string, unknown>>(`/admin/events/${id}`, token);
  return NextResponse.json({ success: true, data });
}
