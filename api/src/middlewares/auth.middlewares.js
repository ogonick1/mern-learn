const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddlewares = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'not Authorization' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecretKey'));
    if (decoded) {
      next();
    }
  } catch (e) {
    return res.status(401).json({ message: 'not Authorization' });
  }
};
module.exports = {
  authMiddlewares,
};
