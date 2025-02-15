import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoute.js";
import { app, server } from "./socket/server.js";
import path from "path";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chatapp-pd49.onrender.com", // Frontend ka URL
    credentials: true, // Cookies allow karega
  })
);

//routes
app.use("/user", userRoutes);
app.use("/message", messageRoutes);

//--------------- code for deployment --------------------
if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static("./Frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirPath, "./Frontend/dist", "index.html"));
  });
}

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database connected");
} catch (error) {
  console.log(error);
}

server.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
