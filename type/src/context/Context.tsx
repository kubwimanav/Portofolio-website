import React, { createContext, useContext, useReducer, type ReactNode,  } from "react";
import type { TaskContextType } from "../type/type";
import { initialTaskState, taskReducer } from "./taskReducer";

// Create Context
const TaskContext = createContext<TaskContextType | null>(null);

// Task Provider Component
export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const contextValue: TaskContextType = {
    state,
    dispatch,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

// Custom Hook to use Task Context

// Export the context for advanced use cases
export { TaskContext };
