import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async user(id: string) {
    try {
      return this.prisma.user.findUnique({
        where: { id: +id },
      })
    } catch (error) {
      
    }
  }

  async users(
    params: {
      skip: number,
      take: number,
      cursor?: { id: number },
      where?: { id: number },
    }
  ) {
    const { skip, take, cursor, where } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
    })
  }

  async createUser(data: User) {
    try {
      console.log(data);
      return this.prisma.user.create({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(params: {
    id: string;
    user: User;
  }){
    try {
      const { id, user } = params;
      return this.prisma.user.update({
        data: user,
        where: { id: +id },
      })
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: string) {
    try {
      return this.prisma.user.delete({
        where: { id: +id },
      })
    } catch (error) {
      console.log(error);
    }
  }

}