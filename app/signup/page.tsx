import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

import SignUpFrom from "@/app/ui/signup/signup-form";

export default function Page() {
  return (
    <div className={styles.main}>
      <Link href="/">
        <Image src="/main-logo.svg" alt="hero logo" width={150} height={150} />
      </Link>
      <h1 className={styles.title}>Sign Up a New Account</h1>
      <SignUpFrom />
    </div>
  );
}
