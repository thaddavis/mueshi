import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { SingerDashboard } from "./components/dashboard";

export default async function DashboardPage() {
  let session: Session | null | boolean = await auth();

  if (session?.user?.role === "SINGER") {
    return <SingerDashboard />;
  } else {
    redirect("/");
  }
}
