require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const centralError = require('./middlewares/centralError');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const { PATH = 'mongodb://127.0.0.1:27017/mestodb' } = process.env.PATH;
const app = express();

app.use(cors());
app.use(bodyParser.json());
const { validationCreateUser, validationLogin } = require('./middlewares/validation');

mongoose.connect(PATH, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(requestLogger);

app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.get('/signin', (req, res) => {
  res.redirect('/');
});

app.get('/signup', (req, res) => {
  res.redirect('/');
});

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);
app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errorLogger);
app.use(errors());
app.use(centralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
