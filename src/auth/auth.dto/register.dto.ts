import { IsEmail, IsString, MinLength, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty({ message: 'Email address cannot be empty' })
  email: string;

  @IsString()
  @MinLength(10, { message: 'Password must contain at least 10 caracteres' })
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}
