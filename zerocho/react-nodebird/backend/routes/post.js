const express = require("express");

//db
const db = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const newPost = await db.Post.create({
      content : req.body.content
    });
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.post("/images", (req, res) => {});

module.exports = router;
