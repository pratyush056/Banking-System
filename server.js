const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "BankingSystem"
});

db.connect(err => {
  if (err) {
    console.error("❌ DB Error:", err);
    return;
  }
  console.log("✅ MySQL Connected");
});

// ================= APIs =================

// 🔹 GET Accounts
app.get("/accounts", (req, res) => {
  db.query("SELECT * FROM account", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🔹 GET Customers
app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customer", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🔹 GET Transactions
app.get("/transactions", (req, res) => {
  db.query("SELECT * FROM transaction ORDER BY transaction_date DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🔹 GET Loans
app.get("/loans", (req, res) => {
  db.query("SELECT * FROM loan", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🔹 GET EMI
app.get("/emi", (req, res) => {
  db.query("SELECT * FROM emi", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🔹 GET Cards
app.get("/cards", (req, res) => {
  db.query("SELECT * FROM card", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🔹 GET Branches
app.get("/branches", (req, res) => {
  db.query("SELECT * FROM branch", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🔹 GET Employees
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🔹 ADD Customer
app.post("/customers", (req, res) => {
  const { name, email, phone, address } = req.body;

  db.query(
    "INSERT INTO customer (name,email,phone,address) VALUES (?,?,?,?)",
    [name, email, phone, address],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Customer Added" });
    }
  );
});

// 🔹 TRANSACTION (Deposit / Withdraw)
app.post("/transaction", (req, res) => {
  const { account_id, type, amount } = req.body;

  if (!account_id || !type || !amount) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const op = type === "Deposit" ? "+" : "-";

  db.query(
    `UPDATE account SET balance = balance ${op} ? WHERE id = ?`,
    [amount, account_id],
    (err) => {
      if (err) return res.status(500).json(err);

      db.query(
        "INSERT INTO transaction (account_id, transaction_type, amount) VALUES (?, ?, ?)",
        [account_id, type, amount],
        (err2) => {
          if (err2) return res.status(500).json(err2);

          res.json({ message: "Transaction Successful" });
        }
      );
    }
  );
});

// ================= START SERVER =================

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});