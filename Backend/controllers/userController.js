import { createTokenAndSaveCookie } from "../jwt/generateToken.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not matched!" });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel({
      fullName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    if (newUser) {
      createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!user !== !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }

    createTokenAndSaveCookie(user._id, res);
    const userId = user._id;

    const token = jwt.sign({ userId }, process.env.JWT_SECERET_KEY, {
      expiresIn: "10d",
    });

    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ error: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedUser = req.user._id;

    const filteredUser = await userModel
      .find({ _id: { $ne: loggedUser } })
      .select("-password");
    res.status(200).json({ filteredUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in fetch users list" });
  }
};
