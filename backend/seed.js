/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)
    queries.push(database.query("truncate message"));

    // Insert fake data into the 'item' table
    queries.push(
      database.query(`INSERT INTO user (username, email, password_hash, avatar, color)
    VALUES("HighGround", "obi.wan@email.com", "$argon2id$v=19$m=16,t=2,p=1$Y3RXSDY1Y210T1c0YjM5dg$IEvColWiVYtiyGDckiDY8Q", "src/assets/images/Obi-Wan.png", "blue"),
          ("GreenGuy", "yoda@email.com", "$argon2id$v=19$m=16,t=2,p=1$Y3RXSDY1Y210T1c0YjM5dg$IEvColWiVYtiyGDckiDY8Q", "src/assets/images/Yoda.png", "green"),
          ("ChokeMaster", "darth.vader@email.com", "$argon2id$v=19$m=16,t=2,p=1$Y3RXSDY1Y210T1c0YjM5dg$IEvColWiVYtiyGDckiDY8Q", "src/assets/images/Darth-Vader.png", "red")`)
    );

    queries.push(
      database.query(
        `INSERT INTO message (content, message_date, user_id)
                          VALUES(?, "2024-01-31 08:48:27", 1),
                                (?, "2024-01-31 08:52:30", 3),
                                (?, "2024-01-31 08:52:59", 2),
                                (?, "2024-01-31 08:54:18", 1)`,
        [
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
        ]
      )
    );

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
