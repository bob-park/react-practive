const express = require("express"); // 서버를 구성해주는 프레임워크
const db = require("./models");
const app = express();

// Route
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");

// DB
db.sequelize.sync();

app.use(express.json()); // json 처리
app.use(express.urlencoded({ extends: true })); // form 처리

// Rest API
// controller
app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);

// 서버가 실행시 포트 설정
app.listen(3065, () => {
  console.log("server is running on http://localhost:3065");
});
