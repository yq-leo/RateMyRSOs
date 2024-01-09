import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import UserNav from "@/app/ui/user-nav";

export default async function NavBar() {
  const session = await getServerSession(options);

  return (
    <nav className={styles.main}>
      <div className={styles.heroLogo}>
        <Link href="/">
          <Image
            src="/main-logo.svg"
            alt="RateMyRSOs"
            width={200}
            height={70}
          />
        </Link>
      </div>
      <div className={styles.navLinks}>
        {!!session ? <UserNav user={session?.user?.firstName} /> : <GuestNav />}
      </div>
    </nav>
  );
}

function GuestNav() {
  return (
    <>
      <Link className={styles.loginBtn} href="/login">
        Login
      </Link>
      <Link className={styles.signupBtn} href="/signup">
        Sign Up
      </Link>
    </>
  );
}
