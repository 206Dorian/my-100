const { User, Friend } = require('../models'); // Import the User and Friend models

async function seedFriends() {
  await Friend.deleteMany({}); // Delete all existing friendships from the database

  // Get all users from the database
  const users = await User.find({});

  // Create friendships for each user
  const friendPromises = users.map(async (user) => {
    // Pick 3 random friends for each user, excluding the user itself
    const friendIds = users
      .filter((u) => u._id.toString() !== user._id.toString()) // Exclude the current user from the list of potential friends
      .sort(() => 0.5 - Math.random()) // Shuffle the list of potential friends
      .slice(0, 3) // Pick the first 3 friends from the shuffled list
      .map((u) => u._id); // Extract only the ID field from the friend objects

    // Create a new Friend document with the current user's ID and the IDs of their 3 randomly selected friends
    await Friend.create({ user: user._id, friends: friendIds });
  });

  // Wait for all of the friend promises to resolve before continuing
  await Promise.all(friendPromises);
  console.log('Friends seeded');
}

module.exports = seedFriends;
