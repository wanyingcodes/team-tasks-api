import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  status?: 'todo' | 'ongoing' | 'done';

  @IsOptional()
  @IsInt({ message: 'AssignedUserId must be a number' })
  assignedUserId?: number;
}
