var express = require("express");
const db = require("../db");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res) {
  const { rows } = await db.query(
    "select id, name, chronological_order from chapter order by id",
  );

  res.render("index", { title: "Перевод Корана", chapters: rows });
});

module.exports = router;
