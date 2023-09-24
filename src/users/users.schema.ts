import { Schema, Document, Types } from 'mongoose';

export const UsersSchema = new Schema(
  {
    username: String,
    password: String,
    age: Number,
    nationality: String,
    name: String,
    surname: String,
    messages: [{ type: Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true },
);

export interface UsersDocument extends Document {
  username: string;
  password: string;
  age: number;
  nationality: string;
  name: string;
  surname: string;
  messages: Types.ObjectId[];
}
