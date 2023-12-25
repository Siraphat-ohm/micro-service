import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IUserGetResponse } from 'src/interfaces/dto/user.dto';

@Controller()
export class UserController {
  constructor(@Inject("USER_SERVICE") private readonly client: ClientProxy) { }

  @Get('user/:id')
  async getUser(@Param('id') id: number): Promise<IUserGetResponse> {
    const userResponse: IUserGetResponse = await firstValueFrom(this.client.send('get_user', id));
    if ( userResponse.status >= HttpStatus.BAD_REQUEST ){
      throw new HttpException(userResponse.message, userResponse.status)
    }
    return userResponse;
  }
}