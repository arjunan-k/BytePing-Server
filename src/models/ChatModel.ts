import mongoose, { Model, Document } from "mongoose";
import Message, { IMessage } from "./messageModel";
import User, { IUser } from "./userModel";

export interface IChat extends Document {
  chatname: String;
  isGroupChat: Boolean;
  users: IUser[];
  latestMessage: IMessage | null;
  groupAdmin: IUser | null;
}

const ChatSchema = new mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Chat: Model<IChat> = mongoose.model<IChat>("Chat", ChatSchema);

export default Chat;
