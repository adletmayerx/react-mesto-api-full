const cardRouter = require('express').Router();
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  cardValidation,
  cardIdValidation,
} = require('../middlewares/validation');

cardRouter.get('/', getCards);
cardRouter.post('/', cardValidation, createCard);
cardRouter.delete('/:id', cardIdValidation, deleteCard);
cardRouter.put('/:id/likes', cardIdValidation, likeCard);
cardRouter.delete('/:id/likes', cardIdValidation, dislikeCard);

module.exports = cardRouter;
