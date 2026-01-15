import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (res, payload, rememberMe = false) => {
  const expiresIn = rememberMe ? "30d" : "7d";
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: maxAge,
    path: "/",
  });

  return token;
};