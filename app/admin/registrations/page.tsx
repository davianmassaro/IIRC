import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ClipboardList, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";


interface RegistrationRow {
  registration_code: string;
  participant_name: string;
  participant_email: string;
  event_title: string;
  registration_status: string;
  payment_status: string | null;
  created_at: string;
}


const regStatusMap: Record<string, { label: string; class: string }> = {
  confirmed: {
    label: "Confirmed",
    class:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  pending: {
    label: "Pending",
    class:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  cancelled: {
    label: "Dibatalkan",
    class:
      "bg-destructive/10 text-destructive border-destructive/20",
  },
};


const payStatusMap: Record<string, { label: string; class: string }> = {
  paid: {
    label: "Lunas",
    class:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  pending: {
    label: "Belum Bayar",
    class:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  failed: {
    label: "Gagal",
    class:
      "bg-destructive/10 text-destructive border-destructive/20",
  },
};


async function getRegistrations() {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/registrations`,
    {
      cache: "no-store",
    }
  );


  if (!response.ok) {
    throw new Error("Failed fetch registrations");
  }


  const result = await response.json();

  return result.data ?? [];
}



export default async function AdminRegistrationsPage() {

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }


  let rows: RegistrationRow[] = [];


  try {
    rows = await getRegistrations();
  } catch {
    rows = [];
  }



  return (

    <div className="space-y-6">


      <div>
        <h1 className="text-2xl font-bold">
          Registrations
        </h1>

        <p className="text-muted-foreground text-sm mt-0.5">
          Semua data registrasi peserta ke program IIRC
        </p>
      </div>



      <div className="grid grid-cols-4 gap-4">

        {[
          {
            label:"Total",
            value:rows.length
          },
          {
            label:"Confirmed",
            value:
              rows.filter(
                r=>r.registration_status==="confirmed"
              ).length
          },
          {
            label:"Pending",
            value:
              rows.filter(
                r=>r.registration_status==="pending"
              ).length
          },
          {
            label:"Dibatalkan",
            value:
              rows.filter(
                r=>r.registration_status==="cancelled"
              ).length
          }

        ].map(item=>(

          <div
            key={item.label}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >

            <div className="text-2xl font-bold text-primary">
              {item.value}
            </div>

            <div className="text-xs text-muted-foreground">
              {item.label}
            </div>

          </div>

        ))}

      </div>



      <div className="relative">

        <Search
          className="
          absolute left-3.5 top-1/2 
          -translate-y-1/2 
          h-4 w-4 text-muted-foreground
          "
        />


        <input
          placeholder="Cari berdasarkan nama, email, atau order ID..."
          className="
          w-full pl-10 pr-4 py-2.5 
          rounded-xl border border-border 
          bg-background text-sm
          "
        />

      </div>



      <div className="rounded-2xl border border-border bg-card overflow-hidden">


        <table className="w-full text-sm">


          <thead>

            <tr className="border-b border-border bg-muted/30">


              <th className="text-left px-5 py-3">
                Order ID
              </th>


              <th className="text-left px-4 py-3">
                Peserta
              </th>


              <th className="text-left px-4 py-3">
                Event
              </th>


              <th className="text-center px-4 py-3">
                Status
              </th>


              <th className="text-center px-4 py-3">
                Pembayaran
              </th>


              <th className="text-left px-5 py-3">
                Tanggal
              </th>


            </tr>

          </thead>



          <tbody>


          {rows.map((r)=>(

            <tr
              key={r.registration_code}
              className="border-b hover:bg-muted/30"
            >


              <td className="px-5 py-4">

                <code className="text-xs bg-muted px-2 py-1 rounded-lg">
                  {r.registration_code}
                </code>

              </td>



              <td className="px-4 py-4">

                <p className="font-medium">
                  {r.participant_name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {r.participant_email}
                </p>

              </td>



              <td className="px-4 py-4">

                {r.event_title}

              </td>



              <td className="text-center">

                <Badge
                  variant="outline"
                  className={
                    regStatusMap[r.registration_status]?.class
                  }
                >

                  {
                    regStatusMap[r.registration_status]?.label ??
                    r.registration_status
                  }

                </Badge>

              </td>




              <td className="text-center">

                <Badge
                  variant="outline"
                  className={
                    payStatusMap[r.payment_status ?? ""]?.class
                  }
                >

                  {
                    payStatusMap[r.payment_status ?? ""]?.label ??
                    "-"
                  }

                </Badge>


              </td>



              <td className="px-5 text-xs text-muted-foreground">

                {
                  new Date(r.created_at)
                  .toLocaleDateString("id-ID")
                }

              </td>


            </tr>


          ))}


          </tbody>


        </table>



        {rows.length===0 && (

          <div className="py-16 text-center">

            <ClipboardList
              className="mx-auto h-12 w-12 text-muted-foreground/30"
            />

            <p className="text-sm text-muted-foreground mt-3">
              Belum ada registrasi.
            </p>

          </div>

        )}



      </div>


    </div>

  );
}