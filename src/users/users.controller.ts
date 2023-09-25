import {
  Controller,
  Get,
  Delete,
  Param,
  Post,
  Body,
  Put,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { LoginUserDto } from './login-user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll(): Promise<any> {
    return await this.usersService.findAll();
  }
  @Get(':username')
  async findByUserName(@Param('username') username: string): Promise<any> {
    return await this.usersService.findByUserName(username);
  }
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.usersService.login(loginUserDto);
  }
  @Put(':username')
  async updateUser(
    @Param('username') username: string,
    @Body() updateData: any,
  ) {
    return this.usersService.updateUserByUsername(username, updateData);
  }

  @Delete(':username')
  async deleteByUsername(@Param('username') username: string): Promise<any> {
    console.log(username);
    return this.usersService.deleteByUsername(username);
  }
  @Patch(':username')
  async patchUser(
    @Param('username') username: string,
    @Body() updateData: any,
  ) {
    return this.usersService.patchUserByUsername(username, updateData);
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.register(createUserDto);
  }
}
