import express from "express";
import mysql from "mysql";

const app = express();
const con = mysql.createConnection({
  host: "db",
  user: "root",
  password: "1234",
  database: "mydb",
  port: 3306,
});

con.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log("db 연결 성공!");
});

app.get("/", (req, res) => {
  res.send("server is on");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
