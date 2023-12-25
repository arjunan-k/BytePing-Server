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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const generateToken_1 = __importDefault(require("../config/generateToken"));
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }
    const userExists = yield UserModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = yield UserModel_1.default.create({
        name,
        email,
        password,
        pic,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: (0, generateToken_1.default)(user._id),
        });
    }
    else {
        throw new Error("Failed to create the user");
    }
}));
exports.default = registerUser;
