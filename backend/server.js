const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "testdb"
});

// when user adds data
app.post("/add", (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err) => {
      if (err) {
        console.log(err);
        res.send("Error");
      } else {
        res.send("User added");
      }
    }
  );
});

// when we want to get data
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) res.send(err);
    else res.json(result);
  });
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
  db.connect((err) => {
  if (err) {
    console.log("❌ DB ERROR:", err);
  } else {
    console.log("✅ Database Connected");
  }
});
});
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});