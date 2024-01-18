const { db } = require("@vercel/postgres");
const { users, rsos } = require("./data.json");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id uuid DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;
    console.log("Users table created");

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, name, first_name, last_name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.first_name}, ${user.last_name}, ${user.email}, ${hashedPassword})
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

async function seedRSOs(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS rsos (
        id uuid DEFAULT uuid_generate_v4() UNIQUE PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        emails VARCHAR(255),
        logo VARCHAR(255),
        links VARCHAR(255),
        ratings VARCHAR(255)
      );
    `;
    console.log("RSOs table created");

    const insertedRSOs = await Promise.all(
      rsos.map(async (rso) => {
        return client.sql`
          INSERT INTO rsos (id, name, emails, logo, links, ratings)
          VALUES (${rso.id}, ${rso.name}, ${rso.emails}, ${rso.logo}, ${rso.links}, ${rso.ratings})
          ON CONFLICT (id) DO NOTHING
        `;
      })
    );
    console.log(`Seeded ${insertedRSOs.length} rsos`);

    return {
      createTable,
      rsos: insertedRSOs,
    };
  } catch (error) {
    console.error("Error seeding RSOs: ", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await seedUsers(client);
  await seedRSOs(client);

  await client.end();
}

main().catch((error) => {
  console.error("Error occurred during seeding: ", error);
});
