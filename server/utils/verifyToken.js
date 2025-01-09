import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.Authorization ;
  // console.log(token);

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    
    req.user = user;
    if (req.user.role === "Manager") {
        next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader 
        ? authHeader.split(' ')[1] 
        : req.cookies.Authorization; // Fallback to cookie if no header

    if (!token) return res.status(401).json({ message: 'Access token required' });

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // Populate req.user
        next();
    });
};

