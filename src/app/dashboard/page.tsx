import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  let session = await auth();
  console.log("session DASHBOARD", session);

  if (session?.user?.role === "SINGER") {
    redirect("/singer-dashboard");
  } else if (session?.user?.role === "INSTRUMENTALIST") {
    redirect("/instrumentalist-dashboard");
  }

  return <>Oops!</>;
}
