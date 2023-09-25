import {
  Controller,
  Get,
  Query,
  BadRequestException,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { Types } from 'mongoose'; // Import Types from mongoose
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {} // Correct service name

  @Get()
  async findAll(): Promise<any> {
    return await this.messagesService.findAll();
  }
  @Post()
  async create(@Body() CreateMessageDto: CreateMessageDto) {
    console.log('inside the post message');
    return this.messagesService.create(CreateMessageDto);
  }
  @Get('byUserId')
  async findByUserId(@Query('userId') userId: string): Promise<any> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid userId');
    }
    return this.messagesService.findByUserId(new Types.ObjectId(userId));
  }

  @Delete()
  async deleteMessageById(@Query('messageId') messageId: string): Promise<any> {
    return this.messagesService.deleteMessageById(
      new Types.ObjectId(messageId),
    );
  }
}
