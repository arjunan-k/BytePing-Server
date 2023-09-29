import express from "express";
import Chats from "./data/data";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";

const app = express();

const whitelist = ["http://localhost:3000", "https://your-production-app.com"];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));
dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running Sucessfully");
});

app.use("/api/user", userRoutes);

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
