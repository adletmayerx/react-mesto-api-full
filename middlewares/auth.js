const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');

const { JWT_SECRET = 'secret-jwt-key' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new NotAuthError('Авторизуйтесь, пожалуйста');
  }
  req.user = payload;

  next();
};
