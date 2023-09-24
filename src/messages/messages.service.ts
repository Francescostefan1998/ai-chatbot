import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessagesDocument } from './messages.schema';
import { CreateMessageDto } from './create-message.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessagesDocument>,
  ) {}

  async findAll(): Promise<any> {
    return this.messageModel.find().exec();
  }

  async create(createMessageDto: CreateMessageDto): Promise<MessagesDocument> {
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }
  async findByUserId(userId: Types.ObjectId): Promise<MessagesDocument[]> {
    return this.messageModel.find({ userId: userId }).exec();
  }

  async deleteMessageById(id: Types.ObjectId): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundError(`${id} is not a valid id`);
    }

    const result = await this.messageModel.findByIdAndRemove(id).exec();
    if (!result) {
      throw new NotFoundError(`${id} not found`);
    }
    return result; // you might want to return the deleted object or some confirmation message
  }
}
