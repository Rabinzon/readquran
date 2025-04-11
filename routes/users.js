var express = require("express");
var router = express.Router();
var db = require("../db");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const { rows } = await db.query(
    "select id, name, chronological_order from chapter order by id",
  );

  res.render("index", { title: "Express", chapters: rows });
});

module.exports = router;
