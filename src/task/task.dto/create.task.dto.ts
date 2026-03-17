export class CreateTaskDto {
  title: string;
  description?: string;
  projectId: number;
  assignedUserId?: number;
}
