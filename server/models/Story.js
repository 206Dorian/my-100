// models/Story.js
const { Schema, model } = require('mongoose');

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Story = model('Story', storySchema);

module.exports = Story;
