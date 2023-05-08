const jwt = require('jsonwebtoken'); // Import the jsonwebtoken package to create and verify JSON web tokens

const secret = '45432THISISASECRET987345!!'; // Define the secret used to sign and verify tokens
const expiration = '1h'; // Define the expiration time for tokens

module.exports = {
  authMiddleware: function ({ req }) {
    // Get the token from the request body, query string, or authorization header
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the token was included in the authorization header, remove the "Bearer " prefix
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If there is no token, return the request object unchanged
    if (!token) {
      return req;
    }

    try {
      // Verify the token and extract the user data
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Add the user data to the request object
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, _id, age, weight, height }) {
    // Create a payload containing the user data to be included in the token
    const payload = { username, _id, age, weight, height };

    // Sign the token using the secret and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
