const express = require("express");
const router = express.Router();

// bcrypt
const bcrypt = require("bcrypt");

// DB
const db = require("../models");

// passport
const passport = require("passport");

// User
// 내 정보 조회
router.get("/", (req, res) => {});

// 남의 정보 조회
router.get("/:id", (req, res) => {});

// 회원가입
router.post("/", async (req, res, next) => {
  try {
    // DB 에서 하나만 찾음
    // 비동기 이기 때문에 항상 async - await 문법사용
    const exUser = await db.User.findOne({
      where: {
        userId: req.body.id
      }
    });

    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }

    // salt 는 서버 성능에 맞게
    // 클수록 더 복잡한 암호화
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      nickname: req.body.nickname,
      userId: req.body.id,
      password: hashedPassword
    });

    console.log(newUser);

    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    //return res.status(403).send(e);
    // next 는 에러를 넘길때(skip) 사용
    // 클라이언트에 해당 에러를 넘겨줌
    // TODO : exception 처리
    return next(e);
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log(err, user, info);

    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    // req.login() 을하게되면 passport.serializeUser()가 실행되어 쿠키를 생성
    return req.login(user, async loginErr => {
      try {
        if (loginErr) {
          return next(loginErr);
        }

        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [
            {
              model: db.Post,
              as : "Posts",
              attributes : ["id"]
            },
            {
              model: db.User,
              as : "Followers",
              attributes : ["id"]
            },
            {
              model: db.User,
              as : "Followings",
              attributes : ["id"]
            },
          ],
          attributes : ["id", "nickname", "userId"]
        });

        // Object copy
        const filteredUser = Object.assign({}, fullUser.toJSON());

        // password delete
        delete filteredUser.password;
        return res.json(filteredUser);
      } catch (e) {
        console.error(e);
        return next(e);
      }
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("logout 성공");
});

router.get("/:id/follow", (req, res) => {});

router.post("/:id/follow", (req, res) => {});

router.delete("/:id/follow", (req, res) => {});

router.delete("/:id/follower", (req, res) => {});

router.get("/:id/posts", (req, res) => {});

module.exports = router;
