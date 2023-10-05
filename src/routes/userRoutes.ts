import express from "express";
import registerUser from "../controller/registerUser";
import authUser from "../controller/authUser";
import allUsers from "../controller/allUsers";
import protect from "../middleware/authHandler";

const userRoutes = express.Router();

userRoutes.route("/").get(protect, allUsers);
userRoutes.route("/register").post(registerUser);
userRoutes.post("/login", authUser);

export default userRoutes;
