import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user')
  async user(id: string) {
    return this.appService.user(id);
  }

  @MessagePattern('users')
  async users(params: any) {
    return this.appService.users(params);
  }

  @MessagePattern('createUser')
  async createUser(data: any) {
    return this.appService.createUser(data);
  }

  @MessagePattern('updateUser')
  async updateUser(params: any) {
    return this.appService.updateUser(params);
  }

  @MessagePattern('deleteUser')
  async deleteUser(id: string) {
    return this.appService.deleteUser(id);
  }

}