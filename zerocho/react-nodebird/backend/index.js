const express = require("express"); // 서버를 구성해주는 프레임워크

//  Logger
const morgan = require("morgan");

// cors
const cors = require("cors");

// cookie
const cookieParser = require("cookie-parser");
// session
const expressSession = require("express-session");

// dotenv
const dotenv = require("dotenv");

// passport
const passport = require("passport");
const passportConfig = require("./passport");


dotenv.config();

const db = require("./models");
const app = express();

// Route
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const postsAPIRouter = require("./routes/posts");

// DB
db.sequelize.sync();

passportConfig();

app.use(morgan("dev"));

app.use(express.json()); // json 처리
app.use(express.urlencoded({ extends: true })); // form 처리
app.use(cors({
  origin : true,
  credentials : true
}));
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie 암호화
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, // cookie 암호화
    cookie: {
      httpOnly: true,
      secure: false // https 쓸때 true
    },
    name : "rnbck",
  })
);
// 주의점
// passport 는 expressSession 이 먼저 실행된 후에 실행되어야함
// 서버 쪽에 세션, 클라이언트에 쿠키에서 누가 현재 로그인을 했는지 확인하는 작업을 모든 라우터에서 확인해야하기 때문에
// 이러한 작업들을 간편화 해주는 것이 passport
// 모든 라우터에 해당 비지니스 로직 적용
app.use(passport.initialize());
app.use(passport.session());


// Rest API
// controller
app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/posts", postsAPIRouter);

// 서버가 실행시 포트 설정
app.listen(3065, () => {
  console.log("server is running on http://localhost:3065");
});
