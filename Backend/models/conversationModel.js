import mongoose from "mongoose";
import userModel from "./userModel.js";
import messageModel from "./messageModel.js";

const conversationSchema = mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
      },
    ],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: messageModel,
        default: [],
      },
    ],
    // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "messages" }],
  },
  { timestamps: true }
);

export default mongoose.model("conversation", conversationSchema);
