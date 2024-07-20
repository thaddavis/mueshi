import { handlers, auth, signIn, signOut } from "@/auth";
import Form from "./form";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  let session = await auth();
  console.log("session", session);
  let user = session?.user?.email;
  console.log("user", user);

  if (user) {
    redirect("/");
  }
  return <Form />;
}
