import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid!"));

    req.user = user;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.email === "admin@brotein.com") {
    next();
  } else {
    next(errorHandler(403, "You are not authorized!"));
  }
};
