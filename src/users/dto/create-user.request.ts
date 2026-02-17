import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;
}
