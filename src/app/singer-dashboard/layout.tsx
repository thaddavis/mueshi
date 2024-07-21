import { auth } from "@/auth";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { DashboardLayout } from "./shared-components/DashboardLayout";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session: Session | null | boolean = await auth();

  if (session?.user?.role === "SINGER") {
    return <DashboardLayout>{children}</DashboardLayout>;
  } else {
    redirect("/");
  }
}
