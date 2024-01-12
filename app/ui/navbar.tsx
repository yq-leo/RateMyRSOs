"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useSession } from "next-auth/react";
import { useReducer } from "react";

export default function NavBar() {
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
        <NavButtons />
      </div>
    </nav>
  );
}

function NavButtons() {
  const { data: session, status } = useSession();
  switch (status) {
    case "authenticated":
      // @ts-ignore
      return <UserNav user={session?.user?.firstName} />;
    case "unauthenticated":
      return <GuestNav />;
    default:
      return null;
  }
}

function UserNav({ user }: { user: String | null | undefined }) {
  const [menuOpen, toggleMenuOpen] = useReducer((state) => !state, false);

  return (
    <div className={styles.menu}>
      <div className={styles.userBtn} onClick={toggleMenuOpen}>
        Hi, {user}
      </div>
      {menuOpen && (
        <div className={styles.menuContent}>
          <Link href="/account/profile">Profile</Link>
          <Link href="/account/settings">Settings</Link>
          <Link href="/account/ratings">My Ratings</Link>
          <Link href="/account/my-rsos">My RSOs</Link>
          <Link href="/account/saved-rsos">Saved RSOs</Link>
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        </div>
      )}
    </div>
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
