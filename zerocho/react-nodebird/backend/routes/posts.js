const express = require("express");

const db = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ],
      order : [["createdAt", "DESC"]] // 2차원 배열인 이유는 조건을 여러개 줄수 있도록 하기 위함이다.
    });

    res.json(posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post("/images", (req, res) => {});

module.exports = router;
