import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { SingerDashboard } from "./components/dashboard";

export default async function DashboardPage() {
  let session: Session | null | boolean = await auth();
  // console.log("session", session);
  let user = session?.user?.email;
  // console.log("user", user);

  if (session?.user?.role === "INSTRUMENTALIST") {
    return <SingerDashboard />;
  } else {
    redirect("/");
  }
}
