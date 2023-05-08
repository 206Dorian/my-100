const faker = require('faker'); // Import the faker library to generate fake data
const { User } = require('../models'); // Import the User model

async function seedUsers() {
  await User.deleteMany({}); // Delete all existing users from the database

  // Create 10 random users
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
    // Generate a random username, email, and password using the faker library
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    // Add the generated user data to the userData array
    userData.push({ username, email, password });
  }

  // Insert the generated user data into the database using the User model
  await User.create(userData);
  console.log('Users seeded');
}

module.exports = seedUsers;
