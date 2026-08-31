import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { adminGet, BackendEvent } from "@/lib/iirc-api";
import { EventEditForm } from "@/components/admin/EventEditForm";

export const dynamic = "force-dynamic";

function toDateInput(value?: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/admin/events");

  const role = session.user.role as string | undefined;
  if (!["ADMIN", "SUPER_ADMIN"].includes(role ?? "")) redirect("/admin");

  const token = (session.user as { apiToken?: string }).apiToken;
  if (!token) redirect("/login?callbackUrl=/admin/events");

  const { id } = await params;

  let event: BackendEvent | null = null;
  try {
    event = await adminGet<BackendEvent>(`/admin/events/${id}`, token);
  } catch {
    event = null;
  }

  if (!event) notFound();

  const initialData = {
    title: event.title,
    slug: String(event.id),
    description: event.description ?? "",
    shortDesc: event.description?.slice(0, 160) ?? "",
    category: "Public Program",
    type: "public",
    startDate: toDateInput(event.start_date),
    endDate: toDateInput(event.end_date),
    venue: event.location ?? "",
    venueAddress: event.location ?? "",
    isOnline: false,
    meetingLink: "",
    quota: String(event.quota ?? 0),
    price: String(Number(event.price ?? 0)),
    earlyBirdPrice: "",
    earlyBirdUntil: "",
    tags: "IIRC, Training",
    isPublished: event.status === "open" || event.status === "published",
    isFeatured: event.status === "open" || event.status === "published",
  };

  return <EventEditForm eventId={id} initialData={initialData} />;
}
