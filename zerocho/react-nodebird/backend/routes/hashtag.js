const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/:tag", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Hashtag,
          as : "Posthashtags",
          where: { name: decodeURIComponent(req.params.tag) }, // 한글이 uri로 인코딩 되기 때문에 디코딩 해준다.
        }, {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ],
      order : [["createdAt", "DESC"]]
    });

    res.json(posts);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
