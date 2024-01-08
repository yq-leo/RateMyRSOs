const { db } = require("@vercel/postgres");
const { users } = require("./data.json");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;
    console.log("Users table created");

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, username, email, password)
          VALUES (${user.id}, ${user.username}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING
        `;
      })
    );
    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users: ", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);

  await client.end();
}

main().catch((error) => {
  console.error("Error occurred during seeding: ", error);
});
