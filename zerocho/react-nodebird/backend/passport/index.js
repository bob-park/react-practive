const passport = require("passport");

const db = require("../models");

const local = require("./local");

// [1] 프론트에서 서버로 cookie 만 보냄
// [2] 서버가 cookie-parser, express-session 으로 cookie 검사 후 id 표출
// [3] 찾은 id 를 deserializeUser() 에 들어감

module.exports = () => {
  // 서버쪽에 [{id : 3, cookie : 'abc...'}] 이런식으로 저장
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });


  // 서버는 해당하는 쿠키로 하여금 아이디를 확인하여 라우터로 다시 보내줌
  // 요청 보낼때마다 deserializeUser()가 실행됨(db 요청 1회때 실행)
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
        include : [{
          model : db.Post,
          as : "Posts",
          attributes : ["id"], // 가져올 DB 의 column 를 의미
        }, {
          model : db.User,
          as : "Followers",
          attributes : ["id"],
        }, {
          model : db.User,
          as : "Followings",
          attributes : ["id"]
        }]
      });

      return done(null, user); // req.user 에 저장
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();
};
