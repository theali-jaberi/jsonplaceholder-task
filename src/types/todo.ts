// Todo type from /todos endpoint
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}