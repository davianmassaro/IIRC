import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { adminGet, adminPost } from "@/lib/iirc-api";

async function getAdminToken() {
  const session = await auth();
  return (session?.user as { apiToken?: string } | undefined)?.apiToken ?? null;
}

function toBackendDate(value?: string) {
  if (!value) return null;
  return value.includes(":") ? value : `${value} 00:00:00`;
}

function mapToBackend(body: Record<string, unknown>) {
  return {
    title: body.title,
    edition: body.edition ?? null,
    description: body.description ?? null,
    cover_image: body.cover ?? null,
    file_url: body.fileUrl ?? null,
    is_published: Boolean(body.isPublished),
    published_at: toBackendDate(body.publishedAt as string | undefined),
  };
}

function mapToItem(body: Record<string, unknown>, id: string | number) {
  return {
    id: String(id),
    title: body.title,
    edition: body.edition ?? "",
    description: body.description ?? null,
    cover: body.cover ?? null,
    fileUrl: body.fileUrl ?? null,
    isPublished: Boolean(body.isPublished),
    publishedAt: (body.publishedAt as string) ?? new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
}

export async function GET() {
  const token = await getAdminToken();
  if (!token) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const items = await adminGet<any[]>("/admin/magazines", token);
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const token = await getAdminToken();
  if (!token) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ message: "Invalid JSON" }, { status: 400 }); }

  if (!String(body.title ?? "").trim() || !String(body.edition ?? "").trim()) {
    return NextResponse.json({ message: "Judul dan edisi wajib diisi" }, { status: 400 });
  }

  try {
    const result = await adminPost<{ magazine_id: number }>("/admin/magazines", token, mapToBackend(body));
    return NextResponse.json({ item: mapToItem(body, result.magazine_id) }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err instanceof Error ? err.message : "Gagal menyimpan" }, { status: 400 });
  }
}
