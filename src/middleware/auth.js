const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.header('token');
    if (!token) {
      return res.status(400).json({ message: 'Token not provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};
