"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authHandler_1 = __importDefault(require("../middleware/authHandler"));
const chatControllers_1 = require("../controller/chatControllers");
const chatRoutes = express_1.default.Router();
chatRoutes.route("/").post(authHandler_1.default, chatControllers_1.accessChat);
chatRoutes.route("/").get(authHandler_1.default, chatControllers_1.fetchChats);
chatRoutes.route("/group").post(authHandler_1.default, chatControllers_1.createGroupChat);
chatRoutes.route("/rename").put(authHandler_1.default, chatControllers_1.renameGroup);
chatRoutes.route("/groupadd").put(authHandler_1.default, chatControllers_1.addToGroup);
chatRoutes.route("/groupremove").put(authHandler_1.default, chatControllers_1.removeFromGroup);
exports.default = chatRoutes;
