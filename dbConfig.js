const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "sql.freedb.tech",
  user: "freedb_rs_sehat_waras",
  password: "CR$RjJ&9dA2&75F",
  database: "freedb_data-patients",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
