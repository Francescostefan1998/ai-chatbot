// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument } from './users.schema'; // adjust the import as per your file structure
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UsersDocument>) {}

  async findAll(): Promise<any> {
    return this.userModel.find().exec();
  }

  async deleteByUsername(username: string): Promise<any> {
    const result = await this.userModel
      .findOneAndRemove({ username: username })
      .exec();

    if (!result) {
      throw new NotFoundException(`${username} not found`);
    }

    return `${username} deleted successfully`;
  }

  async create(createUserDto: CreateUserDto): Promise<UsersDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async updateUserByUsername(
    username: string,
    updateData: Partial<UsersDocument>,
  ): Promise<any> {
    return this.userModel
      .findOneAndUpdate({ username }, updateData, { new: true })
      .exec();
  }
  async patchUserByUsername(
    username: string,
    updateData: Partial<UsersDocument>,
  ): Promise<any> {
    return this.userModel
      .findOneAndUpdate({ username }, updateData, { new: true })
      .exec();
  }
}
