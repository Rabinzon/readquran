const express = require("express");
const db = require("../db");

const router = express.Router();

/* GET search page. */
router.get("/search", async (req, res) => {
  const verses = await db.query(
    `
      select id, text, position, translation_id, chapter_id from verse
      where translation_id = $1
      and to_tsvector('russian', text) @@ plainto_tsquery('russian', $2);
    `,
    [req.translation.id, req.query.query],
  );

  res.render("search", {
    query: req.query.query,
    verses,
  });
});

/* GET topics page. */
router.get("/topic", async (req, res) => {
  const topics = await db.query(
    `
      select id, name, created_at from topic
      order by created_at desc;
    `,
  );

  res.render("topics", {
    topics,
  });
});

/* GET topic page. */
router.get("/topic/:topicId", async (req, res) => {
  const topicId = Number(req.params.topicId);
  const [topic] = await db.query(`select id, name from topic where id = $1`, [topicId]);
  const verses = await db.query(
    `
      select v.id, v.text, v.chapter_id, v.created_at, v.position from topic_verse tv
      join verse v on v.id = tv.verse_id
      where tv.topic_id = $1 and v.translation_id = $2
      order by v.chapter_id asc, v.position asc;
    `,
    [topicId, req.translation.id],
  );

  res.render("topic", {
    topic,
    verses,
  });
});

router.get("/chronological", async function (req, res) {
  const chapters = await db.query(
    "select id, name, chronological_order from chapter order by chronological_order",
  );

  res.render("index", { chapters });
});


/* GET home page */
router.get("/", async function (req, res) {
  const chapters = await db.query(
    "select id, name, chronological_order from chapter order by id",
  );

  res.render("index", { chapters });
});

/* GET chapter or verse page */
router.get("/:params", async function (req, res) {
  const params = req.params.params.split(":");
  const chapterId = Number(params[0]);
  const versePosition = Number(params[1]);

  const [chapter] = await db.query(
    `select id, name, chronological_order from chapter where id = $1`,
    [chapterId],
  );

  if (versePosition) {
    const verses = await db.query(
      `
    select text, position, chapter_id, t.author, t.id as author_id from verse
    join translation t on t.id = translation_id
    where chapter_id = $1 and position = $2
    order by translation_id;
    `,
      [chapterId, versePosition],
    );

    res.render("verse", {
      chapter,
      verses,
    });

    return;
  }

  const verses = await db.query(
    `
    select text, position, chapter_id from verse
    where chapter_id = $1 and translation_id = $2
    order by position;
    `,
    [chapterId, req.translation.id],
  );

  res.render("chapter", {
    chapter,
    verses,
  });
});

module.exports = router;
