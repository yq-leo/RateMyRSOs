"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
// import { signIn } from "./auth";
import { SignInFormData } from "./definitions";

// export async function authenticate(formData: SignInFormData) {
//   try {
//     await signIn("credentials", formData);
//     console.log("Successfully signed in.");
//     return null;
//   } catch (error) {
//     console.error("Failed to sign in:", error);
//     switch ((error as any)?.type) {
//       case "CredentialsSignin":
//         return "Invalid credentials.";
//       default:
//         return "Something went wrong.";
//     }
//   }
// }
