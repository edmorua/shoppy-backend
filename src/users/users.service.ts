import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserRequest } from './dto/update-user.request';
import { UserResponse } from './dto/user.response';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(request: CreateUserRequest): Promise<UserResponse> {
    const newUser = await this.prismaService.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: await bcrypt.hash(request.password, 10),
      },
      omit: {
        password: true,
      },
    });
    return newUser;
  }

  async updateUser(
    id: number,
    request: UpdateUserRequest,
  ): Promise<UserResponse> {
    await this.getUserById(id);
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        ...(request.name && { name: request.name }),
        ...(request.email && { email: request.email }),
        ...(request.password && {
          password: await bcrypt.hash(request.password, 10),
        }),
      },
      omit: {
        password: true,
      },
    });
    return updatedUser;
  }

  async getUserById(id: number): Promise<UserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.prismaService.user.findMany({
      omit: {
        password: true,
      },
    });
    return users;
  }

  async deleteUser(id: number): Promise<void> {
    await this.getUserById(id);
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
