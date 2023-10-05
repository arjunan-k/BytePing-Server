import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { Secret } from "jsonwebtoken";
import User, { IUser } from "../models/userModel";

declare module "express-serve-static-core" {
  export interface Request {
    user: IUser;
  }
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const secretOrPublicKey: any = process.env.JWT_SECRET;
        const decoded: any = jwt.verify(token, secretOrPublicKey);
        req.user = await User.findById(decoded.id).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export default protect;
