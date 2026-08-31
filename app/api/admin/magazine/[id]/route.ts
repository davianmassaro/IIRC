import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { adminDelete, adminPut } from "@/lib/iirc-api";

type RouteContext = {
  params: Promise<{ id: string }>;
};

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

function mapToItem(body: Record<string, unknown>, id: string) {
  return {
    id,
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

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const token = await getAdminToken();
  if (!token) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ message: "Invalid JSON" }, { status: 400 }); }

  try {
    await adminPut(`/admin/magazines/${id}`, token, mapToBackend(body));
    return NextResponse.json({ item: mapToItem(body, id) });
  } catch (err) {
    return NextResponse.json({ message: err instanceof Error ? err.message : "Gagal menyimpan" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const token = await getAdminToken();
  if (!token) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await adminDelete(`/admin/magazines/${id}`, token);
  return NextResponse.json({ message: "Edisi majalah berhasil dihapus" });
}
