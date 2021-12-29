const userRouter = require('express').Router();
const {
  getUsers, getUser, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');
const {
  userAvatarValidation,
  userInfoValidation,
  userIdValidation,
} = require('../middlewares/validation');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:id', userIdValidation, getUser);
userRouter.patch('/me', userInfoValidation, updateProfile);
userRouter.patch('/me/avatar', userAvatarValidation, updateAvatar);

module.exports = userRouter;
