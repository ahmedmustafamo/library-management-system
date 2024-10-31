const jwt = require('jsonwebtoken');

// Middleware to check for token in the request headers
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  });
};

// Export the middleware
module.exports = authenticateToken;
