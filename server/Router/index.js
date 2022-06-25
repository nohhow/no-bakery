const express = require("express");
const db = require("../config/db");
const router = express.Router();

// 모든 제품 정보 반환
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
    `INSERT INTO user (nickname, email, kakaoid, heart) VALUES ('${userInfo.name}', '${userInfo.email}', '${userInfo.id}', 10)`,
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
  db.query(`SELECT * FROM user_info.order`, (err, data)=>{
    if(!err) res.send({list : data});
    else res.send(err);
  })
})

// 특정 사용자 주문 조회
router.post("/user-order-data", (req, res)=>{
  const userName = req.body.data.username

  db.query(`SELECT * FROM user_info.order WHERE username = '${userName}' ORDER BY orderdate desc`, (err, data)=>{
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

  db.query(`DELETE FROM user_info.cart WHERE kakaoid = '${userInfo.id}'`, (err, data)=>{
    if (!err) res.send({ code : "success"});
    else res.send(err);
  })
})

// 주문 요청 저장
router.post("/order", (req, res) => {
  const orderInfo = req.body.data;
  db.query(`INSERT INTO user_info.order (username, userEmail, itemList, quantityList, price, orderdate, status) VALUES ('${orderInfo.userName}', '${orderInfo.email}', '${orderInfo.itemList}', '${orderInfo.quantityList}', '${orderInfo.price}', DEFAULT, 'request')`, (err, data) =>{
    if (!err) res.send({ code: "success" });
    else res.send(err);
  })
})

// 주문 취소 요청
router.post("/cancelOrder", (req, res) => {
  const orderInfo = req.body.data;
  db.query(`UPDATE user_info.order SET status = 'canceled' WHERE orderNumber = '${orderInfo.orderId}'`, (err, data) => {
    if (!err) res.send({ code: "success" });
    else res.send(err);
  })
})

// Admin의 주문 현황 변경 요청
router.post("/update-order-status", (req, res) => {
  const orderInfo = req.body.data;
  db.query(`UPDATE user_info.order SET status = '${orderInfo.new_status}' WHERE orderNumber = '${orderInfo.orderNumber}'`, (err, data) => {
    if (!err) res.send({ code: "success" });
    else res.send(err);
  })
})

// 해당 아이템 정보 반환
router.get("/:itemid", (req, res) => {
  const itemId = parseInt(req.params.itemid, 10);

  db.query(`SELECT * FROM products WHERE id = ${itemId}`, (err, data) => {
    if (!err) res.send({ db: data });
    else res.send(err);
  });
});

module.exports = router;
