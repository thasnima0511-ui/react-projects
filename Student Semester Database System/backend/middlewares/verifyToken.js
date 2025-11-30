import jwt from "jsonwebtoken";
import {Login} from "../models/login.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) { 
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 
    const decoded = jwt.verify(token, "143_admin"); 
// console.log("working")
    

    const user = await Login.findById(decoded.userId); 
 
    if (!user) { 
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; 
    next(); 
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
