"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./signup-form.module.css";
import { SignUpFormData, SignUpFormError } from "@/app/lib/definitions";
import { signUpUser } from "@/app/lib/actions";

export default function SignUpForm() {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<SignUpFormError | null>(null);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = await signUpUser(formData);
    if (errors) setFormErrors(errors);
  };

  const handleFormFocus = () => {
    setFormErrors(null);
  };

  return (
    <form
      className={styles.main}
      onSubmit={handleFormSubmit}
      onFocus={handleFormFocus}
    >
      {/* TODO: Remove this banner after implementing the signup functionality */}
      <p className={styles.notAvailable}>Sign up is currently unavailable</p>
      <div className={styles.formField}>
        <label htmlFor="username" className={styles.label}>
          Name
        </label>
        <input
          className={styles.input}
          id="name"
          name="name"
          type="text"
          placeholder="Enter your username"
          onChange={handleFieldChange}
        />
        {formErrors?.name &&
          formErrors.name.map((error: string) => (
            <p key={error} className={styles.error}>
              {error}
            </p>
          ))}
      </div>
      <div className={styles.formField}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          className={styles.input}
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleFieldChange}
        />
        {formErrors?.email &&
          formErrors.email.map((error: string) => (
            <p key={error} className={styles.error}>
              {error}
            </p>
          ))}
      </div>
      <div className={styles.formField}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleFieldChange}
        />
        {formErrors?.password &&
          formErrors.password.map((error: string) => (
            <p key={error} className={styles.error}>
              {error}
            </p>
          ))}
      </div>
      <div className={styles.formField}>
        <label htmlFor="confirmPassword" className={styles.label}>
          Confirm Password
        </label>
        <input
          className={styles.input}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          onChange={handleFieldChange}
        />
        {formErrors?.confirmPassword &&
          formErrors.confirmPassword.map((error: string) => (
            <p key={error} className={styles.error}>
              {error}
            </p>
          ))}
      </div>
      {formErrors?.custom &&
        formErrors.custom.map((error: string) => (
          <p key={error} className={styles.error}>
            {error}
          </p>
        ))}
      <button className={styles.signUpBtn} type="submit">
        Sign Up
      </button>
      <p className={styles.login}>
        Already have an account?{" "}
        <Link href="/login" className={styles.loginLink}>
          Login here
        </Link>
      </p>
    </form>
  );
}
