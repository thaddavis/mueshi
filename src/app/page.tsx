import { handlers, auth, signIn, signOut } from "@/auth";

function SignIn({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <p>{children}</p>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Sign in
      </button>
    </form>
  );
}

function SignOut({ children }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <p>{children}</p>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Sign out
      </button>
    </form>
  );
}

export default async function Page() {
  let session = await auth();
  console.log("session", session);
  let user = session?.user?.email;
  console.log("user", user);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Mueshi Music
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            {user ? (
              <SignOut>
                <></>
              </SignOut>
            ) : (
              <SignIn>
                <></>
              </SignIn>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
