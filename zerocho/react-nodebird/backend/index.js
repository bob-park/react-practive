const express = require("express"); // 서버를 구성해주는 프레임워크
const app = express();

// Rest API
app.get("/", (req, res) => {
  res.send("hello, server")
});

app.get("/about", (req, res) => {
  res.send("about");
});

// 서버가 실행시 포트 설정
app.listen(3065, () => {
  console.log("server is running on http://localhost:3065");
});