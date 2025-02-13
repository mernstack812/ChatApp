import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const secureRoute = async (req, res, next) => {
  try {
    //const token = req.cookies.jwt;

    const token = req.headers.authorization;

    

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECERET_KEY);

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in secure route" });
  }
};

export default secureRoute;
