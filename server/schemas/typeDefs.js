const { gql } = require('apollo-server-express'); // Import the gql function from the apollo-server-express library

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    age: String
    stories: [Story]
    friends: [User]
  }

  type Story {
    _id: ID
    title: String
    body: String
    author: User
    createdAt: String
    updatedAt: String
  }

  type Book {
    _id: ID
    name: String
  }

  type Auth {
    token: ID
    user: User
  } 

  type Query {
    Users: [User] # Query to get all users
    user: User # Query to get the current user
    Books: [Book] # Query to get all books
    me: User # Query to get the authenticated user
    Stories: [Story] # Query to get all stories
    story(_id: ID!): Story # Query to get a specific story by its ID
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth # Mutation to create a new user
    login(username: String!, password: String!): Auth # Mutation to log in an existing user
    deleteUser(username: String!): User # Mutation to delete a user
    updateUser(height: String!, weight: String!, age: String!): User # Mutation to update a user's height, weight, and age
    createStory(title: String!, body: String!): Story # Mutation to create a new story
    updateStory(_id: ID!, title: String, body: String): Story # Mutation to update an existing story
    deleteStory(_id: ID!): Story # Mutation to delete a story
    addFriend(friendId: ID!): User # Mutation to add a friend to the current user
  }
`;

module.exports = typeDefs;
