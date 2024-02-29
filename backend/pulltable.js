var sql = require("mssql");
var express = require("express");
var app = express();
// config for your database

var config = {
  user: "smit",
  password: "hello123",
  server: "localhost\\SQLEXPRESS",
  database: "Students",
  port: "5000",
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

const pullTable = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const sqlQuery =
      "SELECT * FROM Sheet1$ WHERE FromDate BETWEEN '2024-02-01' AND '2024-02-28'";
    const result = await pool.request().query(sqlQuery);
    return result.recordset;
  } catch (err) {
    throw err;
  }
};
exports.pullTable = pullTable;
