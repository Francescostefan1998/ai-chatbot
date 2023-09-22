import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalutiController } from './saluti/saluti.controller';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://Frank1998:ocsecnarf@cluster0.cv1nwwr.mongodb.net/aiChatBot?tls=true',
    ),
  ],
  controllers: [AppController, SalutiController],
  providers: [AppService],
})
export class AppModule {}
