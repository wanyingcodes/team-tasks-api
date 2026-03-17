import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './comment.dto/create.comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        taskId: dto.taskId,
        userId: userId,
      },
    });
  }

  async findAll(taskId: number) {
    return this.prisma.comment.findMany({
      where: { taskId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
           id: true,
           name: true,
         },
        },
      },
    });
  }

  async remove(id: number, userId: number) {
    const comment = await this.prisma.comment.findFirst({
      where: { id, userId },
    });
    if (!comment) {
      throw new NotFoundException('Comment not found or you do not have permission');
    }
    await this.prisma.comment.delete({
      where: { id },
    });
    return { message: 'Comment deleted successfully' };
  }
}
