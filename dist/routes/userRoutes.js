"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerUser_1 = __importDefault(require("../controller/registerUser"));
const authUser_1 = __importDefault(require("../controller/authUser"));
const allUsers_1 = __importDefault(require("../controller/allUsers"));
const authHandler_1 = __importDefault(require("../middleware/authHandler"));
const userRoutes = express_1.default.Router();
userRoutes.route("/").get(authHandler_1.default, allUsers_1.default);
userRoutes.route("/register").post(registerUser_1.default);
userRoutes.post("/login", authUser_1.default);
exports.default = userRoutes;
