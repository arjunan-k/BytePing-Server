import express from "express";
import registerUser from "../controller/registerUser";
import authUser from "../controller/authUser";
import allUsers from "../controller/allUsers";

const userRoutes = express.Router();

userRoutes.route("/").get(allUsers);
userRoutes.route("/register").post(registerUser);
userRoutes.post("/login", authUser);

export default userRoutes;
