import { Types } from 'mongoose';

export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly age: number;
  readonly language: string;
  readonly name: string;
  readonly surname: string;
  readonly messages?: Types.ObjectId[];
}
