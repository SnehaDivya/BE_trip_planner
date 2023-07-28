const express = require("express");
const { Client } = require("pg");
const arr = [];
const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5433,
  password: "Sneha2001$",
  database: "Task",
});

module.exports = client;

// const Database = function () {
//   client.connect((err) => {
//     if (err) {
//       console.log("Database error" + err);
//     }
//   });

//   client.query(`SELECT * FROM user_table`, (err, res) => {
//     if (!err) {
//       console.log(res.rows);
//       //arr = res.rows;
//     } else {
//       console.log(err.message);
//     }

//     client.end;
//   });
//   client.query(`SELECT * FROM review_table`, (err, res) => {
//     if (!err) {
//       console.log(res.rows);
//       // arr = res.rows;
//     } else {
//       console.log(err.message);
//     }

//     client.end;
//   });
//   client.query(`SELECT * FROM destination_table`, (err, res) => {
//     if (!err) {
//       console.log(res.rows);
//       //arr = res.rows;
//     } else {
//       console.log(err.message);
//     }

//     client.end;
//   });
// };
