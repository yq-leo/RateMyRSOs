const { db } = require("@vercel/postgres");
const users = require("./data/users.json");
const rsos = require("./data/rsos.json");
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
        name VARCHAR(1024) NOT NULL,
        emails VARCHAR(1024) DEFAULT '[]',
        phones VARCHAR(1024) DEFAULT '[]',
        logo VARCHAR(1024),
        links VARCHAR(1024) DEFAULT '{}',
        ratings VARCHAR(100) DEFAULT '{1: 0, 2: 0, 3: 0, 4: 0, 5: 0}',
        num_reviews INT DEFAULT 0
      );
    `;
    console.log("RSOs table created");

    const insertedRSOs = await Promise.all(
      rsos.map(async (rso) => {
        return client.sql`
          INSERT INTO rsos (name, emails, phones, logo, links, ratings)
          VALUES (${rso.name}, ${JSON.stringify(rso.emails)}, ${JSON.stringify(
          rso.phones
        )}, ${rso.logo}, ${JSON.stringify(rso.links)}, ${JSON.stringify(
          rso.ratings
        )})
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

  const tablesToSeed = process.argv[2];
  if (!tablesToSeed) {
    await client.end();
    throw "Usage: TABLE=<table to seed> npm run seed";
  }

  switch (tablesToSeed) {
    case "users":
      await seedUsers(client);
      break;
    case "rsos":
      await seedRSOs(client);
      break;
    case "all":
      await seedUsers(client);
      await seedRSOs(client);
      break;
  }

  await client.end();
}

main().catch((error) => {
  console.error("Error occurred during seeding: ", error);
});
