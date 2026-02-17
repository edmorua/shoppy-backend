import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserRequest } from './dto/create-user.request';
import { PrismaService } from '../prisma/prisma.service';
import { User } from 'src/generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(request: CreateUserRequest): Promise<User> {
    console.log({ request });
    const newUser = await this.prismaService.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: await bcrypt.hash(request.password, 10),
      },
    });
    console.log({ newUser });
    return newUser;
  }
}
