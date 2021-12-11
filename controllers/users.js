const User = require('../models/users');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send({ data: user });
    })
    .catch((e) => {
      if (e instanceof NotFoundError) {
        console.log(`Произошла ошибка ${e.name} c текстом ${e.message}, но мы её обработали`);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      if (!user) {
        throw new ValidationError('Переданы некорректные данные при создании пользователя');
      }
      res.send({ data: user });
    })
    .catch((e) => {
      if (e instanceof ValidationError) {
        console.log(`Произошла ошибка ${e.name} c текстом ${e.message}, но мы её обработали`);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  }).then((user) => {
    console.log(user);
    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден.');
    }
    res.send(user);
  })
    .catch((e) => {
      if (e instanceof NotFoundError) {
        console.log(`Произошла ошибка ${e.name} c текстом ${e.message}, но мы её обработали`);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
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
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      res.send(user);
    })
    .catch((e) => {
      if (e instanceof NotFoundError) {
        console.log(`Произошла ошибка ${e.name} c текстом ${e.message}, но мы её обработали`);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
