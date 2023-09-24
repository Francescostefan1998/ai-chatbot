import { Types } from 'mongoose';

export class CreateMessageDto {
  readonly text: string;
  readonly role: string;

  readonly userId?: Types.ObjectId;
}
