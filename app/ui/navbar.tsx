import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function NavBar() {
  const isLoggedIn = false;
  const user = "Leo";

  return (
    <nav className={styles.main}>
      <div className={styles.heroLogo}>
        <Image src="/main-logo.svg" alt="RateMyRSOs" width={200} height={70} />
      </div>
      <div className={styles.navLinks}>
        {isLoggedIn ? <UserNav user={user} /> : <GuestNav />}
      </div>
    </nav>
  );
}

// FIXME: find a better solution for having multiple classNames
function GuestNav() {
  return (
    <>
      <Link className={`${styles.btn} ${styles.loginBtn}`} href="/login">
        Login
      </Link>
      <Link className={`${styles.btn} ${styles.signupBtn}`} href="/signup">
        Sign Up
      </Link>
    </>
  );
}

function UserNav({ user }: { user: String }) {
  return (
    <>
      <div className={`${styles.btn} ${styles.userBtn}`}>Hi, {user}</div>
    </>
  );
}
