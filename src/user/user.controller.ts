import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto/user.update.dto';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUserId } from 'src/auth/decorators/current.user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Public()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Public()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @CurrentUserId() currentUser: any,
  ) {
    return this.userService.update(id, currentUser.id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUserId() currentUser: any,
  ) {
    return this.userService.remove(id, currentUser.id);
  }
}
