const { gql } = require('apollo-server-express');

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
    Users: [User]
    user: User
    Books:[Book]
    me: User
    Stories: [Story]
    story(_id: ID!): Story
  }



  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    deleteUser(username: String!): User
    updateUser(height: String!, weight: String!, age: String!): User
    createStory(title: String!, body: String!): Story
    updateStory(_id: ID!, title: String, body: String): Story
    deleteStory(_id: ID!): Story
    addFriend(friendId: ID!): User 
  }

`;

module.exports = typeDefs;
