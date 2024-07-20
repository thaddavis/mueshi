import { auth } from "@/auth";
import { Session } from "next-auth";

export default async function DashboardPage() {
  let session: Session | null | boolean = await auth();

  return <>INSTRUMENTALIST !!! HOME</>;
}
