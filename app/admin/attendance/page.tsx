import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAdminAttendance } from "@/lib/iirc-api";
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

interface AttendanceRow {
  id: string;
  participant: string;
  email: string;
  event: string;
  status: string;
  scannedAt: string | null;
  scannedBy: string | null;
}

const statusMap: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    class: string;
  }
> = {
  ATTENDED: {
    label: "Hadir",
    icon: CheckCircle2,
    class:
      "bg-green-500/10 text-green-600 border-green-500/20",
  },

  PRESENT: {
    label: "Hadir",
    icon: CheckCircle2,
    class:
      "bg-green-500/10 text-green-600 border-green-500/20",
  },

  NOT_ATTENDED: {
    label: "Belum Hadir",
    icon: Clock,
    class:
      "bg-muted text-muted-foreground",
  },

  ABSENT: {
    label: "Belum Hadir",
    icon: Clock,
    class:
      "bg-muted text-muted-foreground",
  },

  DUPLICATE_ATTEMPT: {
    label: "Duplikat",
    icon: XCircle,
    class:
      "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },

  INVALID: {
    label: "Invalid",
    icon: AlertCircle,
    class:
      "bg-red-500/10 text-red-600 border-red-500/20",
  },
};


export default async function AdminAttendancePage() {

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }


  const token = (
    session.user as {
      apiToken?: string;
    }
  ).apiToken;


  let rows: AttendanceRow[] = [];


  try {

    const data = await getAdminAttendance(
      token ?? ""
    );


    rows = data.map((a: any) => ({
      id: String(a.id),

      participant:
        a.participant_name ?? "-",

      email:
        a.participant_email ?? "-",

      event:
        a.event_title ?? "-",

      status:
        String(a.status ?? "ABSENT").toUpperCase(),

      scannedAt:
        a.scanned_at ?? null,

      scannedBy:
        a.scanned_by ?? null,
    }));


  } catch (error) {

    console.error(
      "Attendance fetch error:",
      error
    );

    rows = [];

  }



  const attended =
    rows.filter(
      (r) =>
        r.status === "ATTENDED" ||
        r.status === "PRESENT"
    ).length;



  const notAttended =
    rows.filter(
      (r) =>
        r.status === "NOT_ATTENDED" ||
        r.status === "ABSENT"
    ).length;



  const rate =
    rows.length > 0
      ? Math.round(
          (attended / rows.length) * 100
        )
      : 0;



  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-2xl font-bold">
          Attendance Records
        </h1>

        <p className="text-muted-foreground text-sm">
          Rekap data kehadiran peserta di semua event
        </p>

      </div>



      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">


        {[
          {
            label:"Total",
            value:rows.length
          },
          {
            label:"Hadir",
            value:attended
          },
          {
            label:"Belum Hadir",
            value:notAttended
          },
          {
            label:"Attendance Rate",
            value:`${rate}%`
          }

        ].map((s)=>(

          <div
            key={s.label}
            className="rounded-xl border bg-card p-4 text-center"
          >

            <div className="text-2xl font-bold text-primary">
              {s.value}
            </div>

            <div className="text-xs text-muted-foreground">
              {s.label}
            </div>

          </div>

        ))}


      </div>




      <div className="relative">


        <Search
          className="
          absolute left-3 top-3
          h-4 w-4
          text-muted-foreground
          "
        />


        <input

          placeholder="Cari peserta atau event..."

          className="
          w-full
          pl-10
          py-2.5
          rounded-xl
          border
          bg-background
          "

        />


      </div>




      <div className="rounded-2xl border bg-card overflow-hidden">


        <table className="w-full text-sm">


          <thead>

            <tr className="border-b bg-muted/30">


              <th className="p-4 text-left">
                PESERTA
              </th>


              <th className="p-4 text-left">
                EVENT
              </th>


              <th className="p-4">
                STATUS
              </th>


              <th className="p-4">
                WAKTU SCAN
              </th>


              <th className="p-4">
                SCAN OLEH
              </th>


            </tr>

          </thead>



          <tbody>


          {rows.map((r)=>{


            const st =
              statusMap[r.status] ??
              statusMap.ABSENT;


            const Icon =
              st.icon;



            return (

              <tr
                key={r.id}
                className="border-b hover:bg-muted/30"
              >


                <td className="p-4">

                  <div className="font-medium">
                    {r.participant}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {r.email}
                  </div>

                </td>



                <td className="p-4">
                  {r.event}
                </td>



                <td className="p-4 text-center">

                  <Badge
                    variant="outline"
                    className={st.class}
                  >

                    <Icon className="w-3 h-3 mr-1"/>

                    {st.label}

                  </Badge>


                </td>



                <td className="p-4">

                  {r.scannedAt ?? "-"}

                </td>



                <td className="p-4">

                  {r.scannedBy ?? "-"}

                </td>



              </tr>

            );


          })}


          </tbody>


        </table>



        {rows.length === 0 && (

          <div className="py-16 text-center text-muted-foreground">

            Belum ada data attendance.

          </div>

        )}



      </div>


    </div>

  );

}