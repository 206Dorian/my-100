const db = require('../config/connection');

const seedUsers = require('./seedUser');
const seedStories = require('./seedStories');
const seedFriends = require('./seedFriends');

db.once('open', async () => {


  await seedUsers();
  await seedStories();
  await seedFriends();


  console.log('all done!');
  console.log('All seeds complete');
  process.exit(0);
});
