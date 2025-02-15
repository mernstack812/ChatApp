import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";
import { getReciverSocketId, io } from "../socket/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;

    let conversation = await conversationModel.findOne({
      members: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        members: [senderId, recieverId],
      });
    }

    const newMessage = new messageModel({
      senderId,
      recieverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const reciverSocketId = getReciverSocketId(recieverId);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      message: "Message send successfully",
      conversationId: conversation._id,
      newMessage,
    });
  } catch (error) {
    console.log("Error in send message : " + error);
    res.status(500).json({ error: "Internal server error " });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUser } = req.params;
    const senderId = req.user._id;

    let conversation = await conversationModel
      .findOne({
        members: { $all: [senderId, chatUser] },
      })
      .populate("message");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const message = conversation.message;
    res.status(200).json(message);
  } catch (error) {
    console.log("Error in get message : " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};
