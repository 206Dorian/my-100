const mongoose = require('mongoose');

// Connect to the MongoDB database using the MONGODB_URI environment variable, or the default
// URL of 'mongodb://127.0.0.1:27017/my100' if the environment variable is not set.
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/my100',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Export the Mongoose connection object
module.exports = mongoose.connection;
