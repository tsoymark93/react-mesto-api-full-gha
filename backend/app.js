require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
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

app.use(bodyParser.json());
const { validationCreateUser, validationLogin } = require('./middlewares/validation');

mongoose.connect(PATH, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
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

app.post('/api/check-token', (req, res) => {
  const token = req.headers.authorization; // Получаем токен из заголовка Authorization

  // Здесь вам необходимо провести проверку токена с использованием вашей аутентификационной логики
  // Проверьте, является ли токен действительным и связан ли он с аутентифицированным пользователем

  // Пример проверки токена: просто проверяем, является ли токен "valid-token"
  if (token === 'valid-token') {
    // Токен действителен, возвращаем успешный ответ
    res.status(200).json({ message: 'Token is valid' });
  } else {
    // Токен недействителен, возвращаем код состояния Unauthorized
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
