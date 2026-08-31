import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { adminGet, adminPost, BackendEvent } from "@/lib/iirc-api";

function toBackendDate(value?: string | null, fallbackTime = "09:00:00") {
  if (!value) return undefined;
  if (value.includes(":")) return value;
  return `${value} ${fallbackTime}`;
}

function mapEventPayload(body: Record<string, unknown>) {
  return {
    title: body.title,
    description: body.description ?? body.shortDesc ?? "-",
    location: body.location ?? body.venue ?? body.venueAddress ?? "Online",
    start_date: toBackendDate(body.startDate as string | undefined, "09:00:00") ?? body.start_date,
    end_date: toBackendDate(body.endDate as string | undefined, "17:00:00") ?? body.end_date,
    price: Number(body.price ?? 0),
    quota: Number(body.quota ?? 0),
    status:
      body.status ??
      (body.isPublished === true ? "open" : "draft"),
  };
}

async function getAdminToken() {
  const session = await auth();
  const token = (session?.user as { apiToken?: string } | undefined)?.apiToken;

  if (!token) {
    return null;
  }

  return token;
}

export async function GET() {
  const token = await getAdminToken();

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await adminGet<BackendEvent[]>("/admin/events", token);
  return NextResponse.json({ events: data, data });
}

export async function POST(req: NextRequest) {
  const token = await getAdminToken();

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const data = await adminPost<Record<string, unknown>>("/admin/events", token, mapEventPayload(body));

  return NextResponse.json({ success: true, data }, { status: 201 });
}
