import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Message from "../models/messageModel";
import User from "../models/UserModel";
import Chat from "../models/ChatModel";

const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400).json({ message: "Invalid data passed" });
    return;
  }

  let newMessage = {
    sender: req.user?._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    let ResponseMessage = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: ResponseMessage,
    });
    res.status(200).json(ResponseMessage);
  } catch (error) {
    res.status(400).json({ message: "Failed to send message" });
    throw new Error(`Failed to send message ${error}`);
  }
});

const allMessages = asyncHandler(async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: "failed to fetch all messages" });
  }
});

export { sendMessage, allMessages };
