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
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.send({ data: card });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else if (e instanceof NotFoundError) {
        console.log(`Произошла ошибка ${e.name} c текстом ${e.message}, но мы её обработали`);
        res.status(notFound).send({ message: e.message });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
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
      if (e.name === 'CastError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные при создании карточки' });
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
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      res.send(card);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else if (e instanceof NotFoundError) {
        console.log(`Произошла ошибка ${e.name} c текстом ${e.message}, но мы её обработали`);
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
  ).then((card) => {
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.send(card);
  })
    .catch((e) => {
      if (e.name === 'CastError') {
        res.status(badRequest).send({ message: 'Переданы некорректные данные для снятия лайка' });
      } else if (e instanceof NotFoundError) {
        console.log(`Произошла ошибка ${e.name} c текстом ${e.message}, но мы её обработали`);
        res.status(notFound).send({ message: e.message });
      } else {
        res.status(server).send({ message: 'Произошла ошибка' });
      }
    });
};
