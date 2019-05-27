const express = require("express");

const db = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let where = {};

    if (parseInt(req.query.lastId, 10)) {
      where = {
        id : {
          [db.Sequelize.Op.lt] : parseInt(req.query.lastId, 10), // less then
        }
      }
    }

    const posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        },
        {
          model: db.Image
        },
        {
          model: db.User,
          through: "Like",
          as: "Likers",
          attributes: ["id"]
        },
        {
          model: db.Post,
          as: "Retweet",
          include: [
            {
              model: db.User,
              attributes: ["id", "nickname"]
            },
            {
              model: db.Image,
              order: [["id", "DESC"]]
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]], // 2차원 배열인 이유는 조건을 여러개 줄수 있도록 하기 위함이다.
      limit: parseInt(req.query.limit, 10)
    });

    res.json(posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post("/images", (req, res) => {});

module.exports = router;
