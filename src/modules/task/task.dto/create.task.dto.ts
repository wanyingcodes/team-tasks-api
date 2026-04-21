import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum TaskStatus {
  TODO = 'todo',
  ONGOING = 'ongoing',
  DONE = 'done',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus = TaskStatus.TODO;

  @IsInt({ message: 'ProjectId must be a number' })
  @IsNotEmpty({ message: 'ProjectId cannot be empty' })
  projectId!: number;

  @IsOptional()
  @IsInt({ message: 'AssignedUserId must be a number' })
  assignedUserId?: number;
}
