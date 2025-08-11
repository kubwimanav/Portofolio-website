import { createContext, useState, type ReactNode } from "react";
import type { Task } from "../types/type";

type UserTypeNode = {
  children: ReactNode;
};
 
type TaskContext = {
      storedData: Task[];
};
export const TaskContext = createContext<TaskContext >({}as TaskContext);
export const TaskProvider: React.FC<UserTypeNode> = ({ children }) => {


  const [storedData] = useState<Task[]>(() => {
    const data = localStorage.getItem("formData");
    return data ? JSON.parse(data) as Task[] : [];
  });
  return (
    <TaskContext.Provider value={{ storedData }}>
      {children}
    </TaskContext.Provider>
  );
};
