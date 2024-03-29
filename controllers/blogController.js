const Blog = require("../models/blog");

const blog_index = (req, res) => {
  Blog.find()
    .sort({
      createdAt: -1,
    })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => res.status(404).render("404", { title: "Blog Not Found" }));
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create Blog" });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id).then(() => {
    res.json({ redirect: "/blogs" });
  });
};

module.exports = {
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_details,
  blog_index,
};
