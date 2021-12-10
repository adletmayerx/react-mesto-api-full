const userRouter = require('express').Router();
const {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
