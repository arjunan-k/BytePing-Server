import mongoose from "mongoose";
import express from "express";
import registerUser from "../controller/registerUser";
import authUser from "../controller/authUser";

const userRoutes = express.Router();

userRoutes.route("/register").post(registerUser);
userRoutes.post("/login", authUser);

export default userRoutes;
