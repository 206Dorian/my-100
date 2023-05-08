const db = require('../config/connection'); // Import the database connection
const seedUsers = require('./seedUser'); // Import the seedUsers function
const seedStories = require('./seedStories'); // Import the seedStories function
const seedFriends = require('./seedFriends'); // Import the seedFriends function

// Wait for the database connection to open before seeding the database
db.once('open', async () => {
  // Call the seedUsers, seedStories, and seedFriends functions in sequence
  await seedUsers();
  await seedStories();
  await seedFriends();

  // Log a message indicating that all seeds are complete and exit the process
  console.log('All seeds complete');
  process.exit(0);
});
