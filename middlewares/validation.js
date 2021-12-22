const { celebrate, CelebrateError, Joi } = require('celebrate');
const { isURL, isEmail } = require('validator');

module.exports.userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) {
        throw new CelebrateError('Введен некоректный email');
      }
      return value;
    }),
    password: Joi.string().required(),
  }),
});

module.exports.userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError('Введен некоректный url');
      }
      return value;
    }),
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) {
        throw new CelebrateError('Введен некоректный email');
      }
      return value;
    }),
    password: Joi.string().required(),
  }),
});

module.exports.userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError('Введен некоректный url');
      }
      return value;
    }).required(),
  }),
});

module.exports.cardIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports.cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new CelebrateError('Введен некоректный url');
      }
      return value;
    }),
  }),
});
