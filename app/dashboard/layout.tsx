import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { SessionProvider } from "@/providers/SessionProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };

  return (
    <SessionProvider session={session}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar */}
        <DashboardSidebar user={user} notifCount={3} />

        {/* Main */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <DashboardTopbar user={user} notifCount={3} />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 lg:px-6 py-6 max-w-6xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
