import { IsDefined, IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsStrongPassword()
  password: string;
}
