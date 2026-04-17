import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt({ message: 'ProjectId must be a number' })
  @IsNotEmpty({ message: 'ProjectId cannot be empty' })
  projectId: number;

  @IsOptional()
  @IsInt({ message: 'AssignedUserId must be a number' })
  assignedUserId?: number;
}
