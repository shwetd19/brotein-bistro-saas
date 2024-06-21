import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import ActiveSubscription from "../models/activeSubscription.model.js";

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

export const isActiveSubscriber = async (req, res, next) => {
  const userId = req.user._id; // Assuming req.user is set by verifyToken and contains the user's ID

  try {
    const activeSubscription = await ActiveSubscription.findOne({ userId });

    if (!activeSubscription) {
      return next(errorHandler(403, "You are not an active subscriber!"));
    }

    next();
  } catch (error) {
    console.error("Error checking active subscriber status:", error);
    next(errorHandler(500, "Internal server error"));
  }
};
