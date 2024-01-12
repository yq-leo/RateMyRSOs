"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import styles from "./email-form.module.css";
import { signIn } from "next-auth/react";
import { SignInFormData, SignInFormError } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

export default function EmailForm() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<SignInFormError | null>(null);
  const router = useRouter();

  const signInUser = async (
    formData: SignInFormData
  ): Promise<SignInFormError | null> => {
    try {
      const res = await signIn("credentials", {
        ...formData,
        redirect: false,
      });
      if (res?.error) {
        if (res.error === "CredentialsSignin")
          return {
            error: "Invalid email or password",
          };
        else
          return {
            error: "An unknown error has occurred",
          };
      }
      // FIXME: This is a hack to force a revalidation of the cache
      router.replace("/");
      return null;
    } catch (error) {
      console.error("Sign in error", error);
      return {
        error: "An unknown error has occurred",
      };
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginError = await signInUser(formData);
    if (loginError) setError(loginError);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormFocus = () => {
    setError(null);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleFormSubmit}
      onFocus={handleFormFocus}
    >
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
          onChange={handleFieldChange}
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
          onChange={handleFieldChange}
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
      <p className={styles.loginError}>{error?.error}</p>
    </form>
  );
}
