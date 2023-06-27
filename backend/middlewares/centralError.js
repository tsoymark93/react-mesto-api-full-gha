// eslint-disable-next-line no-unused-vars
const centralError = (err, req, res, next) => {
  if (!err.statusCode) {
    return res.status(500).json({ message: 'На сервере произошла ошибка' });
  }
  return res.status(err.statusCode).json({ message: err.message });
};

module.exports = centralError;
