import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './project.dto/create.project.dto';
import { UpdateProjectDto } from './project.dto/update.project.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  createProject(@Body() dto: CreateProjectDto) {
    return this.projectService.create(1, dto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, 1, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.remove(id, 1);
  }
}
