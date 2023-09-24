import { Schema, Document, Types } from 'mongoose';

export const MessagesSchema = new Schema(
  {
    text: String,
    role: String,

    userId: { type: Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export interface MessagesDocument extends Document {
  text: string;
  role: string;
  userId: Types.ObjectId;
}
