import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './user.dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async createUser(email: string, password: string, name?: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async update(id: number, userId: number, dto: UpdateUserDto) {
    if (id !== userId) {
      throw new ForbiddenException('You can only modify your own profile');
    }

    const userToUpdate = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    const updateData: any = {};
    if (dto.name) {
      updateData.name = dto.name;
    }
    if (dto.email && dto.email !== userToUpdate.email) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
          NOT: { id: userToUpdate.id }
        },
      });
      if (existingUser) {
        throw new ConflictException('Email address already in use');
      }
      updateData.email = dto.email;
    }

    return await this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async remove(id: number, userId: number) {
    if (id !== userId) {
      throw new ForbiddenException('You can only delete your own account');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id },
    });
    return {
      message: 'User deleted successfully',
      deletedUserId: id,
    };
  }
}
