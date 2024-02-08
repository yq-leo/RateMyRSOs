// Database actions and form validation functions
"use server";

import { sql } from "@vercel/postgres";
import type {
  SignUpFormData,
  SignUpFormError,
  User,
} from "@/app/lib/types/util-types";
import { UserSql } from "@/app/lib/types/db-types";
import bcrypt from "bcrypt";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getUser(email: string): Promise<User> {
  try {
    const user = (await sql<UserSql>`SELECT * FROM users WHERE email=${email}`)
      .rows[0];
    return (
      user && {
        ...user,
        firstName: user?.first_name,
        lastName: user?.last_name,
      }
    );
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function createUser(user: User): Promise<User> {
  const { email, name, firstName, lastName, password } = user;
  // TODO: Remove this when signup is available in production
  if (process.env.NODE_ENV !== "development") return user;
  try {
    const user = await getUser(email);
    if (user) return user;
    const hashedPassword = await bcrypt.hash(password, 10);
    await sql<UserSql>`
      INSERT INTO users (name, first_name, last_name, email, password)
      VALUES (${name}, ${firstName}, ${lastName}, ${email}, ${hashedPassword})
    `;
    console.log("User created");
    return await getUser(email);
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Failed to create user.");
  }
}

const SignupFromSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .min(1, { message: "Name is required" }),
    email: z
      .string({
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Must be a valid email address" }),
    password: z
      .string({
        invalid_type_error: "Password is must be a string",
      })
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string({
        invalid_type_error: "Password is must be a string",
      })
      .min(6, {
        message: "Confirm Password must be at least 6 characters long",
      }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
  });

export async function signUpUser(
  formData: SignUpFormData
): Promise<SignUpFormError> {
  const validatedForm = SignupFromSchema.safeParse(formData);
  if (!validatedForm.success) {
    const zodError = validatedForm.error.flatten();
    return { ...zodError.fieldErrors, custom: zodError.formErrors };
  }
  const { name, email, password } = validatedForm.data;
  try {
    await createUser({
      id: "",
      name,
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      email,
      password,
    });
  } catch (error) {
    console.error("Failed to create user:", error);
  }

  revalidatePath("/");
  redirect("/");
}
