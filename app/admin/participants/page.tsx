import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAdminParticipants } from "@/lib/iirc-api";
import { Users, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";


export default async function AdminParticipantsPage() {

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }


  const participants = await getAdminParticipants();


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Participants
        </h1>

        <p className="text-muted-foreground">
          Semua peserta yang terdaftar di platform IIRC
        </p>
      </div>


      <div className="grid grid-cols-3 gap-4">

        <div className="rounded-xl border p-5">
          <Users />
          <p className="text-3xl font-bold mt-2">
            {participants.length}
          </p>
          <p>Total</p>
        </div>


        <div className="rounded-xl border p-5">
          <p className="text-3xl font-bold">
            {
              participants.filter(
                p => p.is_active === 1
              ).length
            }
          </p>
          <p>Aktif</p>
        </div>


        <div className="rounded-xl border p-5">
          <p className="text-3xl font-bold">
            {participants.length}
          </p>
          <p>Registrasi</p>
        </div>

      </div>



      <div className="relative">

        <Search className="absolute left-3 top-3 h-4 w-4"/>

        <input
          placeholder="Cari peserta..."
          className="w-full rounded-xl border p-3 pl-10"
        />

      </div>



      <div className="rounded-xl border overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                Peserta
              </th>

              <th className="p-4 text-left">
                Perusahaan
              </th>

              <th className="p-4 text-left">
                Kontak
              </th>

              <th className="p-4 text-left">
                Status
              </th>

            </tr>
          </thead>


          <tbody>

          {
            participants.map((p)=>(
              <tr
                key={p.id}
                className="border-b"
              >

                <td className="p-4">

                  <div className="font-medium">
                    {p.name}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {p.email}
                  </div>

                </td>


                <td className="p-4">

                  <div>
                    {p.company_name}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {p.position}
                  </div>

                </td>


                <td className="p-4">
                  {p.phone}
                </td>


                <td className="p-4">

                  <Badge>
                    {
                      p.is_active === 1
                      ? "Aktif"
                      : "Nonaktif"
                    }
                  </Badge>

                </td>


              </tr>
            ))
          }


          </tbody>

        </table>

      </div>


    </div>
  );
}``