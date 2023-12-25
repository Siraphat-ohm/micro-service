import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { Prisma, User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @MessagePattern('get-user')
  async user(id: string) {
    return this.appService.getUserById(Number(id));
  }

  @MessagePattern('get-users')
  async users(params: Prisma.UserFindManyArgs) {
    return this.appService.getUsers(params);
  }

  @MessagePattern('create-user')
  async createUser(data: User) {
    return this.appService.createUser(data);
  }

  @MessagePattern('update-user')
  async updateUser( { id, data }: { id: string, data: User }) {
    return this.appService.updateUser(Number(id), data);
  }

  @MessagePattern('delete-user')
  async deleteUser(id: string) {
    return this.appService.deleteUser(Number(id));
  }
}