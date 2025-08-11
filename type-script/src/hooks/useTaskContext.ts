import { useContext } from "react";
import { TaskContext } from "../context/Context";

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }

  return context;
};

// Export the context for advanced use cases
export { TaskContext };
