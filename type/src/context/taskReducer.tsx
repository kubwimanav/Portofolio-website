import type { TaskAction, TaskState } from "../type/type";

// Task Reducer Function
export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case "TOGGLE_COMPLETE":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    default:
      return state;
  }
};

// Initial State with Sample Data
export const initialTaskState: TaskState = {
  tasks: [
    {
      id: "1",
      taskName: "Design user interface mockups",
      priority: "High",
      category: "Design",
      dueDate: "2025-08-10",
      assignedUser: "Alice Johnson",
      assignedOn: "2025-08-05",
      completed: false,
    },
    {
      id: "2",
      taskName: "Implement authentication system",
      priority: "High",
      category: "Backend",
      dueDate: "2025-08-12",
      assignedUser: "Bob Smith",
      assignedOn: "2025-08-06",
      completed: true,
    },
    {
      id: "3",
      taskName: "Weekly team standup",
      priority: "Medium",
      category: "Meeting",
      dueDate: "2025-08-09",
      assignedUser: "Charlie Brown",
      assignedOn: "2025-08-07",
      completed: false,
    },
    {
      id: "4",
      taskName: "Write unit tests for API endpoints",
      priority: "Medium",
      category: "Frontend",
      dueDate: "2025-08-15",
      assignedUser: "Diana Wilson",
      assignedOn: "2025-08-08",
      completed: false,
    },
  ],
};
