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
  db.query("SELECT * FROM user", (err, data) => {
    if (!err) res.send({ products: data });
    else res.send(err);
  });
});

router.get("/check_user/:kakaoid", (req, res) => {
  const kakaoId = parseInt(req.params.kakaoid, 10);
  console.log(kakaoId)
  db.query(`SELECT COUNT(*) as count FROM user WHERE kakaoid = ${kakaoId}`, (err, data) => {
    if (!err) res.send({ code : data});
    else res.send(err);
  })
});

router.get("/:itemid", (req, res) => {
  const itemId = parseInt(req.params.itemid, 10);

  db.query(`SELECT * FROM products WHERE id = ${itemId}`, (err, data) => {
    if (!err) res.send({ db: data });
    else res.send(err);
  });
});

module.exports = router;
