"use server";

import { sql } from "@vercel/postgres";
import type { User, UserSql } from "@/app/lib/definitions";
import bcrypt from "bcrypt";

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
