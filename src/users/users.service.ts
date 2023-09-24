// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument } from './users.schema'; // adjust the import as per your file structure
import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';
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
  async findByUserName(username: string): Promise<any> {
    return this.userModel.findOne({ username: username }).exec();
  }
  async create(createUserDto: CreateUserDto): Promise<UsersDocument> {
    const existingUser = await this.findByUserName(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

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
