const express = require("express");

//db
const db = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g);

    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id
    });

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() }
          })
        )
      );

      await newPost.addPosthashtags(result.map(r => r[0]));
    }

    // const User = await newPost.getUser();
    // newPost.user = User;
    // res.json(fullPost);

    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User
        }
      ]
    });

    res.json(fullPost);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post("/images", (req, res) => {});

module.exports = router;
