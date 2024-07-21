import { auth } from "@/auth";
import { Session } from "next-auth";
import { useEffect } from "react";

export default async function ConnectPage() {
  useEffect(() => {
    console.log("--- --- ---");
  });

  return <>Connect</>;
}
