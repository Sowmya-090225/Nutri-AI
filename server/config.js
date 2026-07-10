const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-very-secret-key-change-it';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err.message);
      return res.status(401).json({ message: 'Unauthorized: ' + err.message });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { JWT_SECRET, authenticate };
