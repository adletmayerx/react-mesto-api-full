const Card = require('../models/cards');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
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
      if (e instanceof NotFoundError) {
        console.log(`Произошла ошибка ${e.name} c текстом ${e.message}, но мы её обработали`);
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
      if (!card) {
        throw new ValidationError('Переданы некорректные данные при создании карточки');
      }
      res.send({ data: card });
    })
    .catch((e) => {
      if (e instanceof ValidationError) {
        console.log(`Произошла ошибка ${e.name} c текстом ${e.message}, но мы её обработали`);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
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
      if (e instanceof NotFoundError) {
        console.log(`Произошла ошибка ${e.name} c текстом ${e.message}, но мы её обработали`);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
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
      if (e instanceof NotFoundError) {
        console.log(`Произошла ошибка ${e.name} c текстом ${e.message}, но мы её обработали`);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
