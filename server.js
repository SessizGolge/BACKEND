const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "musabsecret123"; // Sadece backend'te duruyor

// GET posts → frontend için
app.get("/posts", (req, res) => {
  const postsPath = path.join(__dirname, "jsons", "posts.json");
  const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));
  res.json(posts);
});

// POST /addPost → dev mod için
app.post("/addPost", (req, res) => {
  const { key, title, description, image, link } = req.body;

  if(key !== SECRET_KEY) return res.status(403).json({ status: "error", message: "Unauthorized" });

  const postsPath = path.join(__dirname, "jsons", "posts.json");
  const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

  const newPost = {
    img: image || "",
    text: description || "",
    date: new Date().toDateString(),
    link: link || "",
    title: title || ""
  };

  posts.unshift(newPost);
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), "utf-8");

  res.json({ status: "ok", post: newPost });
});

app.listen(3000, () => console.log("Backend running on port 3000"));
