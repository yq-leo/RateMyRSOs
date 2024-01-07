import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(options);

  return (
    <div>
      <h1>RSO</h1>
      <p>
        {!!session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </p>
    </div>
  );
}
