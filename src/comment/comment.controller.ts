import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './comment.dto/create.comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  createcomment(@Body() dto: CreateCommentDto) {
    return this.commentService.create(1, dto);
  }

  @Get('task/:taskId')
  findByTask(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.commentService.findAll(taskId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.remove(id, 1);
  }
}
