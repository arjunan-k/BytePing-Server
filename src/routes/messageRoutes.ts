import express from "express";
import protect from "../middleware/authHandler";
import { sendMessage } from "../controller/messageControllers";

const messageRoutes = express.Router();

messageRoutes.route("/").post(protect, sendMessage);
// messageRoutes.route("/:chatId").get(protect, allMessages);

export default messageRoutes;
