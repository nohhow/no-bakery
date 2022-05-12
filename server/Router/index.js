const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ test: "hi" });
});

router.get("/login", (req, res) => {
  res.send({ data: "Log-in" });
});

router.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, data) => {
    if (!err) res.send({ db: data });
    else res.send(err);
  });
});
router.get("/db-test", (req, res) => {
  db.query("SELECT * FROM login_info", (err, data) => {
    if (!err) res.send({ products: data });
    else res.send(err);
  });
});

router.get("/:itemid", (req, res) => {
  const itemId = parseInt(req.params.itemid, 10);

  db.query(`SELECT * FROM products WHERE id = ${itemId}`, (err, data) => {
    if (!err) res.send({ db: data });
    else res.send(err);
  });
});

module.exports = router;
