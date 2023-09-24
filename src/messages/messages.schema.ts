import { Schema, Document, Types } from 'mongoose';

export const MessagesSchema = new Schema(
  {
    text: { type: String, required: true },
    role: { type: String, required: true },

    userId: { type: Types.ObjectId, ref: 'User', require: true },
  },
  { timestamps: true },
);

export interface MessagesDocument extends Document {
  text: string;
  role: string;
  userId: Types.ObjectId;
}
