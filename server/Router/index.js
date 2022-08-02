const express = require("express");
const db = require("../config/db");
const router = express.Router();
const multer = require("multer");
const path = require("path");
process.setMaxListeners(15);

// 모든 제품 정보 조회
router.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, data) => {
    if (!err) res.send({ db: data });
    else res.send(err);
  });
});

// 사용자 (카카오)회원번호 중복 체크
router.get("/check_user/:kakaoid", (req, res) => {
  const kakaoId = parseInt(req.params.kakaoid, 10);
  db.query(
    `SELECT COUNT(*) as count FROM user WHERE kakaoid = ${kakaoId}`,
    (err, data) => {
      if (!err) res.send({ code: data });
      else res.send(err);
    }
  );
});

// 사용자 회원가입
router.post("/register", (req, res) => {
  const userInfo = req.body.data;

  db.query(
    `INSERT INTO user (nickname, email, kakaoid, heart) VALUES ('${userInfo.name}', '${userInfo.email}', '${userInfo.id}', 0)`,
    (err, data) => {
      if (!err) res.send({ status: "good" });
      else res.send(err);
    }
  );
});

// 사용자 데이터 조회
router.post("/user-profile", (req, res) => {
  const userInfo = req.body.data;

  db.query(`SELECT * FROM user WHERE kakaoid = ${userInfo.id}`, (err, data) => {
    if (!err) res.send({ profile: data });
    else res.send(err);
  });
});

// admin 확인
router.post("/check-admin", (req, res) => {
  const userInfo = req.body.data;

  db.query(`SELECT email FROM user WHERE kakaoid = ${userInfo.id}`, (err, data) => {
    if (!err) res.send({ userEmail : data });
    else res.send(err);
  });
});

// 모든 사용자 리스트 조회
router.get("/all-user-data", (req, res)=>{
  db.query(`SELECT * FROM user`, (err, data)=>{
    if(!err) res.send({list : data});
    else res.send(err);
  })
})

// 모든 주문 조회
router.get("/all-order-data", (req, res)=>{
  db.query(`SELECT * FROM heroku_a8b02e79530eb78.order`, (err, data)=>{
    if(!err) res.send({list : data});
    else res.send(err);
  })
})

// 특정 사용자 주문 조회
router.post("/user-order-data", (req, res)=>{
  const userName = req.body.data.username

  db.query(`SELECT * FROM heroku_a8b02e79530eb78.order WHERE username = '${userName}' ORDER BY orderdate desc`, (err, data)=>{
    if(!err) res.send({list : data});
    else res.send(err);
  })
})

// 장바구니 추가
router.post("/addtocart", (req, res) => {
  const cartInfo = req.body.data;
  const itemId = cartInfo.itemid;
  const itemName = cartInfo.itemname;
  const quantity = cartInfo.q;
  const userId = cartInfo.userid;
  const itemImg = cartInfo.img;
  const itemPrice = cartInfo.price;
  db.query(
    `INSERT INTO cart (itemid, itemname, quantity, kakaoid, image, price) VALUES ('${itemId}', '${itemName}', '${quantity}', '${userId}', '${itemImg}', '${itemPrice}')`,
    (err, data) => {
      if (!err) res.send({ stauts: "good" });
      else res.send(err);
    }
  );
});

// 장바구니 삭제
router.post("/delete-cart-item", (req, res) => {
  const cartInfo = req.body.data;
  const itemId = cartInfo.itemid;
  const userId = cartInfo.userid;

  db.query(
    `DELETE FROM cart WHERE (itemid = '${itemId}') and (kakaoid = '${userId}')`,
    (err, data) => {
      if (!err) res.send({ stauts: "good" });
      else res.send(err);
    }
  );
});

// 장바구니 데이터 조회
router.post("/cart", (req, res) => {
  const userInfo = req.body.data;

  db.query(`SELECT * FROM cart WHERE kakaoid = ${userInfo.id}`, (err, data) => {
    if (!err) res.send({ cartData: data });
    else res.send(err);
  });
});

// 장바구니 초기화
router.post("/cart-clear", (req, res) => {
  const userInfo = req.body.data;

  db.query(`DELETE FROM heroku_a8b02e79530eb78.cart WHERE kakaoid = '${userInfo.id}'`, (err, data)=>{
    if (!err) res.send({ code : "success"});
    else res.send(err);
  })
})

