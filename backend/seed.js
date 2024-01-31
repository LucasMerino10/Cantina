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
    await database.query("truncate message");

    // Insert fake data into the 'item' table
    await database.query(`INSERT INTO user (username, email, password, avatar, color)
    VALUES("HighGround", "obi.wan@email.com", "password", "src/assets/images/Obi-Wan.png", "blue"),
          ("GreenGuy", "yoda@email.com", "password", "src/assets/images/Yoda.png", "green"),
          ("ChokeMaster", "darth.vader@email.com", "password", "src/assets/images/Darth-Vader.png", "red")`);

    await database.query(`INSERT INTO message (content, message_date, user_id)
                          VALUES(${faker.lorem.sentence}, "2024-01-31 08:48:27", 1),
                                (${faker.lorem.sentence}, "2024-01-31 08:52:30", 3),
                                (${faker.lorem.sentence}, "2024-01-31 08:52:59", 2),
                                (${faker.lorem.sentence}, "2024-01-31 08:54:18", 1)`);

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
