const cardRouter = require('express').Router();
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.delete('/:id', deleteCard);
cardRouter.post('/', createCard);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRouter;
