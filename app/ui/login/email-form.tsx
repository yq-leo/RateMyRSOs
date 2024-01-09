"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import styles from "./email-form.module.css";
import { signIn } from "next-auth/react";
import { SignInFormData } from "@/app/lib/definitions";

export default function EmailForm() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<String>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        ...formData,
        redirect: false,
        callbackUrl: "/",
      });
      console.log(res);
      if (res?.error) {
        switch (res.error) {
          case "CredentialsSignin":
            setError("Invalid email or password");
            break;
          default:
            setError("An unknown error has occurred");
        }
      }
      if (res?.ok) {
        // FIXME: This is a hacky way to refresh the page
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Sign in error", error);
      setError("An unknown error has occurred");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formField}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          className={styles.input}
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
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
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
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
      <p className={styles.loginError}>{error}</p>
    </form>
  );
}
