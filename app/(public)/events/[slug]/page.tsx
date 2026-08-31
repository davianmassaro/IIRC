import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar, MapPin, Users, ArrowLeft, Share2,
  CheckCircle2, User,
} from "lucide-react";
import { featuredEvents } from "@/data/events";
import { getPublicEventById } from "@/lib/iirc-api";
import { RegisterButton } from "@/components/events/RegisterButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublicEventById(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.shortDesc ?? event.description,
  };
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(price: number) {
  if (price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getPublicEventById(slug);

  if (!event) notFound();

  const fillPercent = event.registeredCount
    ? Math.round((event.registeredCount / event.quota) * 100)
    : 0;
  const isSoldOut = fillPercent >= 100;
  const isAlmostFull = fillPercent >= 80 && !isSoldOut;

  return (
    <>
      <div className="pt-24 pb-4 bg-background border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Events
          </Link>
        </div>
      </div>

      <div className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Banner */}
              <div className="relative aspect-16/7 rounded-2xl overflow-hidden bg-linear-to-br from-primary/20 to-primary/5">
                {event.thumbnail ? (
                  <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Calendar className="h-20 w-20 text-primary/20" />
                  </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-background/90 text-foreground border-0">{event.category}</Badge>
                  {event.isOnline && <Badge variant="outline" className="bg-background/90">Online</Badge>}
                </div>
              </div>

              {/* Title & Meta */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.startDate)}
                    {event.endDate !== event.startDate && ` – ${formatDate(event.endDate)}`}
                  </div>
                  {event.venue && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.venue}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {event.registeredCount ?? 0}/{event.quota} peserta
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Tentang Program</h2>
                <p className="text-muted-foreground leading-relaxed">{event.description}</p>
              </div>

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Narasumber</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {event.speakers.map((speaker) => (
                      <div
                        key={speaker.name}
                        className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          {speaker.photo ? (
                            <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover rounded-full" />
                          ) : (
                            <User className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{speaker.name}</div>
                          <div className="text-xs text-primary">{speaker.title}</div>
                          <div className="text-xs text-muted-foreground">{speaker.company}</div>
                          {speaker.bio && (
                            <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                              {speaker.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What you'll get */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Yang Akan Anda Dapatkan</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Materi pembelajaran komprehensif",
                    "Sertifikat kelulusan digital",
                    "Networking dengan peserta lain",
                    "Akses recording / materi",
                    "Pre & post assessment",
                    "Konsultasi pasca program",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar — Registration Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="iirc-glass-card rounded-2xl p-6 space-y-5 shadow-xl">
                  {/* Price */}
                  <div>
                    {event.earlyBirdPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        {formatPrice(event.price)}
                      </div>
                    )}
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(event.earlyBirdPrice ?? event.price)}
                    </div>
                    {event.earlyBirdPrice && event.earlyBirdUntil && (
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 mt-1">
                        Early Bird hingga {new Date(event.earlyBirdUntil).toLocaleDateString("id-ID")}
                      </Badge>
                    )}
                  </div>

                  <Separator />

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />Tanggal
                      </span>
                      <span className="font-medium text-right max-w-45">
                        {formatDate(event.startDate)}
                      </span>
                    </div>
                    {event.venue && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" />Lokasi
                        </span>
                        <span className="font-medium text-right max-w-45">{event.venue}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Users className="h-4 w-4" />Kuota
                      </span>
                      <span className="font-medium">{event.quota} peserta</span>
                    </div>
                  </div>

                  {/* Fill bar */}
                  {event.registeredCount !== undefined && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{event.registeredCount} terdaftar</span>
                        <span>{event.quota - event.registeredCount} tersisa</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isSoldOut ? "bg-destructive" : isAlmostFull ? "bg-orange-500" : "bg-primary"
                          }`}
                          style={{ width: `${Math.min(fillPercent, 100)}%` }}
                        />
                      </div>
                      {isAlmostFull && !isSoldOut && (
                        <p className="text-xs text-orange-500 font-medium">Segera daftar — hampir penuh!</p>
                      )}
                    </div>
                  )}

                  <Separator />

                  {/* CTA */}
                  <RegisterButton
                    eventId={event.id}
                    eventTitle={event.title}
                    price={event.earlyBirdPrice ?? event.price}
                    slug={event.slug}
                    isSoldOut={isSoldOut}
                  />

                  <button className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="h-4 w-4" />
                    Bagikan Program
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
