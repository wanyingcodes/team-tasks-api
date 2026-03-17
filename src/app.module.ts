import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [PrismaModule, UserModule, ProjectModule, TaskModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
