const express = require('express');
const router = express.Router();

const products = [
  {
    id: 1,
    name: "마들렌",
    // img: `${madeleine}`,
    category: "dessert",
  },
  {
    id: 2,
    name: "머핀",
    // img: `${muffin}`,
    category: "bread",
  },
  {
    id: 3,
    name: "파운드케이크",
    // img: `${poundCake}`,
    category: "bread",
  },
  {
    id: 4,
    name: "브라우니",
    // img: `${brownie}`,
    category: "dessert",
  },
  {
    id: 5,
    name: "쿠키",
    // img: `${cookie}`,
    category: "dessert",
  },
  {
    id: 6,
    name: "스모어 쿠키",
    // img: `${smore}`,
    category: "dessert",
  },
];

router.get('/', (req, res)=>{
  res.send({ test: "hi"});
});

router.get('/login', (req, res)=>{
  res.send({data:"jinhyun"})
})

router.get('/:itemid', (req, res)=>{
  var itemId = parseInt(req.params.itemid, 10)
  itemInfo = products.filter((data) => data.id == itemId)[0]
  res.send(itemInfo)
})


module.exports = router;