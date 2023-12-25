"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("./data/data"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const whitelist = [
    "http://localhost:3000",
    "https://your-production-app.com",
    "https://byteping.vercel.app/",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
dotenv_1.default.config();
(0, db_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("API is Running Sucessfully");
});
app.use("/api/user", userRoutes_1.default);
app.use("/api/chat", chatRoutes_1.default);
app.use("/api/message", messageRoutes_1.default);
app.get("/api/dummy/chats", (req, res) => {
    const name = req.query.name;
    if (name) {
        const trimmedName = name.replace(/\s/g, "").toLowerCase();
        const filteredChats = data_1.default.filter((chat) => chat.chatName.replace(/\s/g, "").toLowerCase().includes(trimmedName));
        res.send(filteredChats);
    }
    else {
        res.send(data_1.default);
    }
});
app.get("/api/dummy/chats/:id", (req, res) => {
    const id = req.params.id;
    res.send(data_1.default.find((chat) => chat._id === id));
});
app.use(notFound_1.default);
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const SocketIO = new socket_io_1.Server(server, { pingTimeout: 60000, cors: corsOptions });
SocketIO.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    });
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log(`User Joined Room: ${room}`);
    });
    socket.on("typing", (room) => {
        socket.in(room).emit("typing");
    });
    socket.on("stop typing", (room) => {
        socket.in(room).emit("stop typing");
    });
    socket.on("new message", (newMessageReceived) => {
        let chat = newMessageReceived.chat;
        if (!chat.users)
            return console.log("chat.users not defined");
        chat.users.forEach((user) => {
            if (user._id === newMessageReceived.sender._id)
                return;
            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });
    socket.off("setup", (userData) => {
        console.log("User Disconnected");
        socket.leave(userData._id);
    });
});
