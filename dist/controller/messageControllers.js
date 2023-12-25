"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allMessages = exports.sendMessage = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const ChatModel_1 = __importDefault(require("../models/ChatModel"));
const sendMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        res.status(400).json({ message: "Invalid data passed" });
        return;
    }
    let newMessage = {
        sender: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        content: content,
        chat: chatId,
    };
    try {
        let message = yield messageModel_1.default.create(newMessage);
        message = yield message.populate("sender", "name pic");
        message = yield message.populate("chat");
        let ResponseMessage = yield UserModel_1.default.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });
        yield ChatModel_1.default.findByIdAndUpdate(req.body.chatId, {
            latestMessage: ResponseMessage,
        });
        res.status(200).json(ResponseMessage);
    }
    catch (error) {
        res.status(400).json({ message: "Failed to send message" });
        throw new Error(`Failed to send message ${error}`);
    }
}));
exports.sendMessage = sendMessage;
const allMessages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield messageModel_1.default.find({ chat: req.params.chatId })
            .populate("sender", "name pic email")
            .populate("chat");
        res.json(messages);
    }
    catch (error) {
        res.status(400).json({ message: "failed to fetch all messages" });
    }
}));
exports.allMessages = allMessages;
