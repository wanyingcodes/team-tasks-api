import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task.dto/create.task.dto';
import { UpdateTaskDto } from './task.dto/update.task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.create(1, dto);
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.taskService.findAll(projectId);
  }

  @Get('my')
  findMyTasks() {
    return this.taskService.findMyTasks(1);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id, 1);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, 1, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id, 1);
  }
}
