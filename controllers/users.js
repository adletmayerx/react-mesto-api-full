const User = require('../models/users');
const NotFoundError = require('../errors/NotFoundError');
const { notFound, badRequest, server } = require('../errors/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(server).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(badRequest).send({ message: 'Передан некорректный id' });
      } else if (e.name === 'NotFoundError') {
        res.status(notFound).send({ message: e.message });
      } else {
        res.status(server).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(server).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(badRequest).send({ message: 'Передан некорректный id' });
      } else if (e.name === 'NotFoundError') {
        res.status(notFound).send({ message: e.message });
      } else if (e.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(server).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(badRequest).send({ message: 'Передан некорректный id' });
      } else if (e.name === 'NotFoundError') {
        res.status(notFound).send({ message: e.message });
      } else if (e.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(server).send({ message: 'Произошла ошибка' });
      }
    });
};
