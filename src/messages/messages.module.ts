import { Module } from '@nestjs/common';
import { MessagesSchema } from './messages.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessagesSchema }]),
  ],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
