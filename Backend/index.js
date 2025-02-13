import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoute.js";
import { app, server } from "./socket/server.js";


dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend ka URL
    credentials: true, // Cookies allow karega
  })
);

//routes
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");
} catch (error) {
  console.log(error);
}

server.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
