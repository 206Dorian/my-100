const { Book, User, Story, Friend } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    Books: async () => {
      return await Book.find({});
    },
    Stories: async () => {
      return await Story.find({}).populate('author');
    },
    story: async (parent, { _id }) => {
      return await Story.findById(_id).populate('author');
    },
    Users: async (parent, args, context) => {
      return await User.find()

    },
    user: async (parent, args, context) => {
      return await User.findById(context.user._id)
        ;
    }

  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },


    deleteUser: async (parent, username) => {
      const user = await User.findOneAndDelete(username);
      return (`We will miss you ${user}`);

    },
    createStory: async (parent, { title, body }, context) => {
      if (context.user) {
        const story = await Story.create({ title, body, author: context.user._id });

        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { stories: story._id } },
          { new: true }
        );

        return story;
      }

      throw new AuthenticationError('You need to be logged in to create a story');
    },
    updateStory: async (parent, { _id, title, body }, context) => {
      if (context.user) {
        const story = await Story.findOneAndUpdate(
          { _id, author: context.user._id },
          { title, body },
          { new: true }
        );

        if (!story) {
          throw new Error('Story not found or you do not have permission to edit it');
        }

        return story;
      }

      throw new AuthenticationError('You need to be logged in to update a story');
    },
    deleteStory: async (parent, { _id }, context) => {
      if (context.user) {
        const story = await Story.findOneAndDelete({ _id, author: context.user._id });

        if (!story) {
          throw new Error('Story not found or you do not have permission to delete it');
        }

        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { stories: _id } },
          { new: true }
        );

        return story;
      }

      throw new AuthenticationError('You need to be logged in to delete a story');
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const friendship = await Friend.findOne({ user: context.user._id });

        if (!friendship) {
          const newFriendship = await Friend.create({ user: context.user._id, friends: [friendId] });
          return newFriendship;
        } else {
          const updatedFriendship = await Friend.findOneAndUpdate(
            { user: context.user._id },
            { $addToSet: { friends: friendId } },
            { new: true }
          ).populate('friends');

          return updatedFriendship;
        }
      }

      throw new AuthenticationError('You need to be logged in to add friends');
    },


  }
};

module.exports = resolvers;
