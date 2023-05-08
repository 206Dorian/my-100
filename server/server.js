// Import required dependencies and files
const express = require('express'); // Express is a web framework for Node.js
const { ApolloServer } = require('apollo-server-express'); // Apollo Server is an open-source, spec-compliant GraphQL server that can be used with any GraphQL client
const path = require('path'); // The path module provides utilities for working with file and directory paths
const { authMiddleware } = require('./utils/auth'); // Import the authentication middleware to protect certain routes
const { typeDefs, resolvers } = require('./schemas'); // Import the type definitions and resolvers for the GraphQL API
const db = require('./config/connection'); // Import the connection to the MongoDB database

const PORT = process.env.PORT || 4000; // Define the port number for the server to listen on
const app = express(); // Create an instance of an Express app
const server = new ApolloServer({
  typeDefs, // Assign the imported type definitions to the Apollo Server instance
  resolvers, // Assign the imported resolvers to the Apollo Server instance
  context: authMiddleware, // Assign the imported authentication middleware to the Apollo Server instance
});

// Set up middleware to parse incoming requests with URL-encoded payloads and JSON payloads
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// If the app is in production mode, serve the static files from the build directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Set up a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// If the app is in production mode, serve the index.html file for any other route
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start(); // Start the Apollo server
  server.applyMiddleware({ app }); // Apply the Apollo server middleware to the Express app

  db.once('open', () => { // Once the database connection is open, start listening for requests
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
