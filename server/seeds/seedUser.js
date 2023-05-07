// seeders/seedUsers.js
const faker = require('faker');
const { User } = require('../models');

async function seedUsers() {
  await User.deleteMany({});

  // Create 10 random users
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  await User.create(userData);
  console.log('Users seeded');
}

module.exports = seedUsers;
