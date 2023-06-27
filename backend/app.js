require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const centralError = require('./middlewares/centralError');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const { PATH = 'mongodb://localhost:27017/mestodb' } = process.env.PATH;
const app = express();

app.use(bodyParser.json());
const { validationCreateUser, validationLogin } = require('./middlewares/validation');

// eslint-disable-next-line max-len
mongoose.connect(PATH, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errors());
app.use(centralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
