const Card = require('../models/cards');
const NotFoundError = require('../errors/NotFoundError');
const { notFound, badRequest, server } = require('../errors/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(server).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
    .then((card) => {
      res.send({ data: card });
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

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(server).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
    .then((card) => {
      res.send(card);
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

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
    .then((card) => {
      res.send(card);
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
