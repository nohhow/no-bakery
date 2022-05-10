const express = require('express');
const router = express.Router();

const url = "http://localhost:3001/" // 서버 주소
// 임시 데이터 (상품 및 정보)
const products = [
  {
    id: 1,
    name: "마들렌",
    sub:"당은 덜고, 맛은 더한 마들렌",
    img: `${url}/img/dessert/madeleine.jpg`,
    category: "dessert",
  },
  {
    id: 2,
    name: "머핀",
    sub:"부드럽고 폭신한 머핀",
    img: `${url}/img/bread/muffin.jpg`,
    category: "bread",
  },
  {
    id: 3,
    name: "파운드케이크",
    sub:"퍽퍽하지 않은 파운드케이크",
    img: `${url}/img/bread/pound-cake.jpg`,
    category: "bread",
  },
  {
    id: 4,
    name: "브라우니",
    sub:"고급 초콜릿으로 만드는 브라우니",
    img: `${url}/img/dessert/brownie.jpg`,
    category: "dessert",
  },
  {
    id: 5,
    name: "쿠키",
    sub:"두툼하게 구워낸 기본 쿠키",
    img: `${url}/img/dessert/cookie.jpg`,
    category: "dessert",
  },
  {
    id: 6,
    name: "스모어 쿠키",
    sub:"쿠키와 달콤한 마시멜로의 만남",
    img: `${url}/img/dessert/smore.jpg`,
    category: "dessert",
  },
  {
    id:101,
    name: "드립커피",
    sub:"주인장 맘대로 내린 드립커피",
    img: `${url}/img/beverage/americano.jpg`,
    category: "beverage",
  },
  {
    id:102,
    name: "샹그리아",
    sub:"시원 달달하게 즐기는 과일주",
    img: `${url}/img/beverage/sangria.jpg`,
    category: "beverage",
  },
  {
    id:103,
    name: "밀크티",
    sub:"잔잔한 향, 달달한 밀크티",
    img: `${url}/img/beverage/milktea.jpg`,
    category: "beverage",
  },
];

router.get('/', (req, res)=>{
  res.send({ test: "hi"});
});

router.get('/login', (req, res)=>{
  res.send({data:"jinhyun"})
})

router.get('/products', (req, res)=>{
  res.send(products)
})

router.get('/:itemid', (req, res)=>{
  var itemId = parseInt(req.params.itemid, 10)
  itemInfo = products.filter((data) => data.id == itemId)[0] // 예외처리해야함. 데이터 없는 경우에 error 또는 no data 던져줄 수 있도록!
  res.send(itemInfo)
})


module.exports = router;