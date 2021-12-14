const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { notFound } = require('./errors/constants');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '61b35814273ed3f11753db54',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(notFound).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});
