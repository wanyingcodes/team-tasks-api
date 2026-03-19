import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Project name cannot be empty' })
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
