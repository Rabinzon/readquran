var express = require("express");
const db = require("../db");
var router = express.Router();

/* GET home page. */
router.get("/:id", async function (req, res) {
  console.log(req.params.id);
  const { rows } = await db.query(
    `
    select v.text, c.name, t.author, position, v.chapter_id from verse v
    join chapter c on c.id = v.chapter_id
    join translation t on t.id = v.translation_id
    where chapter_id = $1 and translation_id = 1
    order by position;`,
    [req.params.id],
  );

  res.render("chapter", {
    chapter_name: "Сура «Открывающая Книгу»",
    translation_author: "Перевод Кулиев Эльмир. Хронологический порядок 20.",
    verses: rows,
  });
});

module.exports = router;
