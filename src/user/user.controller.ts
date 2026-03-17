import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './user.dto/user.register.dto';
import { LoginDto } from './user.dto/user.login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.userService.register(dto.email, dto.password);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.userService.login(dto.email, dto.password);
  }
}
 