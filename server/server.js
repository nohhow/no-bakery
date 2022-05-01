const express = require('express');
const app = express();
const api = require('./Router/index');

app.use('/user_inform', api);

const port=3001; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});