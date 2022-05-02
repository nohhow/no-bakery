const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  res.send({ test: "hi"});
});

router.get('/login', (req, res)=>{
  res.send({data:"jinhyun"})
})

router.get('/:itemid', (req, res)=>{
  var itemId = parseInt(req.params.itemid, 10)
  res.send({data:`${itemId}`})
})


module.exports = router;