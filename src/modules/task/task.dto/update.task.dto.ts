import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "@prisma/client";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsInt({ message: 'AssignedUserId must be a number' })
  assignedUserId?: number;
}
