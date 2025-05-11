const db = require("../db");

const map = new Map();
map.set(2, [177, 143, 144, 149, 150])

exports.up = async () => {
  try {
    await db.query('begin');

    const [topic] = await db.query(
      `insert into topic(name) values('Кибла') returning id`,
      []
    );

    for await (const [chapterId, versePositions] of map) {
      await db.query(`
        insert into topic_verse (topic_id, verse_id)
        (
          select $1 as topic_id, id as verse_id 
          from verse where chapter_id = $2 and position = any($3)
        );
      `,
        [topic.id, chapterId, versePositions]
      );
    }
    await db.query('commit')
  } catch (e) {
    await db.query('rollback')
    throw e
  }
};

exports.down = () => {};
