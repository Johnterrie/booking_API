import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all-user')
  findAll() {
    this.userService.findAll();
  }

  @Post('/add-user')
  addUser(@Body() body: CreateUserDto) {
    this.userService.addOne(body.email, body.password);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
