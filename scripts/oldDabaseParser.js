// const db = require("../db");
//
// const process = require("process");
// const { Pool } = require("pg");
// const { parse } = require("pg-connection-string");
//
// const config = parse(
//   "postgresql://postgres:niltXF6zahZMgw4N2Q8QrA2Z1uOZ73l0ddFX9lKffNf5AS2pcv7CesJPutm5UHOt@91.142.74.128:5444/postgres",
// );
//
// const oldDB = new Pool(config);
//
// (async function () {
//   const { rows } = await oldDB.query(`select * from "Verse"`);
//   for (const row of rows) {
//     console.log(row);
//     await db.query(
//       `insert into verse(text, position, translation_id, chapter_id) values ($1, $2, $3, $4)`,
//       [row.text, row.order, row.translationId, row.chapterId],
//     );
//   }
//   console.log(rows);
// })();
