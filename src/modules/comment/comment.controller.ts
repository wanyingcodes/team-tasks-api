import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './comment.dto/create.comment.dto';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUserId } from '../auth/decorators/current.user.decorator';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  createcomment(@Body() dto: CreateCommentDto, @CurrentUserId() currentUser: any) {
    return this.commentService.create(currentUser.id, dto);
  }

  @Public()
  @Get('task/:taskId')
  findByTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.commentService.findAll(taskId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUserId() currentUser: any,
  ) {
    return this.commentService.remove(id, currentUser.id);
  }
}
