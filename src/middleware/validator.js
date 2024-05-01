module.exports = (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    const error = new Error('Name parameter is required');
    error.status = 404;
    return next(error);
  }
  next();
};
