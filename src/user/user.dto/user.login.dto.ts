import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Email address cannot be empty' })
  email: string;

  @IsString()
  @MinLength(10, { message: 'Password must contain at least 10 caracteres' })
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}
