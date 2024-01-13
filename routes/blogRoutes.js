const express = require("express");

const {
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_details,
  blog_index,
} = require("../controllers/blogController");

const router = express.Router();

router.post("/", blog_create_post);

router.get("/create", blog_create_get);

router.get("/", blog_index);

router.get("/:id", blog_details);

router.delete("/:id", blog_delete);

module.exports = router;
