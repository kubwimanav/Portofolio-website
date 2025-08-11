// Core Task Interface
export interface Task {
  id: string;
  taskName: string;
  priority: "Low" | "Medium" | "High";
  category: string;
  dueDate: string;
  assignedUser: string;
  assignedOn: string;
  completed: boolean;
}

// State Interface for useReducer
export interface TaskState {
  tasks: Task[];
}

// Filter Interface
export interface Filters {
  status: "All" | "Completed" | "Incomplete";
  priority: string;
  category: string;
  dueDate: string;
  assignedUser: string;
}

// Action Types for useReducer
export type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_COMPLETE"; payload: string };

// Context Interface
export interface TaskContextType {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
}

// Constants
export const PRIORITIES = ["Low", "Medium", "High"] as const;
export const CATEGORIES = [
  "Frontend",
  "Backend",
  "Meeting",
  "Design",
  
];
export const TEAM_MEMBERS = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Brown",
  "Diana Wilson",
  "Eve Davis",
];
