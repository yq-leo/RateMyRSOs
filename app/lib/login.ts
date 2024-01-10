"use client";

import { signIn } from "next-auth/react";
import { SignInFormData, SignInFormError } from "./definitions";

export async function signInUser(
  formData: SignInFormData
): Promise<SignInFormError | null> {
  try {
    const res = await signIn("credentials", {
      ...formData,
      redirect: false,
      callbackUrl: "/",
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
    window.location.href = "/";
    return null;
  } catch (error) {
    console.error("Sign in error", error);
    return {
      error: "An unknown error has occurred",
    };
  }
}
