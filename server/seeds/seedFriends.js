// seeders/seedFriends.js
const { User, Friend } = require('../models');

async function seedFriends() {
  await Friend.deleteMany({});

  // Get all users
  const users = await User.find({});

  // Create friendships for each user
  const friendPromises = users.map(async (user) => {
    // Pick 3 random friends for each user
    const friendIds = users
      .filter((u) => u._id.toString() !== user._id.toString())
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((u) => u._id);

    await Friend.create({ user: user._id, friends: friendIds });
  });

  await Promise.all(friendPromises);
  console.log('Friends seeded');
}

module.exports = seedFriends;
