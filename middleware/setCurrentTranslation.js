const db = require("../db");

let translationsCache;

module.exports = async function (req, res, next) {
  const translationId = Number(req.cookies.translationId) || 1;

  if (!translationsCache) {
    const translations = await db.query(`select id, author from translation`);
    translationsCache = {};

    translations.forEach((translation) => {
      translationsCache[translation.id] = translation;
    }, {});
  }

  req.translation = translationsCache[translationId];

  next();
};
