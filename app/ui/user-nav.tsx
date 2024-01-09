"use client";

import { useReducer } from "react";
import Link from "next/link";

import styles from "./user-nav.module.css";

export default function UserNav({ user }: { user: String }) {
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
