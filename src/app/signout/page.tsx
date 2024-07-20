import { auth, signIn, signOut } from "@/auth";

export default async function SignOutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h5 className="text-xl font-bold mb-4">
        Are you sure you want to sign out?
      </h5>
      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/",
          });
        }}
      >
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
