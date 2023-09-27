import mongoose, { Model, Document } from "mongoose";
import Chat, { IChat } from "./ChatModel";
import User, { IUser } from "./UserModel";

export interface IMessage extends Document {
  sender: IUser | null;
  content: String;
  chat: IChat | null;
}

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: User },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: Chat },
  },
  {
    timestamps: true,
  }
);

const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  MessageSchema
);

export default Message;
