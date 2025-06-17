const db = require("../db");

const map = new Map();
map.set(6, [68, 69]);
map.set(23, [1, 2, 3]);
map.set(19, [62]);
map.set(25, [72]);
map.set(28, [55]);
map.set(52, [23]);
map.set(56, [25, 26]);

exports.up = async () => {
  console.log(db);
  const client = await db.connect();

  try {
    await client.query('begin');

    const { rows: [topic] } = await client.query(
      `insert into topic(name) values('Пустословие') returning id`,
      []
    );

    for await (const [chapterId, versePositions] of map) {
      await client.query(`
        insert into topic_verse (topic_id, verse_id)
        (
          select $1 as topic_id, id as verse_id 
          from verse where chapter_id = $2 and position = any($3)
        );
      `,
        [topic.id, chapterId, versePositions]
      );
    }
    await client.query('commit')
  } catch (e) {
    await client.query('rollback')
    throw e
  }
};

exports.down = () => {};
