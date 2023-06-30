const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

// const secretKey = process.env.SECRET_KEY; -- не могу иначе пройти автотесты

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
