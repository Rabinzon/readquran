const pkg = require('../package.json');
module.exports = (req, res, next) => {
  res.locals.translation = req.translation;
  res.locals.currentYear = new Date().getFullYear();
  res.locals.version = pkg.version;
  res.locals.isAnaliticsEnabled = req.app.get("env") === "production";

  next();
};
