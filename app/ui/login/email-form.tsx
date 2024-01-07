"use client";

import Link from "next/link";
import styles from "./email-form.module.css";

export default function EmailForm() {
  return (
    <form className={styles.form}>
      <div className={styles.formField}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          className={styles.input}
          id="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>
      <div className={styles.formField}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          className={styles.input}
          id="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>
      <p className={styles.resetPwd}>
        Forget your password?{" "}
        <Link href="/password_reset" className={styles.resetPwdLink}>
          Reset here
        </Link>
      </p>
      <button className={styles.signInBtn} type="submit">
        Login
      </button>
      <p className={styles.signUp}>
        New to RateMyRSOs?{" "}
        <Link href="/signup" className={styles.signUpLink}>
          Sign up here
        </Link>
      </p>
    </form>
  );
}
