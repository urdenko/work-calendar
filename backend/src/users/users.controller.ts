import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { UserModel } from './models/user.model';
import { UsersService } from './services/users.service';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers(@Res() res) {
    const posts = await this.userService.getUsers();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get('/login/:login')
  async getUserByLogin(@Res() res, @Param('login') login) {
    const user = await this.userService.getUserByLogin(login);
    if (!user) { throw new NotFoundException('User does not exist!'); }
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('/id/:id')
  async getUserById(@Res() res, @Param('id') id) {
    const user = await this.userService.getUserById(id);
    if (!user) { throw new NotFoundException('User does not exist!'); }
    return res.status(HttpStatus.OK).json(user);
  }

  @Post('/login/:login')
  async editUserByLogin(@Res() res, @Param('login') login, @Body() data: UserModel) {
    const editedUser = await this.userService.updateUserByLogin(login, data);
    if (!editedUser) { throw new NotFoundException('User does not exist!'); }
    return res.status(HttpStatus.OK).json(editedUser);
  }
}
