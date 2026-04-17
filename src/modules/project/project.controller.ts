import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './project.dto/create.project.dto';
import { UpdateProjectDto } from './project.dto/update.project.dto';
import { Public } from '../../modules/auth/decorators/public.decorator';
import { CurrentUserId } from '../../modules/auth/decorators/current.user.decorator';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  createProject(@Body() dto: CreateProjectDto, @CurrentUserId() currentUser: any) {
    return this.projectService.create(currentUser.id, dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
    @CurrentUserId() currentUser: any,
  ) {
    return this.projectService.update(id, currentUser.id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUserId() currentUser: any,
  ) {
    return this.projectService.remove(id, currentUser.id);
  }
}
