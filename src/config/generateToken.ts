import jwt, { Secret } from "jsonwebtoken";

const generateToken = (id: any) => {
  const secretOrPrivateKey: Secret = process.env.JWT_SECRET || "default-secret";
  return jwt.sign({ id }, secretOrPrivateKey, { expiresIn: "30d" });
};

export default generateToken;
