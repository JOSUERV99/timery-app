const mysql = require('mysql2/promise');
const config = require('./conf');
const pool = mysql.createPool(config);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

module.exports = query