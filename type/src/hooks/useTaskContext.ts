import { useContext } from "react";
import { TaskContext } from "../context/Context";
import type { TaskContextType } from "../type/type";

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }

  return context;
};
