import Link from "next/link";
import styles from "./signup-form.module.css";

export default function SignUpForm() {
  return (
    <form className={styles.main}>
      {/* TODO: Remove this banner after implementing the signup functionality */}
      <p className={styles.notAvailable}>Sign up is currently unavailable</p>
      <div className={styles.formField}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          className={styles.input}
          id="username"
          type="text"
          placeholder="Enter your username"
        />
      </div>
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
      <div className={styles.formField}>
        <label htmlFor="confirm-password" className={styles.label}>
          Confirm Password
        </label>
        <input
          className={styles.input}
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
        />
      </div>
      <button className={styles.signUpBtn} type="submit">
        Sign Up
      </button>
      <p className={styles.Login}>
        Already have an account?{" "}
        <Link href="/login" className={styles.loginLink}>
          Login here
        </Link>
      </p>
    </form>
  );
}
