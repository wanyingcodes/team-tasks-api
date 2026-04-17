import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto/create.task.dto';
import { UpdateTaskDto } from './task.dto/update.task.dto';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUserId } from '../auth/decorators/current.user.decorator';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@Body() dto: CreateTaskDto, @CurrentUserId() userId: any) {
    return this.taskService.create(userId.id, dto);
  }

  @Public()
  @Get('project/:projectId')
  findByProject(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.taskService.findAll(projectId);
  }

  @Get('my')
  findMyTasks(@CurrentUserId() userId: any) {
    return this.taskService.findMyTasks(userId.id);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @CurrentUserId() userId: any,
  ) {
    return this.taskService.update(id, userId.id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUserId() userId: any,
  ) {
    return this.taskService.remove(id, userId.id);
  }
}
