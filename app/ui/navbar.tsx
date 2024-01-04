import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.main}>
      <div className={styles.heroLogo}>
        <Image src="/main-logo.svg" alt="RateMyRSOs" width={200} height={70} />
      </div>
      <div className={styles.navLinks}>
        <Link className={styles.login} href="/login">
          Login
        </Link>
        <Link className={styles.signup} href="/signup">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
