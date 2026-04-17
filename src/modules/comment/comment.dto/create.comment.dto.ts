import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'Comment cannot be empty' })
  content: string;

  @IsInt({ message: 'TaskId must be a number' })
  @IsNotEmpty({ message: 'TaskId cannot be empty' })
  taskId: number;
}
