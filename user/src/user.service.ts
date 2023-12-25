import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, User } from '@prisma/client';
import { IUserGetResponse, IUserGetsResponse } from 'interfaces/get-user';
import { IUserCreateResponse } from 'interfaces/create-user';
import { IUserUpdateResponse } from 'interfaces/update-user';
import { IUserDeleteResponse } from 'interfaces/delete-user';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: number): Promise<IUserGetResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if ( !user )  {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
          data: null,
          errors: null,
        }
      }

      return { 
        status: HttpStatus.OK,
        message: 'User found',
        data: user,
        errors: null,
      }
    } catch ( error ){ 
      return { 
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        data: null,
        errors: error,
      }
    }
  }

  async getUsers( params: Prisma.UserFindManyArgs ): Promise<IUserGetsResponse> {
    try {
      const users = await this.prisma.user.findMany(params);

      if ( !users ) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Users not found',
          data: null,
          errors: null,
        }
      }

      return {
        status: HttpStatus.OK,
        message: 'Users found',
        data: users,
        errors: null,
      } 
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        data: null,
        errors: error,
      } 
    }
  }


  async createUser(data: User): Promise<IUserCreateResponse> {
    try {
      if ( !data.id ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'User id is required',
          data: null,
          errors: null,
        }
      }
      if ( !data.username ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'User name is required',
          data: null,
          errors: null,
        }
      }
      const user = await this.prisma.user.upsert({ 
        where: { id: data.id },
        update: {},
        create: data,
      })
      return { 
        status: HttpStatus.CREATED,
        message: 'User created',
        data: user,
        errors: null,
      }

    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        data: null,
        errors: error,
      }
    }
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput ): Promise<IUserUpdateResponse> {
    try {
      if ( !id ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'User id is required',
          errors: null,
        }
      }
      if ( !data ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'User data is required',
          errors: null,
        }
      }
      const foundUser = await this.prisma.user.findUnique({ where: { id } });
      if ( !foundUser ) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
          errors: null,
        }
      }

      await this.prisma.user.update({ where: { id }, data });

      return { 
        status: HttpStatus.OK,
        message: 'User updated',
        errors: null,
      }

    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors: error,
      }
    }
  }

  async deleteUser(id: number): Promise<IUserDeleteResponse> {
    try {
      if ( !id ) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'User id is required',
          errors: null,
        }
      }
      const foundUser = await this.prisma.user.findUnique({ where: { id } });
      if ( !foundUser ) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
          errors: null,
        }
      }

      await this.prisma.user.delete({ where: { id } });

      return { 
        status: HttpStatus.OK,
        message: 'User deleted',
        errors: null,
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errors: error,
      }
    }
  }

}