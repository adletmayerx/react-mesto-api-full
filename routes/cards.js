const cardRouter = require('express').Router();
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  cardValidation,
  cardIdValidation,
} = require('../middlewares/validation');

cardRouter.get('/', getCards);
cardRouter.delete('/:id', cardIdValidation, deleteCard);
cardRouter.post('/', cardValidation, createCard);
cardRouter.put('/:cardId/likes', cardIdValidation, likeCard);
cardRouter.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cardRouter;