// 주문 요청 저장
router.post("/order", (req, res) => {
  const orderInfo = req.body.data;
  db.query(`INSERT INTO heroku_a8b02e79530eb78.order (username, userEmail, itemList, quantityList, price, orderdate, status) VALUES ('${orderInfo.userName}', '${orderInfo.email}', '${orderInfo.itemList}', '${orderInfo.quantityList}', '${orderInfo.price}', DEFAULT, 'request')`, (err, data) =>{
    if (!err) res.send({ code: "success" });
    else res.send(err);
  })
})

// 하트 감소
router.post("/order/paid", (req, res)=>{
  const orderInfo = req.body.data;
  db.query(`UPDATE heroku_a8b02e79530eb78.user SET heart=heart-${orderInfo.price} WHERE kakaoid = ${orderInfo.userId}`, (err, data)=>{
    if (!err) res.send({ code: "success" });
    else res.send(err);
  })
})

// 주문 취소 요청
router.post("/cancelOrder", (req, res) => {
  const orderInfo = req.body.data;
  db.query(`UPDATE heroku_a8b02e79530eb78.order SET status = 'canceled' WHERE orderNumber = '${orderInfo.orderId}'`, (err, data) => {
    if (!err) res.send({ code: "success" });
    else res.send(err);
  })
})

// 하트 증가
router.post("/order/refund", (req, res)=>{
  const orderInfo = req.body.data;
  db.query(`UPDATE heroku_a8b02e79530eb78.user SET heart=heart+${orderInfo.price} WHERE kakaoid = ${orderInfo.userId}`, (err, data)=>{
    if (!err) res.send({ code: "success" });
    else res.send(err);
  })
})

// Admin의 주문 현황 변경 요청
router.post("/update-order-status", (req, res) => {
  const orderInfo = req.body.data;
  db.query(`UPDATE heroku_a8b02e79530eb78.order SET status = '${orderInfo.new_status}' WHERE orderNumber = '${orderInfo.orderNumber}'`, (err, data) => {
    if (!err) res.send({ code: "success" });
    else res.send(err);
  })
})

// Admin의 회원 정보 변경 요청
router.post("/update-user-info", (req, res)=> {
  const userInfo = req.body.data;
  db.query(`UPDATE heroku_a8b02e79530eb78.user SET heart = ${userInfo.heartNum} WHERE kakaoid = '${userInfo.id}'`, (err, data) => {
    if (!err) res.send({ code: "success" });
    else res.send(err);
  })
})

// Admin의 제품 정보 변경 요청
router.post("/update-products-info", (req, res)=> {
  const itemInfo = req.body.data;
  db.query(`UPDATE heroku_a8b02e79530eb78.products SET name = '${itemInfo.name}', sub = '${itemInfo.sub}', category='${itemInfo.category}', price=${itemInfo.price}, img='${itemInfo.img}' WHERE id = ${itemInfo.id}`, (err, data) => {
    if (!err) res.send({ code: "success" });
    else res.send(err);
  })
})

// Admin의 제품 등록 요청
router.post("/add-products-info", (req, res) => {
  const itemInfo = req.body.data;
  db.query(`INSERT INTO heroku_a8b02e79530eb78.products (id, name, sub, category, price, img) VALUES ('${itemInfo.id}','${itemInfo.name}','${itemInfo.sub}','${itemInfo.category}',${itemInfo.price}, '${itemInfo.img}')`, (err, data) => {
    if (!err) res.send({ code: "success" });
    else res.send(err);
  })
})

// multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname.replace('Router', "")+ "public/img");
  },
  filename: function (req, file, callback) {
    callback(null, "imgfile" + Date.now() + path.extname(file.originalname));
  },
});
console.log(__dirname.replace('Router', ""));
// 업로드 옵션
const upload = multer({
  storage: storage,
  // limits: { fileSize: 1000000 },
});

router.post("/img-upload", upload.single("img"), function (req, res, next) {
  console.log(req.file);
  res.send({
    fileName: req.file.filename,
  });
});

// 해당 아이템 정보 조회
router.get("/:itemid", (req, res) => {
  const itemId = parseInt(req.params.itemid, 10);
  db.query(`SELECT * FROM products WHERE id = ${itemId}`, (err, data) => {
    if (!err) res.send({ db: data });
    else res.send(err);
  });
});

module.exports = router;
