const faker = require('faker'); // Import the faker library to generate fake data
const { Story, User } = require('../models'); // Import the Story and User models

async function seedStories() {
  await Story.deleteMany({}); // Delete all existing stories from the database

  // Get all users from the database
  const users = await User.find({});

  // Create 100 stories for each user
  const storyPromises = users.map(async (user) => {
    const storyData = [];

    for (let i = 0; i < 100; i += 1) {
      // Generate a random title and body for the story using the faker library
      const title = faker.lorem.words();
      const body = faker.lorem.paragraphs();

      // Add the generated story data to the storyData array, with the author set to the current user's ID
      storyData.push({ title, body, author: user._id });
    }

    // Insert the generated story data into the database using the Story model
    await Story.create(storyData);
  });

  // Wait for all of the story promises to resolve before continuing
  await Promise.all(storyPromises);
  console.log('Stories seeded');
}

module.exports = seedStories;
