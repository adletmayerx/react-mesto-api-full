const {
  notFound, badRequest, server, conflict, notAuth,
} = require('../errors/constants');

module.exports = (e, req, res, next) => {
  if (e.name === 'MongoError' && e.code === 11000) {
    res.status(conflict).send({ message: 'Пользователь с таким email уже существует' });
  } else if (e.name === 'CastError') {
    res.status(badRequest).send({ message: 'Передан некорректный id' });
  } else if (e.name === 'NotFoundError') {
    res.status(notFound).send({ message: e.message });
  } else if (e.name === 'ValidationError') {
    res.status(badRequest).send({ message: 'Переданы некорректные данные' });
  } else if (e.name === 'NotAuthError') {
    res.status(notAuth).send({ message: e.message });
  } else if (e.name === 'ConflictError') {
    res.status(conflict).send({ message: e.message });
  } else {
    res.status(server).send({ message: 'Произошла ошибка' });
  }
  next();
};
