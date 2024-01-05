import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

import LoginForm from "@/app/ui/login/login-form";

export default function Page() {
  return (
    <div className={styles.main}>
      <Link href="/">
        <Image src="/main-logo.svg" alt="hero logo" width={150} height={150} />
      </Link>
      <h1 className={styles.title}>Sign in to RateMyRSOs</h1>
      <LoginForm />
    </div>
  );
}
