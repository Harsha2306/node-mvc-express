const express = require("express");
const morgan = require("morgan");
//mongoose is used to create objectToDbSchemaMapping
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");
const { username, password, dbName } = require("./db-details");

const app = express();

const dbURI = `mongodb+srv://${username}:${password}@node-net-ninja.6zjhyv0.mongodb.net/${dbName}`;

//connecting to DB
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log("here");
    console.log(err);
  });

app.set("view engine", "ejs");

//logger module
app.use(morgan("dev"));
//middleware to look for public files
app.use(express.static("public"));
//middleware to parse request body
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found" });
});
