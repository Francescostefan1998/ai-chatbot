import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessagesDocument } from './messages.schema';
import { CreateMessageDto } from './create-message.dto';

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
}
