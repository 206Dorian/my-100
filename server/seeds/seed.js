const db = require('../config/connection');
const { User, Book } = require('../models');
const userData = require('./userData.json');
const bookData = require('./bookData.json');

db.once('open', async () => {

  await User.deleteMany({});
  await Book.deleteMany({});

  // bulk create each model
  const users = await User.insertMany(userData);
  const books = await Book.insertMany(bookData);

  console.log('all done!');
  process.exit(0);
});
