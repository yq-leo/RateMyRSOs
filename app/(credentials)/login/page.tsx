import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

import LoginForm from "@/app/ui/login/login-form";

export default async function Page() {
  const session = await getServerSession(options);
  if (!!session) redirect("/");

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
