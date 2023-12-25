import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/interfaces/dto/user.dto';

@Controller()
export class UserController {
  constructor(@Inject("USER_SERVICE") private readonly client: ClientProxy) { }

  @Get('user/:id')
  getUser(@Param('id') id: number): Observable<any> {
    return this.client.send<any, number>('user', id);
  }

  @Get('users')
  getUsers() {
    return this.client.send('users', {});
  }

  @Post('user')
  createUser(@Body() user: UserDTO) {
    return this.client.send('createUser', user);
  }

  @Put('user/:id')
  updateUser(@Param('id') id: string, @Body() user: UserDTO) {
    return this.client.send('updateUser', { id, user});
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: number) {
    return this.client.send('deleteUser', id);
  }

}