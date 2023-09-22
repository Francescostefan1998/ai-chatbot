// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument } from './users.schema'; // adjust the import as per your file structure

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UsersDocument>) {}
}
