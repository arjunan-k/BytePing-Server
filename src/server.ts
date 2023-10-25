import express from "express";
import Chats from "./data/data";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";
import notFound from "./middleware/notFound";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";

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
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/api/dummy/chats", (req, res) => {
  const name: string = req.query.name as string;
  if (name) {
    const trimmedName = name.replace(/\s/g, "").toLowerCase();
    const filteredChats = Chats.filter((chat) =>
      chat.chatName.replace(/\s/g, "").toLowerCase().includes(trimmedName)
    );
    res.send(filteredChats);
  } else {
    res.send(Chats);
  }
});

app.get("/api/dummy/chats/:id", (req, res) => {
  const id = req.params.id;
  res.send(Chats.find((chat) => chat._id === id));
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT || 5000, () => {
  console.log(`Server running on port ${PORT}`);
});
