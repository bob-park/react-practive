const express = require("express");

//db
const db = require("../models");

const { isLoggedIn } = require("./middleware");

const router = express.Router();

const path = require("path");

// multer
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 확장자 추출
      const basename = path.basename(file.originalname, ext); // 파일이름 추출

      done(null, basename + new Date().valueOf() + ext);
    }
  }),
  limits: {
    fileSize: 20 * 1024 * 1024
  }
});

// files는 req.files, contents 는 req.body
router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
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

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지 여러개
        const images = await Promise.all(
          req.body.image.map(image => {
            return db.Image.create({ src: image });
          })
        );

        await newPost.addImage(images);
      } else {
        // 이미지 1개
        const image = await db.Image.create({
          src: req.body.image
        });
        await newPost.addImage(image);
      }
    }

    // const User = await newPost.getUser();
    // newPost.user = User;
    // res.json(fullPost);
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User
        },
        {
          model: db.Image
        }
      ]
    });

    res.json(fullPost);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

// 파일 여러개인 경우 upload.array
router.post("/images", upload.array("image"), async (req, res) => {
  console.log(req.files);
  res.json(req.files.map(file => file.filename));
});

router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id }
    });

    if (!post) {
      return res.state(404).send("게시물이 존재하지 않습니다.");
    }

    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id
      },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });

    res.json(comments);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post("/:id/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id }
    });

    if (!post) {
      return res.state(404).send("게시물이 존재하지 않습니다.");
    }

    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content
    });

    await post.addComment(newComment.id);

    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "nickname"]
        }
      ]
    });

    return res.json(comment);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post("/:id/like", isLoggedIn, async (req, res, next) => {

  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!post) {
      return res.status(404).send("게시물이 존재하지 않습니다.");
    }

    await post.addLiker(req.user.id);

    res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!post) {
      return res.status(404).send("게시물이 존재하지 않습니다.");
    }

    await post.removeLiker(req.user.id);

    res.json({ userId: req.user.id });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
