const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "SxlentStudios API ayakta bro" });
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Yeni mesaj:", { name, email, message });

  // ileride DB bağlarız
  res.json({ status: "ok", message: "Mesaj alındı" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("API çalışıyor port:", port));
