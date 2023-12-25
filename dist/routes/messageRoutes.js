"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authHandler_1 = __importDefault(require("../middleware/authHandler"));
const messageControllers_1 = require("../controller/messageControllers");
const messageRoutes = express_1.default.Router();
messageRoutes.route("/").post(authHandler_1.default, messageControllers_1.sendMessage);
messageRoutes.route("/:chatId").get(authHandler_1.default, messageControllers_1.allMessages);
exports.default = messageRoutes;
