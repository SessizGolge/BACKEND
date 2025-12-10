const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "musabsecret123"; // kimse görmemeli

// Post ekleme endpoint
app.post("/addPost", (req, res) => {
  const { key, title, description, image, link } = req.body;

  if (key !== SECRET_KEY) {
    return res.status(403).json({ status: "error", message: "Unauthorized" });
  }

  const postsPath = path.join(__dirname, "jsons", "posts.json");

  let posts = [];
  try {
    posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));
  } catch (e) {
    console.log("posts.json boş veya yok, yeni oluşturuluyor.");
  }

  const newPost = {
    img: image,
    text: description,
    date: new Date().toDateString(),
    link: link,
    title: title
  };

  posts.unshift(newPost);
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2), "utf-8");

  res.json({ status: "ok", post: newPost });
});

// Şifre kontrol endpoint
app.post("/checkKey", (req, res) => {
  const { key } = req.body;
  if (key === SECRET_KEY) return res.json({ status: "ok" });
  res.status(403).json({ status: "error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
