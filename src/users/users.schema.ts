import { Schema, Document } from 'mongoose';

export const UsersSchema = new Schema({
  username: String,
  password: String,
});

export interface UsersDocument extends Document {
  username: string;
  password: string;
}
