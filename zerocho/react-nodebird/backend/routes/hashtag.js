const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/:tag", async (req, res, next) => {
  try {
    let where = {};
    if (parseInt(req.query.lastId)) {
      where = {
        [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10)
      };
    }

    const posts = await db.Post.findAll({
      where,
      include: [
        {
          model: db.Hashtag,
          as: "Posthashtags",
          where: { name: decodeURIComponent(req.params.tag) } // 한글이 uri로 인코딩 되기 때문에 디코딩 해준다.
        },
        {
          model: db.User,
          attributes: ["id", "nickname"]
        },
        {
          model: db.Image
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
              model: db.Image
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]],
      limit: parseInt(req.query.limit, 10)
    });

    res.json(posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
