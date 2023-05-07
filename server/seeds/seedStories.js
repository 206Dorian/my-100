// seeders/seedStories.js
const faker = require('faker');
const { Story, User } = require('../models');

async function seedStories() {
  await Story.deleteMany({});

  // Get all users
  const users = await User.find({});

  // Create 100 stories for each user
  const storyPromises = users.map(async (user) => {
    const storyData = [];

    for (let i = 0; i < 100; i += 1) {
      const title = faker.lorem.words();
      const body = faker.lorem.paragraphs();

      storyData.push({ title, body, author: user._id });
    }

    await Story.create(storyData);
  });

  await Promise.all(storyPromises);
  console.log('Stories seeded');
}

module.exports = seedStories;
