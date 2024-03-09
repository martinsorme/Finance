import { Task, TaskStatus } from "../../src/Types";

export const changeStatus = (id: number, status: TaskStatus, tasks: Task[]): Task[] => {
    
    const newTasks : Task[] = tasks.map((t) => {
      if (t.taskId === id) {
        t.status = status;
        return t;
      } else {
        return t;
      }
      
    });
    return newTasks;
  };