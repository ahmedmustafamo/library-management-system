const jwt = require('jsonwebtoken');

// Middleware to check for token in the request headers
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Export the middleware
module.exports = authenticateToken;
