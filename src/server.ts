import express from "express";
import Chats from "./data/data";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("Apisdvndsb is running");
});

app.get("/api/chats", (req, res) => {
  res.send(Chats);
});

app.get("/api/chats/:id", (req, res) => {
  const id = req.params.id;
  res.send(Chats.find((chat) => chat._id === id));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT || 5000, () => {
  console.log(`Server running on port ${PORT}`);
});
