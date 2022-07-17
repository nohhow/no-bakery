const express = require("express");
const app = express();
const api = require("./Router/index");
app.use(express.json());

// 라우팅
app.use("/info", api);

// 정적 파일 서비스
app.use(express.static(__dirname + "/public"));

// const PORT = 3001; //React가 3000번 포트를 사용하기 때문에 node 서버가 사용할 포트넘버는 다른 넘버로 지정해준다.
app.listen((process.env.PORT || 3001), () => {
  console.log(`Listening on port 3001}`);
});