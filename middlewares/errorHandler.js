const { server } = require('../errors/constants');

module.exports = (e, req, res, next) => {
  const statusCode = e.statusCode || server;
  const message = statusCode === server ? 'Произошла ошибка' : e.message;
  res.status(statusCode).send({ message });
  next();
};
