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

function mapToBackend(body: Record<string, unknown>) {
  return {
    title: body.title,
    description: body.description ?? null,
    video_url: body.embedUrl,
    thumbnail: body.thumbnail ?? null,
    is_published: Boolean(body.isPublished),
  };
}

function mapToItem(body: Record<string, unknown>, id: string) {
  return {
    id,
    title: body.title,
    description: body.description ?? null,
    embedUrl: body.embedUrl,
    thumbnail: body.thumbnail ?? null,
    isPublished: Boolean(body.isPublished),
    eventTitle: null,
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
    await adminPut(`/admin/videos/${id}`, token, mapToBackend(body));
    return NextResponse.json({ item: mapToItem(body, id) });
  } catch (err) {
    return NextResponse.json({ message: err instanceof Error ? err.message : "Gagal menyimpan" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const token = await getAdminToken();
  if (!token) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { id } = await params;
  await adminDelete(`/admin/videos/${id}`, token);
  return NextResponse.json({ message: "Video berhasil dihapus" });
}
