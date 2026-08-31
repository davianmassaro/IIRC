import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { adminGet, adminPost } from "@/lib/iirc-api";

async function getAdminToken() {
  const session = await auth();
  return (session?.user as { apiToken?: string } | undefined)?.apiToken ?? null;
}

function mapToBackend(body: Record<string, unknown>) {
  return {
    title: body.title,
    description: body.caption ?? null,
    image_url: body.imageUrl,
    drive_url: body.driveUrl ?? null,
    display_order: Number(body.order ?? 0),
    is_published: Boolean(body.isPublished),
    event_id: body.eventId || null,
  };
}

function mapToItem(body: Record<string, unknown>, id: string | number) {
  return {
    id: String(id),
    title: body.title,
    imageUrl: body.imageUrl,
    driveUrl: body.driveUrl ?? null,
    caption: body.caption ?? null,
    order: Number(body.order ?? 0),
    isPublished: Boolean(body.isPublished),
    eventTitle: null,
    createdAt: new Date().toISOString(),
  };
}

export async function GET() {
  const token = await getAdminToken();
  if (!token) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const items = await adminGet<any[]>("/admin/gallery", token);
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const token = await getAdminToken();
  if (!token) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ message: "Invalid JSON" }, { status: 400 }); }

  if (!String(body.title ?? "").trim() || !String(body.imageUrl ?? "").trim()) {
    return NextResponse.json({ message: "Title dan image URL wajib diisi" }, { status: 400 });
  }

  try {
    const result = await adminPost<{ gallery_id: number }>("/admin/gallery", token, mapToBackend(body));
    return NextResponse.json({ item: mapToItem(body, result.gallery_id) }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err instanceof Error ? err.message : "Gagal menyimpan" }, { status: 400 });
  }
}
