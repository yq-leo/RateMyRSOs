"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useSession } from "next-auth/react";
import { useReducer } from "react";

export default function NavBar({ isHome = false }: { isHome: boolean }) {
  return (
    <nav className={`${styles.main} ${isHome || styles.darkMain}`}>
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
        <NavButtons isHome={isHome} />
      </div>
    </nav>
  );
}

function NavButtons({ isHome }: { isHome: boolean }) {
  const { data: session, status } = useSession();
  switch (status) {
    case "authenticated":
      // @ts-ignore
      return <UserNav user={session?.user?.firstName} isHome={isHome} />;
    case "unauthenticated":
      return <GuestNav isHome={isHome} />;
    default:
      return null;
  }
}

function UserNav({
  user,
  isHome,
}: {
  user: String | null | undefined;
  isHome: boolean;
}) {
  const [menuOpen, toggleMenuOpen] = useReducer((state) => !state, false);

  return (
    <div className={styles.menu}>
      <div
        className={`${styles.userBtn} ${isHome || styles.darkUserBtn}`}
        onClick={toggleMenuOpen}
      >
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

function GuestNav({ isHome }: { isHome: boolean }) {
  return (
    <>
      <Link
        className={`${styles.loginBtn} ${isHome || styles.loginBtnDark}`}
        href="/login"
      >
        Login
      </Link>
      <Link
        className={`${styles.signupBtn} ${isHome || styles.signupBtnDark}`}
        href="/signup"
      >
        Sign Up
      </Link>
    </>
  );
}
