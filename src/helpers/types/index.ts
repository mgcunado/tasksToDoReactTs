export interface TaskInterface {
  id: number;
  task: string;
  priority: {
    id: number;
    level: string;
  };
  deadline: string;
  comment: string;
  done: number;
  subcategory: {
    id: number;
    name: string;
    categoryId: number;
  }
}
