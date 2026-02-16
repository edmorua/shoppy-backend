import { Injectable } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';

@Injectable()
export class UsersService {
  createUser(request: CreateUserRequest) {
    console.log('Creating user:', request);
  }
}
