// models/Friend.js
const { Schema, model } = require('mongoose');

const friendSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  }
);

const Friend = model('Friend', friendSchema);

module.exports = Friend;
