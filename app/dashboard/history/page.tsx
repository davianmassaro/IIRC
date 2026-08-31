import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CheckCircle2, MapPin, Clock, Star, Award, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

const mockHistory = [
  {
    id: "hist-001",
    title: "Leadership Excellence Forum 2024",
    category: "Leadership Development",
    date: "10–11 Maret 2024",
    venue: "The Ritz-Carlton Jakarta",
    attendanceStatus: "ATTENDED",
    rating: 5,
    hasCertificate: true,
  },
  {
    id: "hist-002",
    title: "Strategic Management Workshop",
    category: "Corporate Training",
    date: "28 Juni 2024",
    venue: "IIRC Learning Center",
    attendanceStatus: "ATTENDED",
    rating: 4,
    hasCertificate: true,
  },
  {
    id: "hist-003",
    title: "ESG Certification Batch 1",
    category: "ESG & Sustainability",
    date: "5–7 September 2024",
    venue: "Grand Mercure Jakarta",
    attendanceStatus: "NOT_ATTENDED",
    rating: null,
    hasCertificate: false,
  },
];

export default async function HistoryPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const attended = mockHistory.filter((h) => h.attendanceStatus === "ATTENDED").length;
  const withCerts = mockHistory.filter((h) => h.hasCertificate).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Riwayat Event</h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Semua event yang pernah Anda ikuti
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Event", value: mockHistory.length.toString(), icon: Clock, color: "text-primary", bg: "bg-primary/10" },
          { label: "Hadir", value: attended.toString(), icon: CheckCircle2, color: "text-green-600 dark:text-green-400", bg: "bg-green-500/10" },
          { label: "Sertifikat", value: withCerts.toString(), icon: Award, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-500/10" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* History List */}
      <div className="space-y-4">
        {mockHistory.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-all"
          >
            <div className={`h-1 ${item.attendanceStatus === "ATTENDED" ? "bg-green-500" : "bg-muted-foreground/30"}`} />
            <div className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                      {item.category}
                    </Badge>
                    {item.attendanceStatus === "ATTENDED" ? (
                      <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                        Hadir
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] bg-muted text-muted-foreground">
                        Tidak Hadir
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-semibold text-base leading-snug">{item.title}</h3>

                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {item.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.venue}
                    </div>
                  </div>

                  {/* Rating */}
                  {item.rating && (
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < item.rating! ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground/30"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">Rating Anda</span>
                    </div>
                  )}
                </div>

                {/* Certificate */}
                {item.hasCertificate && (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-sm font-medium hover:bg-yellow-500/20 transition-colors shrink-0">
                    <Award className="h-4 w-4" />
                    Unduh Sertifikat
                    <Download className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {mockHistory.length === 0 && (
        <div className="text-center py-20 space-y-4">
          <Clock className="h-16 w-16 text-muted-foreground/30 mx-auto" />
          <h3 className="font-semibold text-lg">Belum ada riwayat</h3>
          <p className="text-muted-foreground text-sm">Riwayat event yang sudah lewat akan muncul di sini.</p>
        </div>
      )}
    </div>
  );
}
