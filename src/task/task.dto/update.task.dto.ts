export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: 'todo' | 'ongoing' | 'done';
  assignedUserId?: number;
}
