module.exports = (req, res, next) => {
  res.locals.translation = req.translation;
  res.locals.currentYear = new Date().getFullYear();

  next();
};
