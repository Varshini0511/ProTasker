import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Task, TaskStatus } from '../types';
import { useLocalStorage } from '../Hooks/USeLocalStorage';

// 1. Define the shape of our Context (The Public API)
interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, newStatus: TaskStatus) => void;
}

// 2. Create the Context (with dummy defaults)
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// 3. The Provider Component (Holds the State)
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const addTask = (title: string) => {
    console.log('Adding task:', title);
    setTasks([...tasks, { id: Date.now().toString(), title, status: 'TODO' }]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const updateTaskStatus = (id: string, newStatus: TaskStatus) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

// 4. Custom Hook for easy access (Best Practice)
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};