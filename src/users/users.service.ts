// users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument } from './users.schema'; // adjust the import as per your file structure
import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from './login-user.dto';
import { UnauthorizedException } from '@nestjs/common';
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

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.findByUserName(loginUserDto.username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Sign the token with user's info. Adjust the payload as per your needs.
    const payload = { username: user.username, sub: user._id };
    const secret = 'secret'; // Import from environment variables or config
    const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // adjust the expiration as per your needs

    return { user, token };
  }
  async register(createUserDto: CreateUserDto): Promise<any> {
    // Here, create method will throw a ConflictException if username already exists
    const user = await this.create(createUserDto);

    // Sign the token with user's info. Adjust the payload as per your needs.
    const payload = { username: user.username, sub: user._id };
    const secret = process.env.JWT_SECRET_KEY || 'secret';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    return { user, token };
  }
}
