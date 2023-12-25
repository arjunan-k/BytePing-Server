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
exports.removeFromGroup = exports.addToGroup = exports.renameGroup = exports.createGroupChat = exports.fetchChats = exports.accessChat = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ChatModel_1 = __importDefault(require("../models/ChatModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const mongoose_1 = require("mongoose");
const accessChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        console.log("UserId param not sent with request");
        return;
    }
    let isChat = yield ChatModel_1.default.find({
        isGroupChat: false,
        $and: [
            {
                users: { $elemMatch: { $eq: req.user._id } },
            },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");
    isChat = yield UserModel_1.default.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });
    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
        try {
            const createdChat = yield ChatModel_1.default.create(chatData);
            const fullChat = yield ChatModel_1.default.findOne({
                _id: createdChat._id,
            }).populate("users", "-password");
            res.status(200).send(fullChat);
        }
        catch (error) {
            res.status(400);
            throw new mongoose_1.Error(error.message);
        }
    }
}));
exports.accessChat = accessChat;
const fetchChats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results = yield ChatModel_1.default.find({
            users: { $elemMatch: { $eq: req.user._id } },
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });
        results = yield UserModel_1.default.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
        });
        res.status(200).send(results);
    }
    catch (error) {
        res.status(400);
        throw new mongoose_1.Error(error.message);
    }
}));
exports.fetchChats = fetchChats;
const createGroupChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the details" });
    }
    let users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res
            .status(400)
            .send({ message: "Please select more than two users" });
    }
    users.push(req.user);
    try {
        const groupChat = yield ChatModel_1.default.create({
            chatName: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user,
        });
        const fullGroupChat = yield ChatModel_1.default.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        res.status(200).json(fullGroupChat);
    }
    catch (error) {
        res.status(400);
        throw new mongoose_1.Error(error.message);
    }
}));
exports.createGroupChat = createGroupChat;
const renameGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, chatName } = req.body;
    const updatedChat = yield ChatModel_1.default.findByIdAndUpdate(chatId, {
        chatName: chatName,
    }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!updatedChat) {
        res.status(404);
        throw new mongoose_1.Error("Chat not found");
    }
    else {
        res.json(updatedChat);
    }
}));
exports.renameGroup = renameGroup;
const addToGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    const addedUser = yield ChatModel_1.default.findByIdAndUpdate(chatId, {
        $push: { users: userId },
    }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!addedUser) {
        res.status(404);
        throw new mongoose_1.Error("Chat not found");
    }
    else {
        res.json(addedUser);
    }
}));
exports.addToGroup = addToGroup;
const removeFromGroup = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, userId } = req.body;
    const removeUser = yield ChatModel_1.default.findByIdAndUpdate(chatId, {
        $pull: { users: userId },
    }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!removeUser) {
        res.status(404);
        throw new mongoose_1.Error("Chat not found");
    }
    else {
        res.json(removeUser);
    }
}));
exports.removeFromGroup = removeFromGroup;
