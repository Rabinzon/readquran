const process = require("process");
const { Pool } = require("pg");
const { parse } = require("pg-connection-string");

const config = parse(process.env.DATABASE_URL);

const pool = new Pool(config);

module.exports = {
  ...pool,
  query: async (text, params) => {
    const { rows } = await pool.query(text, params);

    return rows;
  },
};
