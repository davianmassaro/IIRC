import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { SessionProvider } from "@/providers/SessionProvider";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  const role = session.user.role as string | undefined;

  if (!["ADMIN", "SUPER_ADMIN", "FINANCE_ADMIN"].includes(role ?? "")) {
    redirect("/login?callbackUrl=/admin");
  }

  const user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };

  return (
    <SessionProvider session={session}>
      <div className="flex h-screen overflow-hidden bg-background">
        <AdminSidebar user={user} role={role} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <AdminTopbar user={user} role={role} />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 lg:px-6 py-6 max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
