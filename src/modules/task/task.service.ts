import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto, TaskStatus } from './task.dto/create.task.dto';
import { UpdateTaskDto } from './task.dto/update.task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        projectId: dto.projectId,
        assignedUserId: dto.assignedUserId,
      },
    });
  }

  async findAll(projectId: number) {
    return this.prisma.task.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findMyTasks(userId: number) {
    return this.prisma.task.findMany({
      where: { assignedUserId: userId },
      include: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: number, userId: number, dto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.project.userId !== userId) {
      throw new NotFoundException('Task not found or you do not have permission');
    }
    const updateData: any = {};
    if (dto.title !== undefined) updateData.title = dto.title;
    if (dto.description !== undefined) updateData.description = dto.description;
    if (dto.status !== undefined) updateData.status = dto.status;
    if (dto.assignedUserId !== undefined) updateData.assignedUserId = dto.assignedUserId;
    return this.prisma.task.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: { project: true },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (task.project.userId !== userId) {
      throw new NotFoundException('Task not found or you do not have permission');
    }
    await this.prisma.task.delete({
      where: { id },
    });
    return { message: 'Task deleted successfully' };
  }
}
